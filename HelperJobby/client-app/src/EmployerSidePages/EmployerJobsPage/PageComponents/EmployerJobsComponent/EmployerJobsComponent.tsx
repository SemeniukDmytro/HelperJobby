import React, {FC, useEffect, useState} from 'react';
import './EmployerJobsComponent.scss';
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {useNavigate, useSearchParams} from "react-router-dom";
import {JobService} from "../../../../services/jobService";
import {IncompleteJobService} from "../../../../services/incompleteJobService";
import {useEmployer} from "../../../../hooks/useEmployer";
import {JobCreationStates} from "../../../../enums/utilityEnums/JobCreationStates";
import EmployerCompleteJobs from "../EmployerCompleteJobs/EmployerCompleteJobs";
import EmployerIncompleteJobs from "../EmployerIncompleteJobs/EmployerIncompleteJobs";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";

interface EmployerJobsComponentProps {
}

const EmployerJobsComponent: FC<EmployerJobsComponentProps> = () => {
    const {employer, setEmployer} = useEmployer();
    const [initialLoading, setInitialLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const jobService = new JobService();
    const incompleteJobService = new IncompleteJobService();
    const [jobPageType, setJobPageType] = useState<JobCreationStates>(JobCreationStates.completeJob);
    const [jobsWereLoaded, setJobsWereLoaded] = useState(false);
    const [incompleteJobsWereLoaded, setIncompleteJobsWereLoaded] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const incompleteJobParam = searchParams.get("incompleteJobs");
        if (incompleteJobParam) {
            fetchInitialEmployerIncompleteJobsData();
            setJobPageType(JobCreationStates.incompleteJob);
            setIncompleteJobsWereLoaded(true);
        } else {
            fetchInitialEmployerJobsData();
            setJobPageType(JobCreationStates.completeJob);
            setJobsWereLoaded(true);
        }
    }, []);

    async function fetchInitialEmployerJobsData() {
        try {
            setInitialLoading(true);
            const retrievedJobs = await jobService.getJobsByEmployerId(employer!.id);
            setEmployer((prev) => {
                return prev &&
                    {
                        ...prev,
                        jobs: retrievedJobs
                    }
            })
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setInitialLoading(false);
        }
    }

    async function fetchInitialEmployerIncompleteJobsData() {
        try {
            setInitialLoading(true);
            const retrievedJobs = await incompleteJobService.getEmployerIncompleteJobs(employer!.id)
            setEmployer((prev) => {
                return prev &&
                    {
                        ...prev,
                        incompleteJobs: retrievedJobs
                    }
            })
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setInitialLoading(false);
        }
    }

    async function handleJobPageType() {
        setJobPageType(JobCreationStates.completeJob);
        if (!jobsWereLoaded) {
            await fetchInitialEmployerJobsData();
            setJobsWereLoaded(true);
        }
        navigate(`${EmployerPagesPaths.JOBS}`)
    }
    
    async function handleIncompleteJobPageType(){
        setJobPageType(JobCreationStates.incompleteJob)
        if (!incompleteJobsWereLoaded) {
            await fetchInitialEmployerIncompleteJobsData();
            setIncompleteJobsWereLoaded(true);
        }
        navigate(`${EmployerPagesPaths.JOBS}?incompleteJobs=true`)
    }

    return (
        <div className={"form-page-background"}>
            {
                <div className={"emp-jobs-layout"}>
                    <div className={"emp-jobs-header-container mt1rem mb1rem"}>
                        <span className={"small-title mb0"}>Jobs</span>
                        <button className={"blue-button"}>Post a job</button>
                    </div>
                    <div className={"flex-row mb1rem"}>
                        <button className={`${jobPageType == JobCreationStates.completeJob ? "blue-button" : "light-button-with-margin mr0"} left-connected-button`}
                                onClick={handleJobPageType}
                        >
                            Open jobs
                        </button>
                        <button className={`${jobPageType == JobCreationStates.incompleteJob ? "blue-button" : "light-button-with-margin mr0"} right-connected-button`}
                                onClick={handleIncompleteJobPageType}
                        >
                            Incomplete Jobs
                        </button>
                    </div>

                    {initialLoading ? <LoadingPage/> :
                        jobPageType == JobCreationStates.completeJob ?
                            <EmployerCompleteJobs/>
                            :
                            <EmployerIncompleteJobs/>
                    }
                </div>
            }

        </div>
    )
}

export default EmployerJobsComponent;
