import React, {FC, useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import {useHomePage} from "../../hooks/useHomePage";
import "./JobDescriptionHeader.scss";
import {thousandsDisplayHelper} from "../../utils/thousandsDisplayHelper";
import {faCaretDown, faHeart as solidHeart} from "@fortawesome/free-solid-svg-icons";
import {JobSeekerAccountService} from "../../services/jobSeekerAccountService";
import {ServerError} from "../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../utils/logErrorInfo";

interface JobDescriptionHeaderProps {}

const JobDescriptionHeader: FC<JobDescriptionHeaderProps> = () => {

    const {
        fullHeaderGridTemplate,
        setFullHeaderGridTemplate,
        shortHeaderGridTemplate,
        setShortHeaderGridTemplate,
        userSavedJobs,
        setUserSavedJobs,
        selectedJob} = useHomePage();
    
    const [isJobSaved, setIsJobSaved] = useState(false);
    
    const moreActionsButtonRef = useRef<HTMLButtonElement | null>(null);
    
    const jobSeekerService = new JobSeekerAccountService();
    
    useEffect(() => {
        setFullHeaderGridTemplate(1);
        setShortHeaderGridTemplate(0);
    },[])


    useEffect(() => {
        if (userSavedJobs.some(j => j.id == selectedJob?.id)){
            setIsJobSaved(true)
        }
        else {
            setIsJobSaved(false)
        }
    }, [userSavedJobs]);

    async function removeSavedJob() {
        try {
           await jobSeekerService.deleteSavedJob(selectedJob!.id);
           setIsJobSaved(false);
            setUserSavedJobs((prevSavedJobs) => prevSavedJobs.filter(savedJob => savedJob.id !== selectedJob?.id));
        }
        catch (error){
            if (error instanceof ServerError){
                logErrorInfo(error)
            }
        }
    }

    async function saveJob() {
        try {
            await jobSeekerService.saveJob(selectedJob!.id);
            setIsJobSaved(true);
            setUserSavedJobs((prevSavedJobs) => [...prevSavedJobs, selectedJob!]);
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
            <div className={"full-header-info"} style={{gridTemplateRows : `${fullHeaderGridTemplate}fr`}}>
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
            <div className={"short-header-info" } style={{gridTemplateRows : `${shortHeaderGridTemplate}fr`}}>
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
                <button className={"saved-job-button"} ref={moreActionsButtonRef}>
                    <FontAwesomeIcon className={"saved-job-heart"} icon={solidHeart} />
                    <FontAwesomeIcon className={"drop-down-more-options"} icon={faCaretDown} />
                </button>)}
            </div>
            {isJobSaved && <div className={"undo-action-box"}>
                <a className={"action-name"}>
                     Moved to saved
                </a>
                <a className={"undo-button"} onClick={removeSavedJob}>
                    Undo
                </a>
            </div>}
        </div>
)};

export default JobDescriptionHeader;
