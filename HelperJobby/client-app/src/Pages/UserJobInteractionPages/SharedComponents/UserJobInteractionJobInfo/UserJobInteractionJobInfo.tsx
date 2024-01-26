import React, { FC } from 'react';
import './UserJobInteractionJobInfo.scss';
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {faBookmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface UserJobInteractionJobInfoProps {
    job : JobDTO,
    interactionTime : Date
}

const UserJobInteractionJobInfo: FC<UserJobInteractionJobInfoProps> = ({job, interactionTime}) => {
    
    return (
        <div className={"ji-job-block"}>
            <div className={"ji-job-layout"}>
                <div className={"ji-job-info-fb"}>
                    
                </div>
                <div className={"ji-apply-fb"}>
                    <button className={"blue-button"}>
                        Apply now
                    </button>
                </div>
                <div className={"ji-remove-from-saved-fb"}>
                    <button className={"medium-tr-btn-with-icon"}>
                        <FontAwesomeIcon icon={faBookmark} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserJobInteractionJobInfo;
