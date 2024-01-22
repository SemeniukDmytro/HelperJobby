import React, { FC } from 'react';
import './ResumeInfoComponent.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useJobSeeker} from "../../hooks/useJobSeeker";
import {useAuth} from "../../hooks/useAuth";
import WorkExperienceReview
    from "../../Pages/BuildResumePages/WorkExperiencePage/PageComponents/WorkExperienceReview/WorkExperienceReview";
import EducationReview from "../../Pages/BuildResumePages/EducationPage/PageComponents/EducationReview/EducationReview";
import SkillContainer from "../../Pages/BuildResumePages/SkillsPage/PageComponents/SkillContainer/SkillContainer";
import WhiteLoadingSpinner from "../WhiteLoadingSpinner/WhiteLoadingSpinner";

interface ResumeInfoComponentProps {}

const ResumeInfoComponent: FC<ResumeInfoComponentProps> = () => {
    const {jobSeeker} = useJobSeeker();
    const {authUser} = useAuth();

    function removeResumeSkill() {
        
    }

    return (
        <>
            <div className={"build-page-header subtitle-margin"}>
                Is your resume ready?
            </div>
            <div className={"build-page-subtitle"}>
                Review and make any changes below.
            </div>
            <div className={"resume-content-separation-line"}/>
            <div className={"short-info-container border-remove"}>
                <div className={"content-start-container"}>
                    <div className={"short-info-content"}>
                        <div className={"small-margin-top"}></div>
                        <div className={"small-header-text"}>
                            {jobSeeker?.firstName} {jobSeeker?.lastName}
                        </div>
                        <div className={"gray-text small-margin-bottom"}>
                            {authUser?.user.email}
                        </div>
                        <div className={"gray-text small-margin-bottom"}>
                            {jobSeeker?.address?.city}
                        </div>
                    </div>
                    <div className={"small-buttons-container"}>
                        <button className={"small-interaction-button medium-margin-right"}>
                            <FontAwesomeIcon icon={faPen}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className={"resume-info-block"}>
                <div className={"resume-block-header-container"}>
                    <div className={"small-header-text"}>
                        Work experience
                    </div>
                    <div className={"small-interaction-button"}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </div>
                </div>
                {jobSeeker?.resume?.educations.length == 0 ?
                    (<div className={"no-resume-info-container"}>
                        Your work experience will appear here
                    </div>)
                    :
                    (jobSeeker?.resume?.workExperiences.map((experience, index) => (
                        <WorkExperienceReview workExperience={experience}/>)))
                }
            </div>
            <div className={"resume-info-block"}>
                <div className={"resume-block-header-container"}>
                    <div className={"small-header-text"}>
                        Education
                    </div>
                    <div className={"small-interaction-button"}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </div>
                </div>
                {jobSeeker?.resume?.educations.length == 0 ?
                    (<div className={"no-resume-info-container"}>
                        Your education will appear here
                    </div>)
                    :
                    (jobSeeker?.resume?.educations.map((education, index) => (
                        <EducationReview education={education}/>)))
                }
            </div>
            <div className={"resume-info-block"}>
                <div className={"resume-block-header-container"}>
                    <div className={"small-header-text"}>
                        Skills
                    </div>
                    <div className={"small-interaction-button"}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </div>
                </div>
                {jobSeeker?.resume?.skills.length == 0 ?
                    (<div className={"no-resume-info-container"}>
                        Your skills will appear here
                    </div>)
                    :
                    (jobSeeker?.resume?.skills.map((skill, index) => (
                        <SkillContainer skillName={skill.name} removeSkill={removeResumeSkill}/>)))
                }
            </div>
            <div className={"resume-content-separation-line"}></div>
            <div className={"form-and-buttons-divider"}>
                <button className={"blue-button min-continue-button-size"}>
                    <span>Continue</span>
                </button>
            </div>
        </>
    )
}

export default ResumeInfoComponent;
