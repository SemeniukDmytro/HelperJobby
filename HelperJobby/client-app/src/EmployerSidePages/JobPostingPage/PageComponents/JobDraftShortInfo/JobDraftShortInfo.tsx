import React, {FC} from 'react';
import './JobDraftShortInfo.scss';
import {IncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface JobDraftShortInfoProps {
    incompleteJob: IncompleteJobDTO;
    onJobDraftSelect: (jobId: number) => void;
    isSelected: boolean;
}

const JobDraftShortInfo: FC<JobDraftShortInfoProps> = ({
                                                           incompleteJob,
                                                           onJobDraftSelect,
                                                           isSelected
                                                       }) => {

    return (
        <div onClick={() => onJobDraftSelect(incompleteJob.id)}
             className={`job-draft-short-info-container ${isSelected ? "selected-job-draft" : ""}`}>
            {isSelected ? <FontAwesomeIcon className={"svg125rem mr075rem semi-dark-small-text"} icon={faCheck}/>
            :
            <div className={"mr2rem"}>
                
            </div>}
            

            <div className={"flex-column"}>
                <span className={"semi-dark-default-text"}>{incompleteJob.jobTitle}</span>
                <span className={"light-dark-small-text"}>{incompleteJob.location}</span>
            </div>
        </div>
    )
}

export default JobDraftShortInfo;
