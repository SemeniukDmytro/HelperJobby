import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './ShortIncompleteJobInfoForEmployer.scss';
import {useNavigate} from "react-router-dom";
import {IncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleExclamation, faXmark} from "@fortawesome/free-solid-svg-icons";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";

interface ShortIncompleteJobInfoForEmployerProps {

    job: IncompleteJobDTO;
    selectedJobIds: number[];
    setSelectedJobIds: Dispatch<SetStateAction<number[]>>;
    isAllSelected?: boolean;
}

const ShortIncompleteJobInfoForEmployer: FC<ShortIncompleteJobInfoForEmployerProps> = ({
                                                                                           job,
                                                                                           selectedJobIds,
                                                                                           setSelectedJobIds,
                                                                                           isAllSelected = false
                                                                                       }
) => {
    const [isSelected, setIsSelected] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsSelected(isAllSelected || selectedJobIds.includes(job.id));
    }, [isAllSelected, selectedJobIds, job.id]);

    function toggleIsSelected() {
        setIsSelected(!isSelected)
        if (!isSelected) {
            setSelectedJobIds(prev => [...prev, job.id]);
        } else {
            setSelectedJobIds(prev => {
                return prev.filter(jobId => jobId !== job.id);
            });
        }
    }

    function navigateToEditJobPage() {
        navigate(`${EmployerPagesPaths.REVIEW_JOB_PAGE}/${job.id}`);
    }


    return (
        <div className={"emp-row-cont-1pad mb1rem"}>
            <div className={"job-select-and-info-container"}>
                <div className={"checkbox-container"}>
                    <input className={"checkbox medium-checkbox"} type={"checkbox"} checked={isSelected}
                           onChange={toggleIsSelected}/>
                </div>
                <div className={"emp-job-info-container"}>
                    <span className={"bold-navigation-link"}>{job.jobTitle}</span>
                    <span className={"grey-small-text"}>{job.location}</span>
                </div>
            </div>
            <div className={"info-notify-container red-notify-container incomplete-job-notify"}>
                <div className={"flex-row ai-center"}>
                    <div className={"message-pop-up-icon ai-center mr1rem"}>
                        <FontAwesomeIcon icon={faCircleExclamation}/>
                    </div>
                    <div className={"semi-dark-small-text bold-text ai-center"}>
                        Your job posting is incomplete
                    </div>
                </div>
                <div>
                    <button className={"blue-button"} onClick={navigateToEditJobPage}>
                        Finish job posting
                    </button>
                </div>
            </div>
            <div>
                Draft
            </div>
            <div className={"job-operations-container"}>
                <button className={"red-button"}>
                    Delete
                </button>
            </div>
        </div>
    )
}


export default ShortIncompleteJobInfoForEmployer;
