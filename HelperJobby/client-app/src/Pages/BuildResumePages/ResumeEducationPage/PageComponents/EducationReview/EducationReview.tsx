import React, { FC } from 'react';
import './EducationReview.scss';
import {EducationDTO} from "../../../../../DTOs/resumeRelatedDTOs/EducationDTO";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface EducationReviewProps {
    education : EducationDTO;
}

const EducationReview: FC<EducationReviewProps> = ({education}) => {
    
    return (
        <div className={"short-education-info-container"}>
            <div className={"education-review-block"}>
                <div className={"education-main-info"}>
                    <div className={"level-of-education"}>
                        <span>{education.levelOfEducation}</span>
                        {education.fieldOfStudy && <span>in {education.fieldOfStudy}</span>}
                    </div>
                    <div className={"small-buttons-container"}>
                        <button className={"small-interaction-button"}>
                            <FontAwesomeIcon icon={faPen}/>
                        </button>
                        <button className={"small-interaction-button"}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </div>
                </div>
                <div>
                    <span>{education.schoolName}</span>
                    <span>{education.city}</span>
                    <span></span>
                </div>
                <div>
                    <button className={"add-info-button"}>
                        Add field of study
                    </button>
                    <button className={"add-info-button"}>
                        Add location
                    </button>
                    <button className={"add-info-button"}>
                        Add school
                    </button>
                    <button className={"add-info-button"}>
                        Add dates
                    </button>
                </div>
            </div>
            
        </div>)
};

export default EducationReview;
