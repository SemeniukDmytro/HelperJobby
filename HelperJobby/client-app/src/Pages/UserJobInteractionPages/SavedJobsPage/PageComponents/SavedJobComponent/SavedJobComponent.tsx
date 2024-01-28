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
import {
    JobActionFunction,
    ShowRemoveFromSavedSetter
} from "../../../../../hooks/customHooksTypes/UseJobActionsHookTypes";
import {useAuth} from "../../../../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {useJobActions} from "../../../../../hooks/useJobActions";

interface SavedJobComponentProps {
    job : JobDTO;
    interactionTime : Date;
}

const SavedJobComponent: FC<SavedJobComponentProps> = ({job, interactionTime}) => {
    const {setSavedJobs} = useJobSeekerJobInteractions();
    const {setJobSeekerSavedJobs} = useJobSeeker();
    const jobSeekerService = new JobSeekerAccountService();
    const [showRemoveFromSaved, setShowRemoveFromSaved] = useState(false);
    const [showUndoRemoveWindow, setShowUndoRemoveWindow] = useState(true);
    const {authUser} = useAuth();
    const navigate = useNavigate();
    const {saveJob, removeSavedJob} = useJobActions(jobSeekerService, setJobSeekerSavedJobs, job);

    async function handleJobInteraction(actionFunction : JobActionFunction, setShowRemoveFromSavedValue : ShowRemoveFromSavedSetter) {
        try {
            if (!authUser) {
                navigate("/auth-page");
                return;
            }

            await actionFunction(job.id);
            setShowRemoveFromSavedValue(actionFunction === removeSavedJob);
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
    
    function closeUndoActionWindow(){
        setShowUndoRemoveWindow(false);
        setSavedJobs((prevSavedJobs) => prevSavedJobs!
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
                    <div className={"ml1rem"}>
                        <button className={"medium-tr-btn-with-icon"} onClick={handleRemoveSavedJobClick}>
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
                            <a className={"bold-navigation-link"} onClick={handleSaveJobClick}>Undo</a>
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
