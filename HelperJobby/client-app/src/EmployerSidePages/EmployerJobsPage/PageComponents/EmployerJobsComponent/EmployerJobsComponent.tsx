import React, {FC, useEffect, useState} from 'react';
import './EmployerJobsComponent.scss';
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {useSearchParams} from "react-router-dom";
import {JobService} from "../../../../services/jobService";
import {IncompleteJobService} from "../../../../services/incompleteJobService";
import {useEmployer} from "../../../../hooks/useEmployer";
import ShortJobInfoForEmployer from "../ShortJobInfoForEmployer/ShortJobInfoForEmployer";
import SearchWithinEmployerJobs from "../SearchWithinEmployerJobs/SearchWithinEmployerJobs";

interface EmployerJobsComponentProps {
}

const EmployerJobsComponent: FC<EmployerJobsComponentProps> = () => {
    const {employer, setEmployer} = useEmployer();
    const [initialLoading, setInitialLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const [selectedJobIds, setSelectedJobIds] = useState<number[]>([]);
    const jobService = new JobService();
    const incompleteJobService =  new IncompleteJobService();
    
    useEffect(() => {
        const incompleteJobParam = searchParams.get("incompleteJobs");
        if (incompleteJobParam){
            fetchInitialEmployerIncompleteJobsData()
        }
        else {
            fetchInitialEmployerJobsData();
        }
    }, []);
    
    async function fetchInitialEmployerJobsData(){
        try {
            setInitialLoading(true);
            const retrievedJobs = await jobService.getJobsByEmployerId(employer!.id);
            setEmployer((prev) => {
                return  prev &&
                    {
                        ...prev,
                        jobs : retrievedJobs
                    }    
            })
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
            setInitialLoading(false);
        }
    }
    
    async function fetchInitialEmployerIncompleteJobsData(){
        try {
            setInitialLoading(true);
            const retrievedJobs = await incompleteJobService.getEmployerIncompleteJobs(employer!.id)
            setEmployer((prev) => {
                return  prev &&
                    {
                        ...prev,
                        incompleteJobs: retrievedJobs
                    }
            })
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
            setInitialLoading(false);
        }
    }

    function toggleSelectAllJobs() {
        if (employer && employer.jobs) {
            const allJobIds = employer.jobs.map(job => job.id); 
            const areAllJobsSelected = allJobIds.length === selectedJobIds.length; 

            if (areAllJobsSelected) {
                setSelectedJobIds([]);
            } else {
                setSelectedJobIds(allJobIds);
            }
        }
    }


    function deselectAllJobs() {
        setSelectedJobIds([]);
    }

    return (
        <div className={"form-page-background"}>
            {
                initialLoading ? <LoadingPage/> :
                    <div className={"emp-jobs-layout"}>
                        <div className={"emp-jobs-header-container mt1rem mb1rem"}>
                            <span className={"small-title mb0"}>Jobs</span>
                            <button className={"blue-button"}>Post a job</button>
                        </div>
                        <div className={"flex-row mb1rem"}>
                            <button className={"blue-button left-connected-button"}>
                                Open jobs
                            </button>
                            <button className={"light-button-with-margin right-connected-button"}>
                                Incomplete Jobs
                            </button>
                        </div>
                        {selectedJobIds.length !== 0 ?
                            (<div className={"emp-row-cont-1pad ai-center mb1rem"}>
                                <div className={"flex-row"}>
                                    <div className={"checkbox-container"}>
                                        <input className={"select-all-checkbox"} type={"checkbox"}
                                               checked={employer?.jobs.length == selectedJobIds.length}
                                               onChange={toggleSelectAllJobs}/>
                                    </div>
                                    <div className={"flex-row ai-center"}>
                                        <div className={"dark-small-text bold-text"}>
                                            {selectedJobIds.length} {selectedJobIds.length > 1 ? "jobs" : "job"} selected
                                            -
                                            <span onClick={deselectAllJobs}
                                                  className={"bold-navigation-link"}>&nbsp;deselect all</span>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                            :
                            (
                                <SearchWithinEmployerJobs jobs={employer!.jobs}/>
                            )
                        }
                        {(employer?.jobs && employer?.jobs.length != 0) &&
                            employer.jobs.map((job, index) => (
                                <ShortJobInfoForEmployer job={job}
                                                         selectedJobIds={selectedJobIds}
                                                         setSelectedJobIds={setSelectedJobIds}
                                                         isAllSelected={selectedJobIds.length === employer.jobs.length}
                                                         key={index}
                                />
                            ))
                        }
                    </div>
            }

        </div>
    )
}

export default EmployerJobsComponent;
