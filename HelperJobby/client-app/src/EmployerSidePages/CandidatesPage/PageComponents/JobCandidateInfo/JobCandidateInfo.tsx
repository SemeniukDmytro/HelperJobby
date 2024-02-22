import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './JobCandidateInfo.scss';
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {JobApplyDTO} from "../../../../DTOs/userJobInteractionsDTOs/JobApplyDTO";
import {
    getFormattedDate_DD_MMM,
    getFormattedMonthName_DD_YYYYDate
} from "../../../../utils/convertLogic/getFormattedMonthName_DD_YYYYDate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEllipsisVertical, faQuestion, faXmark} from "@fortawesome/free-solid-svg-icons";
import {JobApplyStatuses} from "../../../../enums/modelDataEnums/JobApplyStatuses";
import {JobApplyService} from "../../../../services/jobApplyService";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {UpdateJobApplyDTO} from "../../../../DTOs/userJobInteractionsDTOs/UpdateJobApplyDTO";
import DialogWindow from "../../../../Components/DialogWindow/DialogWindow";

interface JobCandidateInfoProps {
    job: JobDTO;
    jobApply: JobApplyDTO;
    setJob: Dispatch<SetStateAction<JobDTO | undefined>>
}

const JobCandidateInfo: FC<JobCandidateInfoProps> = ({job, jobApply, setJob}) => {
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const moreOptionsWindowRef = useRef<HTMLDivElement>(null);
    const [showHiredDialog, setShowHiredDialog] = useState(false);
    const [requestInProgress, setRequestInProgress] = useState(false);
    const jobApplyService = new JobApplyService();

    const handleClickOutside = (event: MouseEvent) => {
        if (moreOptionsWindowRef.current && !moreOptionsWindowRef.current.contains(event.target as Node)) {
            setShowMoreOptions(false);
        }
    };
    
    async function changeJobApplyStatus(jobApplyStatus : JobApplyStatuses, isReviewed : boolean){
        try {
            setRequestInProgress(true);
            const updatedJobApply: UpdateJobApplyDTO = {
                isReviewed: isReviewed,
                jobApplyStatus: jobApplyStatus
            }
            const retrievedJobApply = await jobApplyService.UpdateJobApply(job.id, jobApply.jobSeekerId, updatedJobApply);
            setJob(prev => {
                if (!prev || !prev.jobApplies) return prev;

                const updatedJobApplies = prev.jobApplies.map(application => {
                    if (application.jobSeekerId === jobApply.jobSeekerId) {
                        return {
                            ...application,
                            jobApplyStatus : retrievedJobApply.jobApplyStatus
                        };
                    }
                    return application;
                });

                return {
                    ...prev,
                    jobApplies: updatedJobApplies,
                };
            });
            setShowHiredDialog(false);
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setRequestInProgress(false);
        }
    }

    async function submitCandidateHiring() {
        await changeJobApplyStatus(JobApplyStatuses.Hired, true);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <DialogWindow
                showDialog={showHiredDialog}
                setShowDialog={setShowHiredDialog}
                titleText={"Congratulations!"}
                mainText={"Reporting a hire removes the candidate from the Active list and moves them to Hired."}
                firstButtonText={"Go back"}
                secondButtonText={"Submit"}
                positiveDialog={true}
                requestInProgress={requestInProgress}
                secondButtonOnClick={submitCandidateHiring}/>
            {requestInProgress && <div className={"request-in-process-surface"}></div>}
            <div className={"candidate-info-container"}>
                <div className={"candidate-credentials-container dark-default-text bold-text"}>
                    {jobApply.jobSeeker.firstName && jobApply.jobSeeker.lastName ?
                        <span>{`${jobApply.jobSeeker.firstName} ${jobApply.jobSeeker.lastName}`}</span>
                        :
                        <span>Not specified</span>}
                </div>
                <div className={"review-status-box"}>
                    <span className={"dark-small-text"}>{jobApply.isReviewed ? "Reviewed" : "Awaiting review"}</span>
                    <span
                        className={"grey-small-text"}>Applied on {getFormattedDate_DD_MMM(jobApply.dateApplied)}
                </span>
                </div>
                <div className={"candidate-skills-container"}>
                    {(jobApply.jobSeeker.resume?.skills && jobApply.jobSeeker.resume?.skills.length != 0) ?
                        jobApply.jobSeeker.resume.skills.map((skill, index) => (
                            <div className={"candidate-skill-container light-dark-small-text bold-text"}>
                                {skill.name}
                            </div>
                        ))
                        :
                        <div>
                            Skills not Provided
                        </div>
                    }
                </div>
                <div>
                    {(jobApply.jobSeeker.resume?.workExperiences && jobApply.jobSeeker.resume?.workExperiences.length != 0) ?
                        jobApply.jobSeeker.resume.workExperiences.map((workExperience, index) => (
                            <div className={"candidate-qualifications-container"}>
                                <span className={"dark-default-text"}>{workExperience.jobTitle}</span>
                                <div className={"grey-small-text"}>
                                    <span>{workExperience.company} -&nbsp;</span>
                                    {workExperience.from && (workExperience.to || workExperience.currentlyWorkHere) &&
                                        <span>From {getFormattedMonthName_DD_YYYYDate(workExperience.from)} to&nbsp;
                                            {workExperience.currentlyWorkHere ? "Present" : getFormattedMonthName_DD_YYYYDate(workExperience.to!)}
                                    </span>
                                    }
                                </div>
                            </div>
                        ))
                        :
                        (jobApply.jobSeeker.resume?.educations && jobApply.jobSeeker.resume?.educations.length != 0) ?
                            jobApply.jobSeeker.resume.educations.map((education, index) => (
                                <div className={"candidate-qualifications-container"}>
                                    <div className={"dark-default-text"}>
                                        {education.levelOfEducation}
                                    </div>
                                    <div className={"grey-small-text"}>
                                        {education.fieldOfStudy}
                                    </div>
                                </div>
                            ))
                            :
                            <div className={'dark-default-text'}>
                                Qualifications and experiences not provided
                            </div>
                    }
                </div>
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
                <div className={"more-candidate-options-block"}>
                    <button className={"small-interaction-button"} onClick={() => setShowMoreOptions(!showMoreOptions)}>
                        <FontAwesomeIcon className={"svg125rem"} icon={faEllipsisVertical}/>
                    </button>
                    {showMoreOptions && <div className={"select-window-relative-bar"}
                                             ref={moreOptionsWindowRef}>
                        <div className={"select-window-container candidate-more-options"}>
                            <div className={"select-option"}>
                                Review job apply
                            </div>
                            <div className={"select-option"} onClick={() => setShowHiredDialog(true)}>
                                Hired
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default JobCandidateInfo;
