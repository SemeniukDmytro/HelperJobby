import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import './CandidatesComponent.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {JobService} from "../../../../services/jobService";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {useEmployer} from "../../../../hooks/useEmployer";
import {useNavigate} from "react-router-dom";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import JobCandidatesPage from "../JobCandidatesPage/JobCandidatesPage";

interface CandidatesComponentProps {
}

const CandidatesComponent: FC<CandidatesComponentProps> = () => {
    const {employer, setEmployer} = useEmployer();
    const [loading, setLoading] = useState(true);
    const [employerJobTitles, setEmployerJobTitles] = useState<JobDTO[]>([]);
    const [jobTitleSearchQuery, setJobTitleSearchQuery] = useState("");
    const jobService = new JobService();
    const navigate = useNavigate();
    const jobSearchSelectContainerRef = useRef<HTMLDivElement>(null);
    const [showSelectJobTitleWindow, setShowSelectJobTitleWindow] = useState(false);
    const [filteringInProcess, setFilteringInProcess] = useState(false);

    const handleClickOutside = (event: MouseEvent) => {
        if (jobSearchSelectContainerRef.current && !jobSearchSelectContainerRef.current.contains(event.target as Node)) {
            setShowSelectJobTitleWindow(false);
        }
    };

    useEffect(() => {
        loadEmployerJobTitles();
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (filteringInProcess) {
            setFilteringInProcess(false);
        }
    }, [filteringInProcess]);

    async function loadEmployerJobTitles() {
        try {
            setLoading(true);
            const retrievedJobs = await jobService.getEmployerJobTitles(employer!.id);
            setEmployerJobTitles(retrievedJobs);
            if (!employer?.jobs || employer.jobs.length == 0) {
                setEmployer(prev => {
                    return prev && {
                        ...prev,
                        jobs: retrievedJobs
                    }
                })
            }
            if (retrievedJobs.length !== 0) {
                setJobTitleSearchQuery(retrievedJobs[0].jobTitle);
                navigate(`${EmployerPagesPaths.CANDIDATES}?jobId=${retrievedJobs[0].id}`);
            }
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setLoading(false)
        }
    }

    function filterJobs(jobs: JobDTO[], title: string) {
        setFilteringInProcess(true);
        return jobs.filter((job) => job.jobTitle.toLowerCase().includes(title.toLowerCase()));
    }

    function changeJobTitleSearchQuery(e: ChangeEvent<HTMLInputElement>) {
        const filteredJobsSuggests = filterJobs(employer!.jobs, e.target.value);
        if (filteredJobsSuggests.length !== 0) {
            setShowSelectJobTitleWindow(true);
        } else {
            setShowSelectJobTitleWindow(false);
        }
        setEmployerJobTitles(filteredJobsSuggests);
        setJobTitleSearchQuery(e.target.value)
    }

    function showMatchingJobTitles() {
        setShowSelectJobTitleWindow(!showSelectJobTitleWindow);
    }

    function goToJobAppliesPage(job: JobDTO, event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.stopPropagation();
        navigate(`${EmployerPagesPaths.CANDIDATES}?jobId=${job.id}`);
        setShowSelectJobTitleWindow(false);
        setJobTitleSearchQuery(job.jobTitle)
    }

    return (
        loading ? <LoadingPage/> :

            <div className={"light-grey-page-background"}>
                <div className={"emp-pages-layout"}>
                    <div className={"emp-pages-header mt1rem mb1rem"}>
                        <span className={"small-title mb0"}>Candidates</span>
                        <button className={"blue-button"}>Post a job</button>
                    </div>
                    <div className={"search-job-titles-container"}>
                        <div className={`field-input-container`}>
                            <div className={`border-lining`}>
                            </div>
                            <input
                                className={`field-input`}
                                value={jobTitleSearchQuery}
                                type={"text"}
                                onChange={changeJobTitleSearchQuery}
                            />
                            <div className={"input-button-box"} style={{cursor: "pointer"}}
                                 onClick={showMatchingJobTitles}>
                                <FontAwesomeIcon className={"svg1rem semi-dark-default-text mr1rem"}
                                                 icon={faChevronDown}/>
                            </div>
                        </div>
                        {showSelectJobTitleWindow &&
                            <div className={"select-window-relative-bar"}>
                                {filteringInProcess ? <LoadingPage/> :
                                    <div className={"select-window-container job-titles-select-window mt025rem"} ref={jobSearchSelectContainerRef}>
                                        {employerJobTitles.length !== 0 &&
                                            employerJobTitles.map((job, index) => (
                                                <div className={"select-option"}
                                                     key={index}
                                                     onClick={(e) => goToJobAppliesPage(job, e)}
                                                >
                                                    {job.jobTitle}
                                                </div>
                                            ))}
                                    </div>}
                            </div>
                        }
                    </div>
                    <JobCandidatesPage/>
                </div>
            </div>
    )
}

export default CandidatesComponent;
