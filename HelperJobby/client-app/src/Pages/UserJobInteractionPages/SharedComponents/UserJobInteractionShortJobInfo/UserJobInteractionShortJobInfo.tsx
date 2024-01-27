import React, {FC, useEffect, useState} from 'react';
import './UserJobInteractionShortJobInfo.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";

interface UserJobInteractionShortJobInfoProps {
    job: JobDTO;
    interactionTime : Date
}

const UserJobInteractionShortJobInfo: FC<UserJobInteractionShortJobInfoProps> = ({job, interactionTime}) => {
    const [interactionInfo, setInteractionInfo] = useState("");

    useEffect(() => {
        setInteractionInfo(getInteractionInfo());
    }, [interactionTime]);


    function getInteractionInfo() {
        const interactionDate = new Date(interactionTime);
        const now = new Date();

        if (interactionDate.toDateString() === now.toDateString()) {
            return "Today";
        }

        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

        const dateFormatOptions: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long'
        };

        if (interactionDate.getFullYear() !== now.getFullYear()) {
            dateFormatOptions.year = 'numeric';
        }

        if (interactionDate >= startOfWeek) {
            return interactionDate.toLocaleDateString('en-US', {weekday: 'long'});
        } else {
            return interactionDate.toLocaleDateString('en-US', dateFormatOptions);
        }
    }

    return (
        <div className={"ji-job-fb"}>
            <div className={"ji-job-icon-box"}>
                <FontAwesomeIcon icon={faBuilding}/>
            </div>
            <div className={"ji-job-info-box"}>
                <span className={"ji-job-title"}>{job.jobTitle}</span>
                <span className={"dark-default-text"}>{job.employerAccount.organization.name}</span>
                <span className={"dark-default-text"}>{job.location}</span>
                <span
                    className={"semi-dark-small-text"}>{interactionInfo == "Today" ? `Saved ${interactionInfo}` : `Saved on ${interactionInfo}`}</span>
            </div>
        </div>
    )
};

export default UserJobInteractionShortJobInfo;
