import React, {FC, useEffect, useState} from 'react';
import './EmployerIncompleteJobs.scss';
import {useEmployer} from "../../../../hooks/useEmployer";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import SearchWithinEmployerJobs from "../SearchWithinEmployerJobs/SearchWithinEmployerJobs";
import ShortJobInfoForEmployer from "../ShortJobInfoForEmployer/ShortJobInfoForEmployer";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import {IncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import SearchWithinEmployerIncompleteJobs
    from "../SearchWithinEmployerIncompleteJobs/SearchWithinEmployerIncompleteJobs";
import ShortIncompleteJobInfoForEmployer from "../ShortIncompleteJobInfoForEmployer/ShortIncompleteJobInfoForEmployer";

interface EmployerIncompleteJobsProps {
}

const EmployerIncompleteJobs: FC<EmployerIncompleteJobsProps> = () => {
    const {employer, setEmployer} = useEmployer();
    const [jobSearchResults, setJobSearchResults] = useState<IncompleteJobDTO[]>([]);
    const [selectedJobIds, setSelectedJobIds] = useState<number[]>([]);
    const [filteringInProcess, setFilteringInProcess] = useState(false);

    useEffect(() => {
        if (employer?.incompleteJobs) {
            setJobSearchResults(employer.incompleteJobs)
        }
    }, [employer?.jobs]);

    function toggleSelectAllJobs() {
        if (employer && employer.incompleteJobs) {
            const allJobIds = employer.incompleteJobs.map(job => job.id);
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
                                       checked={employer?.incompleteJobs.length == selectedJobIds.length}
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
                    <SearchWithinEmployerIncompleteJobs jobSearchResults={jobSearchResults}
                                                        filteringInProgress={filteringInProcess}
                                                        setJobSearchResults={setJobSearchResults}
                                                        setFilteringInProcess={setFilteringInProcess}/>
                )
            }
            {!filteringInProcess ?
                jobSearchResults.map((job, index) => (
                    <ShortIncompleteJobInfoForEmployer job={job}
                                                       selectedJobIds={selectedJobIds}
                                                       setSelectedJobIds={setSelectedJobIds}
                                                       isAllSelected={selectedJobIds.length === employer!.incompleteJobs.length}
                                                       key={index}
                    />
                ))
                :
                <LoadingPage/>
            }
        </>
    )
}


export default EmployerIncompleteJobs;
