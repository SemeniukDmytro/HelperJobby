import React, {FC, useState} from 'react';
import './ResumeSearchInfoBlock.scss';
import {ResumeDTO} from "../../../../DTOs/resumeRelatedDTOs/ResumeDTO";
import {
    getFormattedDate_DD_MMM,
    getFormattedMonthName_DD_YYYYDate
} from "../../../../utils/convertLogic/getFormattedMonthName_DD_YYYYDate";
import {JobApplyStatuses} from "../../../../enums/modelDataEnums/JobApplyStatuses";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEllipsisVertical, faQuestion, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useSearchParams} from "react-router-dom";

interface ResumeSearchInfoBlockProps {
    resume: ResumeDTO
}

const ResumeSearchInfoBlock: FC<ResumeSearchInfoBlockProps> = ({
                                                                   resume
                                                               }
) => {
    const [resumeTitle, setResumeTitle] = useState(getResumeTitle);
    const [searchParams] = useSearchParams();
    
    function getResumeTitle(){
        if (resume.workExperiences.length != 0){
            return resume.workExperiences[0].jobTitle;
        }
        if (resume.educations.length != 0){
            return `${resume.educations[0].levelOfEducation} in ${resume.educations[0].fieldOfStudy}`;
        }
        if (resume.skills.length != 0){
            return resume.skills[0].name;
        }
        return searchParams.get("q")!;
    }

    return (
        <div className={"candidate-info-container"}>
            <div className={"candidate-credentials-container dark-default-text bold-text"}>
                {resumeTitle}
            </div>
            <div className={"review-status-box"}>
                <span className={"dark-small-text"}>Contact job seeker</span>
                <a href={`mailto:${resume.jobSeeker.user.email}`} className="job-seeker-email">
                    {resume.jobSeeker.user.email}
                </a>
            </div>
            <div className={"candidate-skills-container"}>
                {(resume?.skills && resume.skills.length != 0) ?
                    resume.skills.map((skill, index) => (
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
                {(resume.workExperiences && resume.workExperiences.length != 0) ?
                    resume.workExperiences.map((workExperience, index) => (
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
                    <div className={"candidate-qualifications-container"}>
                        No work experience provided
                    </div>
                }

                {(resume.educations && resume.educations.length != 0) ?
                    resume.educations.map((education, index) => (
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
                    <div className={"candidate-qualifications-container"}>
                        No educations provided
                    </div>
                }
            </div>
    )
}

export default ResumeSearchInfoBlock;
