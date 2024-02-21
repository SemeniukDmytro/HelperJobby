import React, {FC} from 'react';
import './JobCandidateInfo.scss';
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {JobApplyDTO} from "../../../../DTOs/userJobInteractionsDTOs/JobApplyDTO";
import {
    getFormattedDate_DD_MMM,
    getFormattedMonthName_DD_YYYYDate
} from "../../../../utils/convertLogic/getFormattedMonthName_DD_YYYYDate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEllipsisVertical, faQuestion, faXmark} from "@fortawesome/free-solid-svg-icons";

interface JobCandidateInfoProps {
    job: JobDTO;
    jobApply: JobApplyDTO;
}

const JobCandidateInfo: FC<JobCandidateInfoProps> = ({job, jobApply}) => {

    return (
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
                        <div className={"candidate-work-experience-container"}>
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
                            <div className={"candidate-work-experience-container"}>
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
                <button className={"light-button-with-margin mr0 left-connected-button"}>
                    <FontAwesomeIcon className={"svg1rem semi-dark-default-text"} icon={faCheck}/>
                </button>
                <button className={"light-button-with-margin middle-connected-button mr0"}>
                    <FontAwesomeIcon className={"svg1rem semi-dark-default-text"} icon={faQuestion} />
                </button>
                <button className={"light-button-with-margin mr0 right-connected-button"}>
                    <FontAwesomeIcon className={"svg1rem semi-dark-default-text"} icon={faXmark} />
                </button>
            </div>
            <div className={"more-candidate-options-block"}>
                <button className={"more-options-button"}>
                    <FontAwesomeIcon className={"svg125rem"} icon={faEllipsisVertical}/>
                </button>
            </div>
        </div>
    )
}

export default JobCandidateInfo;
