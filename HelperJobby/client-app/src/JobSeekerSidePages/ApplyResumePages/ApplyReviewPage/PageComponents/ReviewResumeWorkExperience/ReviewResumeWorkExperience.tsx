import React, {FC, useEffect, useState} from 'react';
import './ReviewResumeWorkExperience.scss';
import {WorkExperienceDTO} from "../../../../../DTOs/resumeRelatedDTOs/WorkExperienceDTO";
import {convertNumericMonthToStringValue} from "../../../../../utils/convertLogic/convertNumericMonthToStringValue";

interface ReviewWorkExperienceProps {
    workExperience : WorkExperienceDTO;
}

const ReviewResumeWorkExperience: FC<ReviewWorkExperienceProps> = ({
    workExperience 
                                                             }) => {
    const [fromMonth, setFromMonth] = useState("");
    const [fromYear, setFromYear] = useState("");
    const [toMonth, setToMonth] = useState("");
    const [toYear, setToYear] = useState("");
    const convertedFrom = workExperience.from?.toString().split("-");
    const convertedTo = workExperience.to?.toString().split("-");

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
                {workExperience.jobTitle}
            </div>
            <div className={"grey-tiny-text"}>
                {workExperience.company} {`${workExperience.cityOrProvince ? `- ${workExperience.cityOrProvince}` : ""}`}
            </div>
            <div className={"grey-tiny-text"}>
                <span>{workExperience.from ? `${fromMonth} ${fromYear} to ` : ""} {workExperience.currentlyWorkHere ? "Present" : `${toMonth} ${toYear}`}</span>
            </div>
            <div className={"dark-tiny-text mt05rem"}>
                {workExperience.description}
            </div>
        </div>
    )
}

export default ReviewResumeWorkExperience;
