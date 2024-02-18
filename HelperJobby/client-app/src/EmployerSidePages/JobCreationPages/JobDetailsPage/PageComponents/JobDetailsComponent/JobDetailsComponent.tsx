import React, {FC, FormEvent, useEffect, useRef, useState} from 'react';
import './JobDetailsComponent.scss';
import PageTitleWithImage from "../../../../../EmployersSideComponents/PageTitleWithImage/PageTitleWithImage";
import WomanWorking from "../../../../../Components/Icons/WomanWorking";
import {
    jobTypeStringToEnumMap, scheduleStringToEnumMap
} from "../../../../../utils/convertLogic/enumToStringConverter";
import JobFeature from "../../../../../EmployersSideComponents/JobFeature/JobFeature";
import {jobTypesStringValues, schedulesStringValues} from "../../../../../AppConstData/JobEnumsToStringsArrays";
import {faChevronDown, faChevronUp, faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import JobCreateNavigationButtons
    from "../../../SharedComponents/JobCreateNavigationButtons/JobCreateNavigationButtons";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import EmployerPagesPaths from "../../../../../AppRoutes/Paths/EmployerPagesPaths";
import JobTypes from "../../../../../enums/modelDataEnums/JobTypes";
import Schedules from "../../../../../enums/modelDataEnums/Schedules";
import useJobCreation from "../../../../../hooks/useJobCreation";
import {
    useJobLoaderForSettingCurrentIncompleteJob
} from "../../../../../hooks/useJobLoaderForSettingCurrentIncompleteJob";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";
import {addJobType, addSchedule} from "../../../../../utils/manageJobFeatureSelect";
import {handleJobFeaturesListAppearance} from "../../../../../utils/handleJobFeaturesListHeight";

interface JobDetailsComponentProps {
}

const JobDetailsComponent: FC<JobDetailsComponentProps> = () => {
    const [selectedJobType, setSelectedJobType] = useState<JobTypes[]>([]);
    const [selectedSchedule, setSelectedSchedule] = useState<Schedules[]>([]);
    const [scheduleBoxHeight, setScheduleBoxHeight] = useState("78px");
    const scheduleListRef = useRef<HTMLUListElement>(null);
    const [showFullScheduleList, setShowFullScheduleList] = useState(false);
    const {incompleteJob, setIncompleteJob} = useJobCreation();
    const {jobId} = useParams<{jobId : string}>();
    const {fetchJobAndSetJobCreation} =  useJobLoaderForSettingCurrentIncompleteJob(jobId ? parseInt(jobId) : 0, incompleteJob, setIncompleteJob);
    const [loading, setLoading] = useState(false);
    const [isInvalidForm, setIsInvalidForm] = useState(false);
    const navigate = useNavigate();
    const [requestInProgress, setRequestInProgress] = useState(false);
    const incompleteJobService = new IncompleteJobService();
    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname)
        fetchInitialPageData()
    }, []);

    useEffect(() => {
        if (incompleteJob){
            setSelectedJobType(incompleteJob.jobType || []);
            setSelectedSchedule(incompleteJob.schedule || []);
            setLoading(false);
        }
    }, [incompleteJob]);
    
    async function fetchInitialPageData(){
        await fetchJobAndSetJobCreation();
    }

    function goToPreviousPage() {
        navigate(`${EmployerPagesPaths.ADD_JOB_BASICS}/${jobId}`)
    }

    async function handleJobDetailsSubmit(e : FormEvent) {
        e.preventDefault();
        if (selectedJobType.length == 0){
            setIsInvalidForm(true);
            return;
        }
        try{
            setRequestInProgress(true);
            const updatedIncompleteJob : UpdatedIncompleteJobDTO = {
                jobType : selectedJobType,
                schedule : selectedSchedule,
            }
            const retrievedIncompleteJob = await incompleteJobService.updateJobCreation(parseInt(jobId!), updatedIncompleteJob);
            setIncompleteJob(retrievedIncompleteJob);
            navigate(`${EmployerPagesPaths.COMPENSATION_DETAILS}/${retrievedIncompleteJob.id}`)
        }
        catch (error){
            logErrorInfo(error);
        }
        finally {
            setRequestInProgress(false);
        }
        
    }

    return (
        loading ? <LoadingPage/> :
        <div className="employers-centralized-page-layout">
            <PageTitleWithImage imageElement={<WomanWorking/>} title={"Add job details"}/>
            <div className={"emp-form-fb"}>
                <form className={"emp-form"}>
                    <div className={"small-title horizontal-title"}>
                        <span className={`semi-dark-default-text bold-text ${isInvalidForm ? "error-text" : ""}`}>Job type</span>
                        <span className={"error-text"}>&nbsp;*</span>
                    </div>
                    <ul className={"job-features-list"}>
                        {jobTypesStringValues.map((jobType, index) => (
                            <JobFeature
                                key={index}
                                featureName={jobType}
                                isSelected={selectedJobType?.includes(jobTypeStringToEnumMap(jobType)!)}
                                onClick={() => addJobType(jobType, selectedJobType, setSelectedJobType, setIsInvalidForm)}
                            />
                        ))}
                    </ul>
                    {isInvalidForm &&
                    <div className={"error-box"}>
                        <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                        <span className={"error-text"}>Make a selection</span>
                    </div>}
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
                                    onClick={() => addSchedule(schedule, selectedSchedule, setSelectedSchedule)}
                                />
                            ))}
                        </ul>
                    </div>
                    <div className={"mt05rem"}>
                   <span className={"bold-navigation-link"} onClick={() => handleJobFeaturesListAppearance(showFullScheduleList,
                       setShowFullScheduleList, setScheduleBoxHeight, scheduleListRef)}>
                        <span>{`${showFullScheduleList ? "Show less" : "Show more"}`}</span>
                       {showFullScheduleList ?
                           <FontAwesomeIcon className={'svg1rem ml1rem'} icon={faChevronUp}/>
                           :
                           <FontAwesomeIcon className={'svg1rem ml1rem'} icon={faChevronDown}/>
                       }
                    </span>
                    </div>
                    <JobCreateNavigationButtons
                        requestInProgress={requestInProgress}
                        backButtonOnClick={goToPreviousPage}
                        nextPageButtonClick={handleJobDetailsSubmit}
                    />
                </form>
            </div>
        </div>
    );
}

export default JobDetailsComponent;
