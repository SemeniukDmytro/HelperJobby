import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './SearchWithinEmployerJobs.scss';
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import CustomSelectWindow from "../../../../EmployersSideComponents/CustomSelectWindow/CustomSelectWindow";
import {orderOptions, sortByOptions} from "../../../../EmployerJobFilteringData";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import FiltersAndSearch from "../FiltersAndSearch/FiltersAndSearch";
import {useEmployer} from "../../../../hooks/contextHooks/useEmployer";

interface SearchWithinEmployerJobsProps {
    jobSearchResults: JobDTO[];
    setJobSearchResults: Dispatch<SetStateAction<JobDTO[]>>;
    filteringInProgress: boolean;
    setFilteringInProcess: Dispatch<SetStateAction<boolean>>;
}

const SearchWithinEmployerJobs: FC<SearchWithinEmployerJobsProps> = ({
                                                                         jobSearchResults,
                                                                         setJobSearchResults,
                                                                         filteringInProgress,
                                                                         setFilteringInProcess
                                                                     }) => {
    const {employer} = useEmployer();
    const [showExpandedFiltersDropdown, setShowExpandedFiltersDropdown] = useState(false);
    const [sortBySelectedOption, setSortBySelectedOption] = useState(sortByOptions[0]);
    const [orderSelectedOption, setOrderSelectedOption] = useState(orderOptions[0]);
    const [jobTitleSearch, setJobTitleSearch] = useState("");
    const [jobLocationSearch, setJobLocationSearch] = useState("");

    useEffect(() => {
        let sortedAndOrderedJobs = sortJobs(jobSearchResults, sortBySelectedOption, orderSelectedOption);
        setJobSearchResults(sortedAndOrderedJobs);
    }, [sortBySelectedOption, orderSelectedOption]);

    useEffect(() => {
        if (filteringInProgress) {
            setFilteringInProcess(false);
        }
    }, [filteringInProgress]);


    function sortJobs(jobs: JobDTO[], sortBy: string, order: string) {
        setFilteringInProcess(true);
        return jobs.sort((a: JobDTO, b: JobDTO) => {
            let valueA: string | number;
            let valueB: string | number;
            switch (sortBy) {
                case "Job title":
                    valueA = a.jobTitle.toLowerCase();
                    valueB = b.jobTitle.toLowerCase();
                    break;
                case "Posting date":
                    valueA = new Date(a.datePosted).getTime();
                    valueB = new Date(b.datePosted).getTime();
                    break;
                default:
                    return 0;
            }

            if (order === "Ascending") {
                return valueA < valueB ? -1 : 1;
            } else {
                return valueA > valueB ? -1 : 1;
            }
        });
    }

    function filterJobs(jobs: JobDTO[], title: string, location: string) {
        setFilteringInProcess(true);
        return jobs.filter((job) => {
            const titleMatch = job.jobTitle.toLowerCase().includes(title.toLowerCase());
            const locationMatch = job.location.toLowerCase().includes(location.toLowerCase());
            return titleMatch && locationMatch;
        });
    }

    function handleViewResultsClick() {
        if (jobTitleSearch.length > 100 || jobLocationSearch.length > 100) {
            return;
        }
        let filteredJobs = filterJobs(employer!.jobs, jobTitleSearch, jobLocationSearch);
        let sortedAndOrderedJobs = sortJobs(filteredJobs, sortBySelectedOption, orderSelectedOption);
        setJobSearchResults(sortedAndOrderedJobs);
    }

    function eraseFilters(event: React.MouseEvent) {
        event.stopPropagation();
        setJobSearchResults(employer!.jobs);
        setJobTitleSearch("");
        setJobLocationSearch("");
    }

    return (
        <div className="job-table-filters-container mb1rem">
            <div className={"filter-dropdown-container"}>
                <div className={"emp-job-search-filters-form"}>
                    {!showExpandedFiltersDropdown ?
                        <FiltersAndSearch
                            jobTitle={jobTitleSearch}
                            location={jobLocationSearch}
                            showExpandedFiltersDropdown={showExpandedFiltersDropdown}
                            setShowExpandedFiltersDropdown={setShowExpandedFiltersDropdown}
                            onEraseFiltersClick={eraseFilters}
                        />
                        :
                        <div className={"expanded-job-search-filters-container mb1rem"}>
                            <FiltersAndSearch
                                jobTitle={jobTitleSearch}
                                location={jobLocationSearch}
                                showExpandedFiltersDropdown={showExpandedFiltersDropdown}
                                setShowExpandedFiltersDropdown={setShowExpandedFiltersDropdown}
                                onEraseFiltersClick={eraseFilters}
                            />
                            <CustomInputField
                                fieldLabel={"Job title"}
                                isRequired={false}
                                inputFieldValue={jobTitleSearch}
                                setInputFieldValue={setJobTitleSearch}
                                placeholderText={"E.g. nurse, manager, nights, part-time"}
                                maxInputLength={100}

                            />
                            <CustomInputField fieldLabel={"Location"}
                                              isRequired={false}
                                              inputFieldValue={jobLocationSearch}
                                              setInputFieldValue={setJobLocationSearch}
                                              placeholderText={"Type to search"}
                                              maxInputLength={100}
                            />
                            <div className={"mb1rem"}></div>
                            <button className={"br-corner-button blue-button"} onClick={handleViewResultsClick}>
                                View results
                            </button>
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
    )
}

export default SearchWithinEmployerJobs;
