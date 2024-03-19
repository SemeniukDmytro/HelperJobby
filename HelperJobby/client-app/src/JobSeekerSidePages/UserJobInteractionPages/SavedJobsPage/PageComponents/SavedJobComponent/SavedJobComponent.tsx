import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './SavedJobComponent.scss';
import UserJobInteractionShortJobInfo
    from "../../../SharedComponents/UserJobInteractionShortJobInfo/UserJobInteractionShortJobInfo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark, faXmark} from "@fortawesome/free-solid-svg-icons";
import {JobDTO} from "../../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {UserJobInteractionsTypes} from "../../../../../enums/utilityEnums/UserJobInteractionsTypes";
import {useJobSeekerJobInteractions} from "../../../../../hooks/contextHooks/useJobSeekerJobInteractions";
import {useJobSeeker} from "../../../../../hooks/contextHooks/useJobSeeker";
import {JobSeekerService} from "../../../../../services/jobSeekerService";
import {useAuth} from "../../../../../hooks/contextHooks/useAuth";
import {useNavigate} from "react-router-dom";
import {useJobActions} from "../../../../../hooks/comnonentSharedHooks/useJobActions";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";

interface SavedJobComponentProps {
    job: JobDTO;
    interactionTime: string;
}

const SavedJobComponent: FC<SavedJobComponentProps> = ({job, interactionTime}) => {
    const {setSavedJobs, jobApplies} = useJobSeekerJobInteractions();
    const {setJobSeeker} = useJobSeeker();
    const jobSeekerService = new JobSeekerService();
    const [showRemoveFromSaved, setShowRemoveFromSaved] = useState(false);
    const [showUndoRemoveWindow, setShowUndoRemoveWindow] = useState(true);
    const {authUser} = useAuth();
    const navigate = useNavigate();
    const {saveJob, removeSavedJob} = useJobActions(jobSeekerService, setJobSeeker, job);
    const [isApplied, setIsApplied] = useState(false);
    const [requestInProgress, setRequestInProgress] = useState(false);

    useEffect(() => {
        if (jobApplies) {
            setIsApplied(jobApplies?.some(application => application.jobId === job.id) || false);
        }
    }, [jobApplies]);

    async function handleJobInteraction(actionFunction: (jobId: number) => void, setShowRemoveFromSavedValue: Dispatch<SetStateAction<boolean>>) {
        try {
            setRequestInProgress(true)
            if (!authUser) {
                navigate("/auth-page");
                return;
            }

            await actionFunction(job.id);
            setShowRemoveFromSavedValue(actionFunction === removeSavedJob);
        } catch (err) {
            logErrorInfo(err);
        } finally {
            setRequestInProgress(false)
        }
    }

    async function handleRemoveSavedJobClick() {
        await handleJobInteraction(removeSavedJob, setShowRemoveFromSaved);
    }

    async function handleSaveJobClick() {
        await handleJobInteraction(saveJob, setShowRemoveFromSaved);
    }

    function closeUndoActionWindow() {
        setShowUndoRemoveWindow(false);
        setSavedJobs((prevSavedJobs) => prevSavedJobs!
            .filter(savedJob => savedJob.jobId !== job.id));
    }

    async function handleJobApply() {
        navigate(`/job-apply/${job.id}/contact-info`);
    }

    return (
        !showUndoRemoveWindow ? null : <>
            <div className={"ji-job-block"}>
                {!showRemoveFromSaved ?
                    (<div className={"ji-job-layout"}>
                        <UserJobInteractionShortJobInfo
                            job={job}
                            interactionTime={interactionTime}
                            jobInteractionType={UserJobInteractionsTypes.saved}
                        />
                        <div className={"ji-apply-fb"}>
                            <div>
                                <button className={"blue-button"}
                                        onClick={handleJobApply}
                                        disabled={isApplied || requestInProgress}>
                                    {isApplied ? "Applied" : "Apply now"}
                                </button>
                            </div>
                        </div>
                        <div className={"ml1rem"}>
                            <button className={"medium-tr-btn-with-icon"}
                                    disabled={requestInProgress}
                                    onClick={handleRemoveSavedJobClick}>
                                <FontAwesomeIcon className={"svg"} icon={faBookmark}/>
                            </button>
                        </div>
                    </div>)
                    :
                    (
                        <div className={"job-interaction-deleted-box"}>
                            <div>
                                <span className={"light-dark-default-text bold-text"}>{job.jobTitle}&nbsp;</span>
                                <span className={"grey-default-text"}>has been unsaved.&nbsp;</span>
                                <a className={"bold-navigation-link"} onClick={handleSaveJobClick}>Undo</a>
                            </div>
                            <div>
                                <button className={"medium-tr-btn-with-icon"} onClick={closeUndoActionWindow}>
                                    <FontAwesomeIcon className={"svg125rem"} icon={faXmark}/>
                                </button>
                            </div>
                        </div>
                    )}
            </div>
            <div className={"content-separation-line"}/>
        </>)
}

export default SavedJobComponent;
