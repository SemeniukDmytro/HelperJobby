import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import "./JobDescriptionHeader.scss";
import {faCaretDown, faHeart as solidHeart} from "@fortawesome/free-solid-svg-icons";
import {useHomePage} from "../../../../hooks/useHomePage";
import {JobSeekerAccountService} from "../../../../services/jobSeekerAccountService";
import {ServerError} from "../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {thousandsDisplayHelper} from "../../../../utils/thousandsDisplayHelper";
import {useJobSeeker} from "../../../../hooks/useJobSeeker";
import {useAuth} from "../../../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {SavedJobDTO} from "../../../../DTOs/userJobInteractionsDTOs/SavedJobDTO";
import {useJobActions} from "../../../../hooks/useJobActions";
import {JobActionFunction, ShowRemoveFromSavedSetter} from "../../../../hooks/customHooksTypes/UseJobActionsHookTypes";

interface JobDescriptionHeaderProps {
    selectedJob : JobDTO | null;
    isFullHeaderGridTemplate : number | null;
    setIsFullHeaderGridTemplate : Dispatch<SetStateAction<number | null>>;
    isShortHeaderGridTemplate : number | null;
    setIsShortHeaderGridTemplate : Dispatch<SetStateAction<number | null>>;
}

const JobDescriptionHeader: FC<JobDescriptionHeaderProps> = ({selectedJob,
                                                             isFullHeaderGridTemplate, setIsFullHeaderGridTemplate,
                                                             isShortHeaderGridTemplate, setIsShortHeaderGridTemplate}) => {
    
    const {jobSeekerSavedJobs, setJobSeekerSavedJobs, jobSeekerJobApplies} = useJobSeeker();
    const {authUser} = useAuth();
    const navigate = useNavigate();
    const [isJobSaved, setIsJobSaved] = useState(false);
    const [isApplied, setIsApplied] = useState(false);
    const [showRemoveFromSaved, setShowRemoveFromSaved] = useState(false);
    
    const moreActionsButtonRef = useRef<HTMLButtonElement | null>(null);
    
    const jobSeekerService = new JobSeekerAccountService();
    const {saveJob, removeSavedJob} = useJobActions(jobSeekerService, setJobSeekerSavedJobs, selectedJob!);
    
    useEffect(() => {
        setIsFullHeaderGridTemplate(1);
        setIsShortHeaderGridTemplate(0);
        
    },[])

    useEffect(() => {
        if (!jobSeekerJobApplies){
            return;
        }
        if (jobSeekerJobApplies.some(j => j.jobId == selectedJob?.id)){
            setIsApplied(true);
        }
        else {
            setIsApplied(false);
        }
    }, [selectedJob, []]);

    useEffect(() => {
        if (!jobSeekerSavedJobs){
            return;
        }
        if (jobSeekerSavedJobs.some(j => j.jobId == selectedJob?.id)){
            setIsJobSaved(true)
        }
        else {
            setIsJobSaved(false)
        }
        
    }, [jobSeekerSavedJobs, []]);

    async function handleJobInteraction(actionFunction : JobActionFunction, setShowRemoveFromSavedValue : ShowRemoveFromSavedSetter) {
        try {
            if (!authUser) {
                navigate("/auth-page");
                return;
            }

            await actionFunction(selectedJob!.id);
            setShowRemoveFromSavedValue(actionFunction === removeSavedJob ? false : true);
        } catch (err) {
            logErrorInfo(err);
        }
    }

    async function removeSavedJob1() {
        await handleJobInteraction(removeSavedJob, setShowRemoveFromSaved);
    }

    async function saveJob1() {
        await handleJobInteraction(saveJob, setShowRemoveFromSaved);
    }

    return (
        <div className={"job-header-container"}>
            <div className={"job-header-title"}>
                <span className={"title-text"}>{selectedJob?.jobTitle}</span>
            </div>
            <div className={"full-header-info"} style={{gridTemplateRows : `${isFullHeaderGridTemplate}fr`}}>
                <div className={"inner-content-wrapper"}>
                    <a className={"header-company-name"}>
                        <span>{selectedJob?.employerAccount.organization.name}</span>
                    </a>
                    <div className={"header-job-location"}>
                        <span>{selectedJob?.location}</span>
                    </div>
                    <div className={"header-job-salary"}>
                        <span>${thousandsDisplayHelper(selectedJob!.salary)} {selectedJob?.salaryRate}</span>
                    </div>
                </div>
            </div>
            <div className={"short-header-info" } style={{gridTemplateRows : `${isShortHeaderGridTemplate}fr`}}>
                <div className={"inner-content-wrapper"}>
                    <a className={"short-company-name"}>{selectedJob?.employerAccount.organization.name}</a>
                    <span>&nbsp; | {selectedJob?.location}</span>
                    <span>&nbsp; | ${thousandsDisplayHelper(selectedJob!.salary)} {selectedJob?.salaryRate}</span>
                </div>
            </div>
            <div className={"header-job-interactions-box"}>
                <button className={"blue-button"} disabled={isApplied}>
                    {isApplied ? "Applied" : "Apply now"}
                </button>
                {!isJobSaved ?  (
                <button className={"save-job-button margin-left1rem"} onClick={saveJob1}>
                    <FontAwesomeIcon className={"medium-svg"} icon={regularHeart} />
                </button>) : (
                <button className={"save-job-button saved-job-button margin-left1rem"} ref={moreActionsButtonRef} onClick={removeSavedJob1}>
                    <FontAwesomeIcon className={"medium-svg"} icon={solidHeart} />
                </button>)}
            </div>
            {showRemoveFromSaved && <div className={"undo-action-box"}>
                <a className={"action-name"}>
                     Job was saved
                </a>
                <a className={"undo-button"} onClick={removeSavedJob1}>
                    Remove from saved
                </a>
            </div>}
        </div>
)};

export default JobDescriptionHeader;
