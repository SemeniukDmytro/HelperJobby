import React, {FC, useEffect, useState} from 'react';
import './ResumeInfoComponent.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faPlus, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {useJobSeeker} from "../../hooks/useJobSeeker";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {SkillDTO} from "../../DTOs/resumeRelatedDTOs/SkillDTO";
import {SkillService} from "../../services/skillService";
import {logErrorInfo} from "../../utils/logErrorInfo";
import useResumeBuild from "../../hooks/useResumeBuild";
import {
    ProgressPercentPerPage
} from "../../JobSeekerSidePages/BuildResumePages/SharedComponents/ProgressPercentPerPage";
import WorkExperienceReview
    from "../../JobSeekerSidePages/BuildResumePages/WorkExperiencePage/PageComponents/WorkExperienceReview/WorkExperienceReview";
import EducationReview
    from "../../JobSeekerSidePages/BuildResumePages/EducationPage/PageComponents/EducationReview/EducationReview";

interface ResumeInfoComponentProps {
}

const ResumeInfoComponent: FC<ResumeInfoComponentProps> = () => {
    const {setProgressPercentage, setSaveFunc} = useResumeBuild();
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const {authUser} = useAuth();
    const skillService = new SkillService();
    const navigate = useNavigate();
    const [numberOfSkillToRemove, setNumberOfSkillToRemove] = useState<number | null>(null);
    const currentPath = window.location.pathname;

    useEffect(() => {

        setProgressPercentage(ProgressPercentPerPage * 7);
        setSaveFunc(() => navigateToProfilePage)
    }, []);

    async function navigateToProfilePage() {
        navigate("/my-profile")
    }

    async function removeResumeSkill(skill: SkillDTO, index: number) {
        try {
            setNumberOfSkillToRemove(index);
            await skillService.deleteSkill(skill.id);
            if (jobSeeker?.resume) {
                const updatedResume = {...jobSeeker.resume};
                updatedResume.skills = updatedResume.skills.filter(
                    (currentSkill) => currentSkill.id !== skill.id
                );
                setJobSeeker((prev) => {
                    return prev ?
                        {
                            ...prev,
                            resume: updatedResume
                        }
                        : null
                })
            }
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setNumberOfSkillToRemove(null);
        }
    }

    function navigateToEditContactInfoPage() {
        navigate("/resume/contact")
    }

    function addResumeInfo(infoType: string) {
        navigate(`${currentPath}/${infoType}/add`)
    }

    return (
        <>
            <div className={"short-info-container border-remove"}>
                <div className={"content-start-container"}>
                    <div className={"short-info-content"}>
                        <div className={"small-margin-top"}></div>
                        {(jobSeeker?.firstName && jobSeeker?.lastName) ?
                            <div className={"small-header-text"}>
                                {jobSeeker?.firstName} {jobSeeker?.lastName}
                            </div>
                            :
                            <a
                                className={"job-seeker-add-name small-header-font-size"}
                                onClick={navigateToEditContactInfoPage}
                            > Add name
                            </a>
                        }

                        <div className={"gray-text small-margin-bottom"}>
                            {authUser?.user.email}
                        </div>
                        <div className={"gray-text small-margin-bottom"}>
                            {jobSeeker?.address?.city}
                        </div>
                    </div>
                    <div className={"small-buttons-container"}>
                        <button
                            className={"small-interaction-button medium-margin-right"}
                            onClick={navigateToEditContactInfoPage}
                        >
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
                    <button className={"small-interaction-button"} onClick={() => addResumeInfo("experience")}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
                {jobSeeker?.resume?.workExperiences.length == 0 ?
                    (<div className={"no-resume-info-container"}>
                        Your work experience will appear here
                    </div>)
                    :
                    (jobSeeker?.resume?.workExperiences.map((experience, index) => (
                        <WorkExperienceReview
                            key={index}
                            workExperience={experience}
                        />)))
                }
            </div>
            <div className={"resume-info-block"}>
                <div className={"resume-block-header-container"}>
                    <div className={"small-header-text"}>
                        Education
                    </div>
                    <button className={"small-interaction-button"} onClick={() => addResumeInfo("education")}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
                {jobSeeker?.resume?.educations.length == 0 ?
                    (<div className={"no-resume-info-container"}>
                        Your education will appear here
                    </div>)
                    :
                    (jobSeeker?.resume?.educations.map((education, index) => (
                        <EducationReview
                            key={index}
                            education={education}
                        />)))
                }
            </div>
            <div className={"resume-info-block"}>
                <div className={"resume-block-header-container"}>
                    <div className={"small-header-text"}>
                        Skills
                    </div>
                    <button className={"small-interaction-button"} onClick={() => addResumeInfo("skills")}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
                {jobSeeker?.resume?.skills.length == 0 ?
                    (<div className={"no-resume-info-container"}>
                        Your skills will appear here
                    </div>)
                    :
                    (jobSeeker?.resume?.skills.map((skill, index) => (
                        <div key={index} className={"skill-container"}>
                            {numberOfSkillToRemove === index && <div className={"request-in-process-surface"}></div>}
                            <div className={"skill-name"}>
                                {skill.name}
                            </div>
                            <button className={"remove-skill-button"} onClick={() => removeResumeSkill(skill, index)}>
                                <FontAwesomeIcon icon={faTrashCan}/>
                            </button>
                        </div>)))
                }
            </div>
            {currentPath != "/resume" &&
                <>
                    <div style={{marginBottom: "1rem"}} className={"content-separation-line"}></div>
                    <div className={"form-and-buttons-divider"}>
                        <button className={"blue-button min-continue-button-size"} onClick={navigateToProfilePage}>
                            <span>Continue</span>
                        </button>
                    </div>
                </>
            }
            <div className={"bottom-page-margin"}>

            </div>
        </>
    )
}

export default ResumeInfoComponent;
