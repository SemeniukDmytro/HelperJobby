import React, {FC, useEffect, useState} from 'react';
import './EducationReview.scss';
import {EducationDTO} from "../../../../../DTOs/resumeRelatedDTOs/EducationDTO";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {convertNumericMonthToStringValue} from "../../../../../utils/convertLogic/convertNumericMonthToStringValue";
import {useNavigate} from "react-router-dom";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {EducationService} from "../../../../../services/educationService";
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import {getResumeInfoPageParentPath} from "../../../../../utils/getResumeInfoPageParentPath";

interface EducationReviewProps {
    education: EducationDTO;
}

const EducationReview: FC<EducationReviewProps> = ({education}) => {
    const [fromMonth, setFromMonth] = useState("");
    const [fromYear, setFromYear] = useState("");
    const [toMonth, setToMonth] = useState("");
    const [toYear, setToYear] = useState("");
    const convertedFrom = education.from?.toString().split("-");
    const convertedTo = education.to?.toString().split("-");
    const navigate = useNavigate();
    const [savingInfo, setSavingInfo] = useState(false);
    const educationService = new EducationService();
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const [editEducationPath, setEditEducationPath] = useState("");

    useEffect(() => {
        const currentPath = window.location.pathname;
        let parentPath = getResumeInfoPageParentPath(currentPath);
        parentPath = `${parentPath}/education/${education.id}`
        setEditEducationPath(parentPath);
    }, []);

    useEffect(() => {
        if (convertedFrom && convertedTo) {
            setFromMonth(convertNumericMonthToStringValue(convertedFrom[1]));
            setFromYear(convertedFrom[0]);
            setToMonth(convertNumericMonthToStringValue(convertedTo[1]));
            setToYear(convertedTo[0]);
        }
    }, []);

    function navigateToEditEducationPage() {
        navigate(editEducationPath)
    }

    async function deleteEducation() {
        try {
            setSavingInfo(true);
            await educationService.deleteEducation(education.id);
            if (jobSeeker) {
                const updatedJobSeeker = {...jobSeeker};
                if (updatedJobSeeker.resume) {
                    updatedJobSeeker.resume.educations = updatedJobSeeker.resume.educations.filter(edu => edu.id !== education.id);
                    if (updatedJobSeeker.resume.educations.length < 0 && updatedJobSeeker.resume.workExperiences.length < 0
                        && updatedJobSeeker.resume.skills.length < 0) {
                        updatedJobSeeker.resume = null;
                    }
                }
                setJobSeeker(updatedJobSeeker);
            }
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setSavingInfo(false);
        }
    }

    return (
        <div>
            <div className={"short-info-container"}>
                {savingInfo && <div className={"request-in-process-surface"}></div>}
                <div className={"review-block"}>
                    <div className={"required-info"}>
                        <span>{education.levelOfEducation} </span>
                        {education.fieldOfStudy && <span>in {education.fieldOfStudy}</span>}
                    </div>
                    <div className={"semi-dark-small-text"}>
                        <span>{education.schoolName}</span>
                        {education.schoolName && education.city && <span>&nbsp;-&nbsp;</span>}
                        <span>{education.city}</span>
                    </div>
                    {fromYear &&
                        <div>
                            <div className={"light-dark-small-text"}>
                                <span>{fromMonth} {fromYear} to {toMonth} {toYear}</span>
                            </div>
                        </div>}
                    <div>
                        {!education.fieldOfStudy &&
                            <button className={"add-info-button"} onClick={navigateToEditEducationPage}>
                                Add field of study
                            </button>}
                        {!education.city &&
                            <button className={"add-info-button"} onClick={navigateToEditEducationPage}>
                                Add location
                            </button>}
                        {!education.schoolName &&
                            <button className={"add-info-button"} onClick={navigateToEditEducationPage}>
                                Add school
                            </button>}
                        {!convertedFrom &&
                            <button className={"add-info-button"} onClick={navigateToEditEducationPage}>
                                Add dates
                            </button>}
                    </div>
                </div>
                <div className={"small-buttons-container"}>
                    <button className={"small-interaction-button"} onClick={navigateToEditEducationPage}>
                        <FontAwesomeIcon icon={faPen}/>
                    </button>
                    <button className={"small-interaction-button"} onClick={deleteEducation}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </div>

            </div>
        </div>
    )
};

export default EducationReview;
