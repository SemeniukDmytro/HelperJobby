import React, {FC, useEffect, useState} from 'react';
import './EmployerJobsComponent.scss';
import CustomSelectWindow from "../../../../EmployersSideComponents/CustomSelectWindow/CustomSelectWindow";
import {orderOptions, sortByOptions} from "../../../../EmployerJobFilteringData";
import {faChevronDown, faSliders} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import {IncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {useSearchParams} from "react-router-dom";
import {JobService} from "../../../../services/jobService";
import {IncompleteJobService} from "../../../../services/incompleteJobService";
import {useEmployer} from "../../../../hooks/useEmployer";

interface EmployerJobsComponentProps {
}

const EmployerJobsComponent: FC<EmployerJobsComponentProps> = () => {
    const {employer, setEmployer} = useEmployer();
    const [sortBySelectedOption, setSortBySelectedOption] = useState(sortByOptions[0]);
    const [orderSelectedOption, setOrderSelectedOption] = useState(orderOptions[0]);
    const [showExpandedFiltersDropdown, setShowExpandedFiltersDropdown] = useState(false);
    const [jobTitle, setJobTitle] = useState("");
    const [initialLoading, setInitialLoading] = useState(true);
    const [employerIncompleteJobs, setIncompleteEmployerJobs] = useState<IncompleteJobDTO[]>([]);
    const [employerJobs, setEmployerJobs] = useState<JobDTO[]>([]);
    const [searchParams] = useSearchParams();
    const jobService = new JobService();
    const incompleteJobService =  new IncompleteJobService();
    
    console.log(employer)
    
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
                        <div className="job-table-filters-container">
                            <div className={"filter-dropdown-container"}>
                                <div className={"emp-job-search-filters-form"}>
                                    {!showExpandedFiltersDropdown ?
                                        <div className="filters-unexpanded-dropdown"
                                             onClick={() => setShowExpandedFiltersDropdown(!showExpandedFiltersDropdown)}>
                                            <div className={"flex-row ai-center"}>
                                                <FontAwesomeIcon className={"svg1rem icon-right-margin"}
                                                                 icon={faSliders}/>
                                                <span className={"light-dark-small-text"}>Filter and search jobs</span>
                                            </div>
                                            <div>
                                                <FontAwesomeIcon className={"svg1rem mr1rem"} icon={faChevronDown}/>
                                            </div>
                                        </div>
                                        :
                                        <div className={"expanded-job-search-filters-container"}>
                                            <div className="filters-unexpanded-dropdown mb1rem"
                                                 onClick={() => setShowExpandedFiltersDropdown(!showExpandedFiltersDropdown)}>
                                                <div className={"flex-row ai-center"}>
                                                    <FontAwesomeIcon className={"svg1rem icon-right-margin"}
                                                                     icon={faSliders}/>
                                                    <span
                                                        className={"light-dark-small-text"}>Filter and search jobs</span>
                                                </div>
                                                <div>
                                                    <FontAwesomeIcon className={"svg1rem mr1rem"} icon={faChevronDown}/>
                                                </div>
                                            </div>
                                            <CustomInputField
                                                fieldLabel={"Job title"}
                                                isRequired={false}
                                                inputFieldValue={jobTitle}
                                                setInputFieldValue={setJobTitle}
                                                placeholderText={"E.g. nurse, manager, nights, part-time"}
                                            />
                                            <div className={"mb1rem"}></div>
                                            <button className={"br-corner-button blue-button"}>View results</button>
                                        </div>
                                    }

                                </div>
                            </div>
                            <div className="filter-params-container">
                                <div className="sort-jobs-by-container">
                                    <CustomSelectWindow fieldLabel={""}
                                                        selectedValue={sortBySelectedOption}
                                                        setSelectedValue={setSortBySelectedOption}
                                                        optionsArr={sortByOptions}
                                                        includeWindowScroll={true}
                                                        innerLabel={"Sort by: "}
                                    />
                                </div>
                                <div className="jobs-order-container">
                                    <CustomSelectWindow fieldLabel={""}
                                                        selectedValue={orderSelectedOption}
                                                        setSelectedValue={setOrderSelectedOption}
                                                        optionsArr={orderOptions}
                                                        includeWindowScroll={true}
                                                        innerLabel={"Oder: "}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
            }

        </div>
    )
}

export default EmployerJobsComponent;
