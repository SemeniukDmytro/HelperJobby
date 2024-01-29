import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import "./JobDescriptionHeader.scss";
import {faBookmark, faHeart as solidHeart} from "@fortawesome/free-solid-svg-icons";
import {JobSeekerAccountService} from "../../../../services/jobSeekerAccountService";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {thousandsDisplayHelper} from "../../../../utils/thousandsDisplayHelper";
import {useJobSeeker} from "../../../../hooks/useJobSeeker";
import {useAuth} from "../../../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
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
    
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const {authUser} = useAuth();
    const navigate = useNavigate();
    const [isJobSaved, setIsJobSaved] = useState(false);
    const [isApplied, setIsApplied] = useState(false);
    const [showRemoveFromSaved, setShowRemoveFromSaved] = useState(false);
    
    const moreActionsButtonRef = useRef<HTMLButtonElement | null>(null);
    
    const jobSeekerService = new JobSeekerAccountService();
    const {saveJob, removeSavedJob} = useJobActions(jobSeekerService, setJobSeeker, selectedJob!);
    
    useEffect(() => {
        setIsFullHeaderGridTemplate(1);
        setIsShortHeaderGridTemplate(0);
        
    },[])

    useEffect(() => {
        if (!jobSeeker?.jobApplies){
            return;
        }
        if (jobSeeker.jobApplies.some(j => j.jobId == selectedJob?.id)){
            setIsApplied(true);
        }
        else {
            setIsApplied(false);
        }
    }, [selectedJob, []]);

    useEffect(() => {
        if (!jobSeeker?.savedJobs){
            console.log("das")
            return;
        }
        if (jobSeeker.savedJobs.some(j => j.jobId == selectedJob?.id)){
            setIsJobSaved(true)
        }
        else {
            setIsJobSaved(false)
        }
        
    }, [jobSeeker?.savedJobs, []]);

    async function handleJobInteraction(actionFunction : JobActionFunction, setShowRemoveFromSavedValue : ShowRemoveFromSavedSetter) {
        try {
            if (!authUser) {
                navigate("/auth-page");
                return;
            }

            await actionFunction(selectedJob!.id);
            setShowRemoveFromSavedValue(actionFunction !== removeSavedJob);
        } catch (err) {
            logErrorInfo(err);
        }
    }

    async function handleRemoveSavedJobClick() {
        await handleJobInteraction(removeSavedJob, setShowRemoveFromSaved);
    }

    async function handleSaveJobClick() {
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
                <button className={"blue-button mr1rem"} disabled={isApplied}>
                    {isApplied ? "Applied" : "Apply now"}
                </button>
                {!isJobSaved ?  (
                <button className={"light-neutral-button-with-icon"} style={{padding : "0.75rem"}} onClick={handleSaveJobClick}>
                    <FontAwesomeIcon className={"medium-svg"} icon={faBookmark} />
                </button>) : (
                <button className={"dark-neutral-button-with-icon"} style={{padding : "0.75rem"}} ref={moreActionsButtonRef} onClick={handleRemoveSavedJobClick}>
                    <FontAwesomeIcon className={"medium-svg"} icon={faBookmark} />
                </button>)}
            </div>
            {showRemoveFromSaved && <div className={"undo-action-box"}>
                <a className={"action-name"}>
                     Job was saved
                </a>
                <a className={"undo-button"} onClick={handleRemoveSavedJobClick}>
                    Remove from saved
                </a>
            </div>}
        </div>
)};

export default JobDescriptionHeader;
