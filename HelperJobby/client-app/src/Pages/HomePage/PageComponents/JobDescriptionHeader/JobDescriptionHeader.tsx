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
        if (jobSeekerSavedJobs.some(j => j.id == selectedJob?.id)){
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
            setJobSeekerSavedJobs((prevSavedJobs) => prevSavedJobs.filter(savedJob => savedJob.id !== selectedJob?.id));
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
            await jobSeekerService.saveJob(selectedJob!.id);
            setIsJobSaved(true);
            setJobSeekerSavedJobs((prevSavedJobs) => [...prevSavedJobs, selectedJob!]);
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
                <button className={"apply-button"}>
                    Apply now
                </button>
                {!isJobSaved ?  (
                <button className={"save-job-button"} onClick={saveJob}>
                    <FontAwesomeIcon icon={regularHeart} />
                </button>) : (
                <button className={"saved-job-button"} ref={moreActionsButtonRef} onClick={() => setShowRemoveFromSaved(!showRemoveFromSaved)}>
                    <FontAwesomeIcon className={"saved-job-heart"} icon={solidHeart} />
                    <FontAwesomeIcon className={"drop-down-more-options"} icon={faCaretDown} />
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
