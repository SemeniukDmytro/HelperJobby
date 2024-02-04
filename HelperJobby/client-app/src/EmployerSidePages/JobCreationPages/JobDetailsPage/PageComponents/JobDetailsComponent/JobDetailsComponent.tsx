import React, {FC, FormEvent, useRef, useState} from 'react';
import './JobDetailsComponent.scss';
import PageTitleWithImage from "../../../../../EmployersSideComponents/PageTitleWithImage/PageTitleWithImage";
import WomanWorking from "../../../../../Components/Icons/WomanWorking";
import JobTypes from "../../../../../enums/JobTypes";
import {
    jobTypeStringToEnumMap, scheduleStringToEnumMap
} from "../../../../../utils/convertLogic/enumToStringConverter";
import JobFeature from "../../../../../EmployersSideComponents/JobFeature/JobFeature";
import Schedules from "../../../../../enums/Schedules";
import {jobTypesStringValues, schedulesStringValues} from "../../../../../AppConstData/JobEnumsToStringsArrays";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import JobCreateNavigationButtons
    from "../../../SharedComponents/JobCreateNavigationButtons/JobCreateNavigationButtons";
import {useNavigate} from "react-router-dom";
import EmployerPagesPaths from "../../../../../AppRoutes/Paths/EmployerPagesPaths";

interface JobDetailsComponentProps {
}

const JobDetailsComponent: FC<JobDetailsComponentProps> = () => {
    const [selectedJobType, setSelectedJobType] = useState<JobTypes[]>([]);
    const [selectedSchedule, setSelectedSchedule] = useState<Schedules[]>([]);
    const [scheduleBoxHeight, setScheduleBoxHeight] = useState("78px");
    const scheduleListRef = useRef<HTMLUListElement>(null);
    const [showFullScheduleList, setShowFullScheduleList] = useState(false);
    const navigate = useNavigate();


    function addJobType(jobTypeString: string) {
        const jobType = jobTypeStringToEnumMap(jobTypeString);
        if (jobType && !selectedJobType.includes(jobType)) {
            setSelectedJobType(prevSelectedJobType => [...prevSelectedJobType, jobType]);
        } else if (jobType) {
            setSelectedJobType(prevSelectedJobType =>
                prevSelectedJobType.filter(type => type !== jobType),
            );
        }
    }

    function addSchedule(scheduleString: string) {
        const schedule = scheduleStringToEnumMap(scheduleString);
        if (schedule && !selectedSchedule.includes(schedule)) {
            setSelectedSchedule(prevSelectedSchedule => [...prevSelectedSchedule, schedule]);
        } else if (schedule) {
            setSelectedSchedule(prevSelectedSchedule =>
                prevSelectedSchedule.filter(type => type !== schedule),
            );
        }
    }

    function handleScheduleListAppearance() {
        if (showFullScheduleList){
            setShowFullScheduleList(false);
            setScheduleBoxHeight("78px");
        }
        else {
            setShowFullScheduleList(true);
            const scheduleListRefBoundingRect = scheduleListRef.current?.getBoundingClientRect();
            setScheduleBoxHeight(`${scheduleListRefBoundingRect?.height}px`)
        }
    }

    function goToPreviousPage() {
        navigate(EmployerPagesPaths.ADD_JOB_BASICS)
    }

    function handleJobDetailsSubmit(e : FormEvent) {
        e.preventDefault();
        navigate(EmployerPagesPaths.COMPENSATION_DETAILS)
    }

    return (
        <div className="employers-centralized-page-layout">
            <PageTitleWithImage imageElement={<WomanWorking/>} title={"Add job details"}/>
            <div className={"crj-form-fb"}>
                <form className={"emp-form-fb"}>
                    <div className={"small-title horizontal-title"}>
                        <span className={"dark-default-text bold-text"}>Job type</span>
                        <span className={"error-text"}>&nbsp;*</span>
                    </div>
                    <ul className={"job-features-list"}>
                        {jobTypesStringValues.map((jobType, index) => (
                            <JobFeature
                                key={index}
                                featureName={jobType}
                                isSelected={selectedJobType?.includes(jobTypeStringToEnumMap(jobType)!)}
                                onClick={() => addJobType(jobType)}
                            />
                        ))}
                    </ul>
                    <div className={'content-separation-line mt2rem mb2rem'}/>
                    <div className={"mb025rem"}>
                        <span className={"small-title"}>Schedule</span>
                    </div>
                    <div
                        className={"job-features-fb"}
                        style={{
                            height: scheduleBoxHeight
                        }}
                    >
                        <ul
                            className={"job-features-list"}
                            ref={scheduleListRef}
                        >
                            {schedulesStringValues.map((schedule, index) => (
                                <JobFeature
                                    key={index}
                                    featureName={schedule}
                                    isSelected={selectedSchedule.includes(scheduleStringToEnumMap(schedule)!)}
                                    onClick={() => addSchedule(schedule)}
                                />
                            ))}
                        </ul>
                    </div>
                    <div className={"mt05rem"}>
                   <span className={"bold-navigation-link"} onClick={handleScheduleListAppearance}>
                        <span>{`${showFullScheduleList ? "Show less" : "Show more"}`}</span>
                       {showFullScheduleList ?
                           <FontAwesomeIcon className={'svg1rem ml1rem'} icon={faChevronUp}/>
                           :
                           <FontAwesomeIcon className={'svg1rem ml1rem'} icon={faChevronDown}/>
                       }
                    </span>
                    </div>
                    <JobCreateNavigationButtons
                        backButtonOnClick={goToPreviousPage}
                        nextPageButtonClick={handleJobDetailsSubmit}
                    />
                </form>
            </div>
        </div>
    );
}

export default JobDetailsComponent;
