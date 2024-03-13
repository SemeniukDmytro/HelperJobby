import React, {FC, ReactNode, useEffect, useState} from 'react';
import './JobApplyJobInfoWrap.scss';
import useCurrentJobApplication from "../../../../hooks/contextHooks/useCurrentJobApplication";
import {useJobSeeker} from "../../../../hooks/contextHooks/useJobSeeker";
import {useNavigate, useParams} from "react-router-dom";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {JobService} from "../../../../services/jobService";
import {isNanAfterIntParse} from "../../../../utils/validationLogic/numbersValidators";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding, faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {
    benefitsEnumToStringMap, jobLocationTypesEnumToStringMap,
    jobTypesEnumToStringMap,
    schedulesEnumToStringMap
} from "../../../../utils/convertLogic/enumToStringConverter";
import {formatJobSalaryDisplay} from "../../../../utils/convertLogic/formatJobSalaryDisplay";
import {JobLocationTypes} from "../../../../enums/modelDataEnums/JobLocationTypes";

interface JobApplyJobInfoWrapProps {
    children: ReactNode
}

const JobApplyJobInfoWrap: FC<JobApplyJobInfoWrapProps> = ({children}) => {
    const {job, setJob} = useCurrentJobApplication();
    const {jobSeeker, fetchJobSeeker} = useJobSeeker();
    const [loading, setLoading] = useState(true);
    const {jobId} = useParams<{ jobId: string }>();
    const jobService = new JobService();
    const navigate = useNavigate();
    const [showAllJobDescription, setShowAllJobDescription] = useState(true);
    
    useEffect(() => {
        if (!jobId || isNanAfterIntParse(jobId)){
            navigate("/");
            return;
        }
        fetchJobSeeker();
        loadJobInfo();
    }, []);

    useEffect(() => {
        if (job && jobSeeker) {
            setLoading(false);
        }
    }, [job, jobSeeker]);

    async function loadJobInfo() {
        try {
            const retrievedJob = await jobService.getJobForJobSeekersById(parseInt(jobId!));
            setJob(retrievedJob);
        }
        catch (err){
            logErrorInfo(err)
        }
    }

    return (
        loading || !job || !jobSeeker ? <LoadingPage/> :
            <div className={"job-application-main"}>
                <div className={"job-application-left-side-container"}>
                    {children}
                </div>
                <div className={"job-application-right-side-container"}>
                    <div className={`${!showAllJobDescription ? "job-window-container" : "expanded-job-window-container"}`}>
                        <div className={"job-window-header"}>
                            <div className="grey-default-text mr1rem">
                                <FontAwesomeIcon icon={faBuilding}/>
                            </div>
                            <div>
                                <div className={"dark-small-text bold-text"}>
                                    {job.jobTitle}
                                </div>
                                <div className={"grey-tiny-text"}>
                                    {job.employer.organization.name}
                                </div>
                            </div>
                        </div>
                        <div className={"content-separation-line"}/>
                        <div className={`${showAllJobDescription ? "ja-job-description-container-expanded" : "ja-job-description-container"}`}>
                            <span className={"light-dark-default-text flex-column"}>
                                    <span className={"mb1rem"}>{job.description}</span>
                                {(job?.jobType && job.jobType.length !== 0) &&
                                    <div className={"flex-row mb1rem"}>
                                        <span>Job type:&nbsp;</span>
                                        {
                                            job.jobType.map((jt, index) => (
                                                <>
                                                    <span key={index}>{jobTypesEnumToStringMap(jt)}</span>
                                                    {index != job.jobType!.length - 1 &&
                                                        <span>,&nbsp;</span>}
                                                </>
                                            ))
                                        }
                                    </div>
                                }
                                {job?.salary &&
                                    <div className={"flex-row mb1rem"}>
                                        <span>Salary:&nbsp;</span>
                                        <span>{formatJobSalaryDisplay(job)}</span>
                                    </div>
                                }
                                {(job?.schedule && job.schedule.length !== 0) &&
                                    <>
                                        <span className={"ml0"}>Schedule:</span>
                                        <ul className={"j-pr-features-list"}>
                                            {
                                                job.schedule.map((sch, index) => (
                                                    <li key={index}>{schedulesEnumToStringMap(sch)}</li>
                                                ))
                                            }
                                        </ul>
                                    </>
                                }
                                {(job?.benefits && job.benefits.length !== 0) &&
                                    <>
                                        <span className={"ml0"}>Benefits:</span>
                                        <ul className={"j-pr-features-list"}>
                                            {
                                                job.benefits.map((b, index) => (
                                                    <li key={index}>{benefitsEnumToStringMap(b)}</li>
                                                ))
                                            }
                                        </ul>
                                    </>
                                }
                                <span
                                    className={"mb1rem"}>Work Location : {jobLocationTypesEnumToStringMap(job?.jobLocationType || JobLocationTypes.InPerson)}</span>
                                    
                                </span>
                        </div>
                        <div className={"view-all-job-description-container"}>
                            <div className={"bold-navigation-link"} onClick={() => setShowAllJobDescription(!showAllJobDescription)}>
                                {showAllJobDescription ? 
                                    <div className={"flex-row"}>
                                        View less
                                        <FontAwesomeIcon className={"svg1rem ml1rem"} icon={faChevronUp}/>
                                    </div>
                                    :
                                    <div className={"flex-row"}>
                                        View full job description
                                        <FontAwesomeIcon className={"svg1rem ml1rem"} icon={faChevronDown}/>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default JobApplyJobInfoWrap;
