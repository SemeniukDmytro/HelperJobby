import React, {FC, useState} from 'react';
import './SavedJobComponent.scss';
import UserJobInteractionShortJobInfo
    from "../../../SharedComponents/UserJobInteractionShortJobInfo/UserJobInteractionShortJobInfo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark, faXmark} from "@fortawesome/free-solid-svg-icons";
import {JobDTO} from "../../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import {JobSeekerAccountService} from "../../../../../services/jobSeekerAccountService";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {useJobSeekerJobInteractions} from "../../../../../hooks/useJobSeekerJobInteractions";
import {UserJobInteractionsTypes} from "../../../../../enums/UserJobInteractionsTypes";

interface SavedJobComponentProps {
    job : JobDTO;
    interactionTime : Date;
}

const SavedJobComponent: FC<SavedJobComponentProps> = ({job, interactionTime}) => {
    const {setSavedJobs} = useJobSeekerJobInteractions();
    const {setJobSeekerSavedJobs, jobSeekerSavedJobs} = useJobSeeker();
    const jobSeekerService = new JobSeekerAccountService();
    const [showRemoveFromSaved, setShowRemoveFromSaved] = useState(false);
    const [showUndoRemoveWindow, setShowUndoRemoveWindow] = useState(true);
    const [requestInProcess, setRequestInProcess] = useState(false);
    async function removeSavedJob() {
        try {
            if (requestInProcess){
                return;
            }
            setRequestInProcess(true);
            await jobSeekerService.deleteSavedJob(job.id);
            setJobSeekerSavedJobs((prevSavedJobs) => prevSavedJobs
                .filter(savedJob => savedJob.jobId !== job.id));
            
            setShowRemoveFromSaved(true);
        } catch (error) {
            logErrorInfo(error)
        }
        finally {
            setRequestInProcess(false);
        }
    }

    async function saveJob() {
        try {
            if (requestInProcess){
                return;
            }
            setRequestInProcess(true);
            const retrievedSavedJob = await jobSeekerService.saveJob(job.id);
            retrievedSavedJob.job = job;
            setJobSeekerSavedJobs((prevSavedJobs) => [...prevSavedJobs, retrievedSavedJob!]);
            setShowRemoveFromSaved(false);
        } catch (error) {
            logErrorInfo(error);
        }
        finally {
            setRequestInProcess(false);
        }
    }
    
    function closeUndoActionWindow(){
        setShowUndoRemoveWindow(false);
        setSavedJobs((prevSavedJobs) => prevSavedJobs
            .filter(savedJob => savedJob.jobId !== job.id));
    }
    
    return (
        !showUndoRemoveWindow ? null : <>
        <div className={"ji-job-block"}>
            {!showRemoveFromSaved ?
                (<div className={"ji-job-layout"}>
                    <UserJobInteractionShortJobInfo job={job}
                                                    interactionTime={interactionTime}
                                                    jobInteractionType={UserJobInteractionsTypes.saved}/>
                    <div className={"ji-apply-fb"}>
                        <div>
                            <button className={"blue-button"}>
                                Apply now
                            </button>
                        </div>
                    </div>
                    <div className={"ji-remove-from-saved-fb"}>
                        <button className={"medium-tr-btn-with-icon"} onClick={removeSavedJob}>
                            <FontAwesomeIcon icon={faBookmark}/>
                        </button>
                    </div>
                </div>)
                :
                (
                    <div className={"job-interaction-deleted-box"}>
                        <div>
                            <span className={"semi-dark-default-text bold-text"}>{job.jobTitle}&nbsp;</span>
                            <span className={"light-dark-default-text"}>has been unsaved.&nbsp;</span>
                            <a className={"bold-navigation-link"} onClick={saveJob}>Undo</a>
                        </div>
                        <div>
                            <button className={"medium-tr-btn-with-icon"} onClick={closeUndoActionWindow}>
                                <FontAwesomeIcon className={"medium-svg"} icon={faXmark}/>
                            </button>
                        </div>
                    </div>
                )}
        </div>
        <div className={"content-separation-line"}/>
    </>)
}

export default SavedJobComponent;
