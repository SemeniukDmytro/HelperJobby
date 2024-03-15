import React, {FC, useEffect, useState} from 'react';
import './ReviewResumeEducation.scss';
import {EducationDTO} from "../../../../../DTOs/resumeRelatedDTOs/EducationDTO";
import {convertNumericMonthToStringValue} from "../../../../../utils/convertLogic/convertNumericMonthToStringValue";

interface ReviewResumeEducationProps {
    education: EducationDTO
}

const ReviewResumeEducation: FC<ReviewResumeEducationProps> = ({
                                                                   education
                                                               }) => {
    const [fromMonth, setFromMonth] = useState("");
    const [fromYear, setFromYear] = useState("");
    const [toMonth, setToMonth] = useState("");
    const [toYear, setToYear] = useState("");
    const convertedFrom = education.from?.toString().split("-");
    const convertedTo = education.to?.toString().split("-");

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


    return (
        <div className={"mt1rem"}>
            <div className={"field-label"}>
                {education.levelOfEducation} {`${education.fieldOfStudy ? `in ${education.fieldOfStudy}` : ""}`}
            </div>
            <div className={"grey-tiny-text"}>
                <span>{education.schoolName}</span>
                {education.schoolName && education.city && <span>&nbsp;-&nbsp;</span>}
                <span>{education.city}</span>
            </div>
            <div className={"grey-tiny-text"}>
                <span>{education.city}</span>
            </div>
            {(fromYear && toYear) &&
                <div className={"grey-tiny-text"}>
                    <span>{fromMonth} {fromYear} to {toMonth} {toYear}</span>
                </div>
            }
        </div>
    )
}

export default ReviewResumeEducation;
