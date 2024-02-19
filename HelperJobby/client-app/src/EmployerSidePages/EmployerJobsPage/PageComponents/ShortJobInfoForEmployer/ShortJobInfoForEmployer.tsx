import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './ShortJobInfoForEmployer.scss';
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {months} from "../../../../AppConstData/Months";

interface ShortJobInfoForEmployerProps {
    job : JobDTO;
    selectedJobIds : number[];
    setSelectedJobIds : Dispatch<SetStateAction<number[]>>;
    isAllSelected?: boolean;
}

const ShortJobInfoForEmployer: FC<ShortJobInfoForEmployerProps> = ({
    job,
    selectedJobIds,
    setSelectedJobIds,
    isAllSelected = false
                                                                   }) => {
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        setIsSelected(isAllSelected || selectedJobIds.includes(job.id));
    }, [isAllSelected, selectedJobIds, job.id]);
    
    function toggleIsSelected() {
        setIsSelected(!isSelected)
        if (!isSelected){
            setSelectedJobIds(prev => [...prev, job.id]);
        } else {
            setSelectedJobIds(prev => {
                return prev.filter(jobId => jobId !== job.id);
            });
        }
    }
    
    function getFormattedMonthName_DD_YYYYDate(dateAsString: string){
        const date = new Date(dateAsString);
        const year = date.getFullYear();
        const month = months[date.getMonth()].name;
        const day = date.getDate().toString().padStart(2, '0');
        
        return `${month} ${day} ${year}`
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
                    <span
                        className={"grey-small-text"}>Posted on {getFormattedMonthName_DD_YYYYDate(job.datePosted)}</span>
                </div>
            </div>
            <div className={"candidate-separate-block"}>
                    <span className={"bold-text dark-small-text"}>
                        {job.numberOfJobApplies}
                    </span>
                <span className={"dark-small-text bold-text"}>
                        Active
                    </span>
            </div>
            <div className={"emp-job-candidates-info-container"}>
                <div className={"candidates-info-block"}>
                    <span className={"bold-text dark-small-text"}>
                        {job.numberOfJobApplies - job.numberOfInterviews}
                    </span>
                    <span className={"dark-small-text bold-text"}>
                        Awaiting
                    </span>
                </div>
                <div className={"candidates-info-block"}>
                    <span className={"bold-text dark-small-text"}>
                        {job.numberOfInterviews}
                    </span>
                    <span className={"dark-small-text bold-text"}>
                        Interviewing
                    </span>
                </div>
                <div className={"candidates-info-block"}>
                    <span className={"bold-text dark-small-text"}>
                        {job.numberOfPeopleHired} of {job.numberOfOpenings}
                    </span>
                    <span className={"dark-small-text bold-text"}>
                        Hired
                    </span>
                </div>
            </div>
            <div className={"job-operations-container"}>
                <button className={'blue-button'}>
                    Update job
                </button>
                <button className={"red-button"}>
                    Delete job
                </button>
            </div>
        </div>
    )
}

export default ShortJobInfoForEmployer;
