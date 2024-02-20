import React, {FC, useEffect, useState} from 'react';
import './EmployerCompleteJobs.scss';
import SearchWithinEmployerJobs from "../SearchWithinEmployerJobs/SearchWithinEmployerJobs";
import ShortJobInfoForEmployer from "../ShortJobInfoForEmployer/ShortJobInfoForEmployer";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {useEmployer} from "../../../../hooks/useEmployer";

interface EmployerCompleteJobsProps {
}

const EmployerCompleteJobs: FC<EmployerCompleteJobsProps> = () => {
    const {employer, setEmployer} = useEmployer();
    const [jobSearchResults, setJobSearchResults] = useState<JobDTO[]>([]);
    const [selectedJobIds, setSelectedJobIds] = useState<number[]>([]);
    const [filteringInProcess, setFilteringInProcess] = useState(false);

    useEffect(() => {
        if (employer?.jobs) {
            setJobSearchResults(employer.jobs)
        }
    }, [employer?.jobs]);

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
        <>
            {selectedJobIds.length !== 0 ?
                (
                    <div className={"emp-row-cont-1pad ai-center mb1rem"}>
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
                    </div>
                )
                :
                (
                    <SearchWithinEmployerJobs jobSearchResults={jobSearchResults}
                                              filteringInProgress={filteringInProcess}
                                              setJobSearchResults={setJobSearchResults}
                                              setFilteringInProcess={setFilteringInProcess}/>
                )
            }
            {!filteringInProcess ?
                jobSearchResults.map((job, index) => (
                    <ShortJobInfoForEmployer job={job}
                                             selectedJobIds={selectedJobIds}
                                             setSelectedJobIds={setSelectedJobIds}
                                             isAllSelected={selectedJobIds.length === employer!.jobs.length}
                                             key={job.id}
                    />
                ))
                :
                <LoadingPage/>
            }
        </>
    )
}

export default EmployerCompleteJobs;
