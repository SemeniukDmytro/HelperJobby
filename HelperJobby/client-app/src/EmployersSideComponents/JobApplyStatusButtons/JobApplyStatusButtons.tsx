import React, {Dispatch, FC, SetStateAction} from 'react';
import './JobApplyStatusButtons.scss';
import {JobApplyDTO} from "../../DTOs/userJobInteractionsDTOs/JobApplyDTO";
import {JobApplyStatuses} from "../../enums/modelDataEnums/JobApplyStatuses";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faQuestion, faXmark} from "@fortawesome/free-solid-svg-icons";
import {UpdateJobApplyDTO} from "../../DTOs/userJobInteractionsDTOs/UpdateJobApplyDTO";
import {logErrorInfo} from "../../utils/logErrorInfo";
import {JobApplyService} from "../../services/jobApplyService";

interface JobApplyStatusButtonsProps {
    jobApply: JobApplyDTO;
    setJobApply: Dispatch<SetStateAction<JobApplyDTO | undefined>>;
    setRequestInProgress: Dispatch<SetStateAction<boolean>>;
}

const JobApplyStatusButtons: FC<JobApplyStatusButtonsProps> = ({
                                                                   jobApply,
                                                                   setJobApply,
                                                                   setRequestInProgress
                                                               }) => {
    const jobApplyService = new JobApplyService();

    async function changeJobApplyStatus(jobApplyStatus: JobApplyStatuses, isReviewed: boolean) {
        try {
            setRequestInProgress(true);
            const updatedJobApply: UpdateJobApplyDTO = {
                isReviewed: isReviewed,
                jobApplyStatus: jobApplyStatus
            }
            const retrievedJobApply = await jobApplyService.UpdateJobApply(jobApply!.jobId, jobApply!.jobSeekerId, updatedJobApply);
            setJobApply(prev => {
                return prev && {
                    ...prev,
                    jobApplyStatus: retrievedJobApply.jobApplyStatus
                };
            });
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setRequestInProgress(false);
        }
    }

    return (
        <div className={"job-apply-status"}>
            <span className={"bold-text mr1rem"}>Interested?</span>
            <div className={"flex-row"}>
                <button className={`light-button-with-margin mr0
                 left-connected-button
                 ${jobApply.jobApplyStatus == JobApplyStatuses.Hired || jobApply.jobApplyStatus == JobApplyStatuses.Interested ?
                    "green-button" : ""}`}
                        disabled={jobApply.jobApplyStatus == JobApplyStatuses.Hired}
                        onClick={() => changeJobApplyStatus(JobApplyStatuses.Interested, jobApply.isReviewed)}
                >
                    <FontAwesomeIcon
                        className={`svg1rem ${jobApply.jobApplyStatus == JobApplyStatuses.Hired || jobApply.jobApplyStatus == JobApplyStatuses.Interested
                            ? "" : "semi-dark-default-text"}`}
                        icon={faCheck}/>
                </button>
                <button className={`light-button-with-margin middle-connected-button mr0
                ${jobApply.jobApplyStatus == JobApplyStatuses.NotSpecified ?
                    "dark-neutral-button" : ""}`}
                        disabled={jobApply.jobApplyStatus == JobApplyStatuses.Hired}
                        onClick={() => changeJobApplyStatus(JobApplyStatuses.NotSpecified, jobApply.isReviewed)}
                >
                    <FontAwesomeIcon
                        className={`svg1rem ${jobApply.jobApplyStatus == JobApplyStatuses.NotSpecified ? "" : "semi-dark-default-text"}`}
                        icon={faQuestion}/>
                </button>
                <button className={`light-button-with-margin mr0 right-connected-button
                ${jobApply.jobApplyStatus == JobApplyStatuses.Rejected ? "red-button" : ""}`}
                        disabled={jobApply.jobApplyStatus == JobApplyStatuses.Hired}
                        onClick={() => changeJobApplyStatus(JobApplyStatuses.Rejected, jobApply.isReviewed)}
                >
                    <FontAwesomeIcon
                        className={`svg1rem ${jobApply.jobApplyStatus == JobApplyStatuses.Rejected ? "" : "semi-dark-default-text"}`}
                        icon={faXmark}/>
                </button>
            </div>
        </div>
    )
}

export default JobApplyStatusButtons;
