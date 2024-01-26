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
    
    const {jobSeekerSavedJobs, setJobSeekerSavedJobs} = useJobSeeker();
    const {authUser} = useAuth();
    const navigate = useNavigate();
    
    const [isJobSaved, setIsJobSaved] = useState(false);
    const [showRemoveFromSaved, setShowRemoveFromSaved] = useState(false);
    
    const moreActionsButtonRef = useRef<HTMLButtonElement | null>(null);
    
    const jobSeekerService = new JobSeekerAccountService();
    
    useEffect(() => {
        setIsFullHeaderGridTemplate(1);
        setIsShortHeaderGridTemplate(0);
    },[])


    useEffect(() => {
        if (jobSeekerSavedJobs.some(j => j.jobId == selectedJob?.id)){
            setIsJobSaved(true)
        }
        else {
            setIsJobSaved(false)
        }
    }, [jobSeekerSavedJobs, []]);

    async function removeSavedJob() {
        try {
            if (!authUser){
                navigate("/auth-page");
            }
           await jobSeekerService.deleteSavedJob(selectedJob!.id);
           setIsJobSaved(false);
            setJobSeekerSavedJobs((prevSavedJobs) => prevSavedJobs.filter(savedJob => savedJob.jobId !== selectedJob?.id));
            setShowRemoveFromSaved(false);
        }
        catch (error){
            if (error instanceof ServerError){
                logErrorInfo(error)
            }
        }
    }

    async function saveJob() {
        try {
            if (!authUser){
                navigate("/auth-page");
            }
            const retrievedSavedJob = await jobSeekerService.saveJob(selectedJob!.id);
            setIsJobSaved(true);
            setShowRemoveFromSaved(true);
            retrievedSavedJob.job = selectedJob!;
            setJobSeekerSavedJobs((prevSavedJobs) => [...prevSavedJobs, retrievedSavedJob!]);
        }
        catch (error){
            if (error instanceof ServerError){
                logErrorInfo(error)
            }
        }
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
                <button className={"blue-button"}>
                    Apply now
                </button>
                {!isJobSaved ?  (
                <button className={"save-job-button margin-left1rem"} onClick={saveJob}>
                    <FontAwesomeIcon className={"medium-svg"} icon={regularHeart} />
                </button>) : (
                <button className={"save-job-button saved-job-button margin-left1rem"} ref={moreActionsButtonRef} onClick={removeSavedJob}>
                    <FontAwesomeIcon className={"medium-svg"} icon={solidHeart} />
                </button>)}
            </div>
            {showRemoveFromSaved && <div className={"undo-action-box"}>
                <a className={"action-name"}>
                     Job was saved
                </a>
                <a className={"undo-button"} onClick={removeSavedJob}>
                    Remove from saved
                </a>
            </div>}
        </div>
)};

export default JobDescriptionHeader;
