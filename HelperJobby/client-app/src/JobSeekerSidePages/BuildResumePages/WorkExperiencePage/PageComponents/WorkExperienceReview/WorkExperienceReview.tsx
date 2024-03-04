import React, {FC, useEffect, useState} from 'react';
import './WorkExperienceReview.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {WorkExperienceDTO} from "../../../../../DTOs/resumeRelatedDTOs/WorkExperienceDTO";
import {convertNumericMonthToStringValue} from "../../../../../utils/convertLogic/convertNumericMonthToStringValue";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {WorkExperienceService} from "../../../../../services/workExperienceService";
import {getResumeInfoPageParentPath} from "../../../../../utils/getResumeInfoPageParentPath";
import {useJobSeeker} from "../../../../../hooks/contextHooks/useJobSeeker";

interface WorkExperienceReviewProps {
    workExperience: WorkExperienceDTO;
}

const WorkExperienceReview: FC<WorkExperienceReviewProps> = ({workExperience}) => {
    const [fromMonth, setFromMonth] = useState("");
    const [fromYear, setFromYear] = useState("");
    const [toMonth, setToMonth] = useState("");
    const [toYear, setToYear] = useState("");
    const convertedFrom = workExperience.from?.toString().split("-");
    const convertedTo = workExperience.to?.toString().split("-");
    const navigate = useNavigate();
    const [savingInfo, setSavingInfo] = useState(false);
    const workExperienceService = new WorkExperienceService();
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const [editWorkExperiencePath, setEditWorkExperiencePath] = useState("");

    useEffect(() => {
        const currentPath = window.location.pathname;
        let parentPath = getResumeInfoPageParentPath(currentPath);
        parentPath = `${parentPath}/experience/${workExperience.id}`
        setEditWorkExperiencePath(parentPath);
    }, []);

    useEffect(() => {
        if (convertedFrom) {
            setFromMonth(convertNumericMonthToStringValue(convertedFrom[1]));
            setFromYear(convertedFrom[0]);

        }
        if (convertedTo) {
            setToMonth(convertNumericMonthToStringValue(convertedTo[1]));
            setToYear(convertedTo[0]);
        }
    }, []);

    function navigateToEditWorkExperiencePage() {
        navigate(editWorkExperiencePath);
    }

    async function deleteWorkExperience() {
        try {
            setSavingInfo(true);
            await workExperienceService.deleteWorkExperience(workExperience.id);
            if (jobSeeker) {
                const updatedJobSeeker = {...jobSeeker};
                if (updatedJobSeeker.resume) {
                    updatedJobSeeker.resume.workExperiences = updatedJobSeeker.resume.workExperiences
                        .filter(we => we.id !== workExperience.id);
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
                        <span>{workExperience.jobTitle} </span>
                    </div>
                    <div className={"light-dark-small-text"}>
                        <span>{workExperience.company}</span>
                        {workExperience.company && workExperience.cityOrProvince && <span>&nbsp;-&nbsp;</span>}
                        <span>{workExperience.cityOrProvince}</span>
                    </div>
                    {(fromYear || workExperience.currentlyWorkHere) &&
                        <div>
                            <div className={"grey-small-text"}>
                                <span>{workExperience.from ? `${fromMonth} ${fromYear} to ` : ""} {workExperience.currentlyWorkHere ? "Present" : `${toMonth} ${toYear}`}</span>
                            </div>
                        </div>}
                    {workExperience.description &&
                        <div className={"semi-dark-small-text"}>
                            {workExperience.description}
                            <div className={"between-lines-spacing"}></div>
                        </div>}
                    <div>
                        {!workExperience.company &&
                            <button className={"add-info-button"} onClick={navigateToEditWorkExperiencePage}>
                                Add company
                            </button>}
                        {!workExperience.cityOrProvince &&
                            <button className={"add-info-button"} onClick={navigateToEditWorkExperiencePage}>
                                Add location
                            </button>}
                        {(!workExperience.from && !workExperience.currentlyWorkHere) &&
                            <button className={"add-info-button"} onClick={navigateToEditWorkExperiencePage}>
                                Add dates
                            </button>}
                        {!workExperience.description &&
                            <button className={"add-info-button"} onClick={navigateToEditWorkExperiencePage}>
                                Add description
                            </button>}
                    </div>
                </div>
                <div className={"small-buttons-container"}>
                    <button className={"small-interaction-button"} onClick={navigateToEditWorkExperiencePage}>
                        <FontAwesomeIcon className={"svg1rem"} icon={faPen}/>
                    </button>
                    <button className={"small-interaction-button"} onClick={deleteWorkExperience}>
                        <FontAwesomeIcon className={"svg1rem"} icon={faTrash}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WorkExperienceReview;
