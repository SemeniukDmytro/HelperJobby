import React, {FC, useState} from 'react';
import './JobApplyComponent.scss';
import {JobDTO} from "../../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {useJobSeekerJobInteractions} from "../../../../../hooks/useJobSeekerJobInteractions";
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import {JobSeekerAccountService} from "../../../../../services/jobSeekerAccountService";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import UserJobInteractionShortJobInfo
    from "../../../SharedComponents/UserJobInteractionShortJobInfo/UserJobInteractionShortJobInfo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark, faXmark} from "@fortawesome/free-solid-svg-icons";
import {JobApplyService} from "../../../../../services/jobApplyService";
import {UserJobInteractionsTypes} from "../../../../../enums/UserJobInteractionsTypes";

interface JobApplyComponentProps {
    job : JobDTO;
    dateApplied : Date;
}

const JobApplyComponent: FC<JobApplyComponentProps> = ({job, dateApplied}) => {
    const {setJobApplies} = useJobSeekerJobInteractions();
    const {setJobSeeker} = useJobSeeker();
    const jobApplyService = new JobApplyService();
    const [showApplyRemoved, setShowApplyRemoved] = useState(false);
    const [showUndoRemoveWindow, setShowUndoRemoveWindow] = useState(true);
    const [requestInProcess, setRequestInProcess] = useState(false);
    async function removeJobApply() {
        try {
            if (requestInProcess){
                return;
            }
            setRequestInProcess(true);
            await jobApplyService.deleteJobApply(job.id);
            setJobSeeker(prevJobSeeker => {
                return prevJobSeeker && {
                    ...prevJobSeeker,
                    jobApplies: prevJobSeeker.jobApplies.filter(jobApply => jobApply.jobId !== job.id)
                }
            });

            setShowApplyRemoved(true);
        } catch (error) {
            logErrorInfo(error)
        }
        finally {
            setRequestInProcess(false);
        }
    }

    async function reApply() {
        try {
            if (requestInProcess){
                return;
            }
            setRequestInProcess(true);
            const retrievedJobApply = await  jobApplyService.postJobApply(job.id);
            retrievedJobApply.job = job;
            setJobSeeker(prevJobSeeker => {
                return prevJobSeeker && {
                    ...prevJobSeeker,
                    jobApplies: [...prevJobSeeker.jobApplies, retrievedJobApply]
                };
            });
            setShowApplyRemoved(false);
        } catch (error) {
            logErrorInfo(error);
        }
        finally {
            setRequestInProcess(false);
        }
    }

    function closeUndoActionWindow(){
        setShowUndoRemoveWindow(false);
        setJobApplies((prevJobApplies) => prevJobApplies!
            .filter(jobApply => jobApply.jobId !== job.id));
    }

    return (
        !showUndoRemoveWindow ? null : <>
            <div className={"ji-job-block"}>
                {!showApplyRemoved ?
                    (<div className={"ji-job-layout"}>
                        <UserJobInteractionShortJobInfo job={job}
                                                        interactionTime={dateApplied}
                                                        jobInteractionType={UserJobInteractionsTypes.applied}/>
                        <div className={"ji-remove-apply-fb"}>
                            <div>
                                <button className={"light-button-with-margin button-without-margin"} onClick={removeJobApply}>
                                    Remove apply
                                </button>
                            </div>
                        </div>
                    </div>)
                    :
                    (
                        <div className={"job-interaction-deleted-box"}>
                            <div>
                                <span className={"semi-dark-default-text bold-text"}>{job.jobTitle}&nbsp;</span>
                                <span className={"light-dark-default-text"}>apply was removed.&nbsp;</span>
                                <a className={"bold-navigation-link"} onClick={reApply}>Undo</a>
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

export default JobApplyComponent;
