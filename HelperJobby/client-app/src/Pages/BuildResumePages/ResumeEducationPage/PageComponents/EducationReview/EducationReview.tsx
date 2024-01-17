import React, {FC, useEffect, useState} from 'react';
import './EducationReview.scss';
import {EducationDTO} from "../../../../../DTOs/resumeRelatedDTOs/EducationDTO";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {months} from "../../../../../AppConstData/Months";
import {convertNumericMonthToStringValue} from "../../../../../utils/convertLogic/convertNumericMonthToStringValue";
import {useNavigate} from "react-router-dom";

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

    useEffect(() => {
        if (convertedFrom && convertedTo) {
            setFromMonth(convertNumericMonthToStringValue(convertedFrom[1]));
            setFromYear(convertedFrom[0]);
            setToMonth(convertNumericMonthToStringValue(convertedTo[1]));
            setToYear(convertedTo[0]);
        }
    }, []);

    function navigateToEditEducationPage() {
        navigate(`/build/education/${education.id}`);
    }

    return (
        <div className={"short-education-info-container"}>
            <div className={"education-review-block"}>
                <div className={"level-of-education"}>
                    <span>{education.levelOfEducation} </span>
                    {education.fieldOfStudy && <span>in {education.fieldOfStudy}</span>}
                </div>
                <div className={"semi-dark-default-text"}>
                    <span>{education.schoolName}</span>
                    {education.schoolName && education.city && <span>&nbsp;-&nbsp;</span>}
                    <span>{education.city}</span>
                </div>
                <div className={"between-lines-spacing"}/>
                <div className={"light-dark-default-text"}>
                    <span >{fromMonth} {fromYear} to {toMonth} {toYear}</span>
                </div>
                <div className={"between-lines-spacing"}/>
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
                <button className={"small-interaction-button"}>
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            </div>

        </div>)
};

export default EducationReview;
