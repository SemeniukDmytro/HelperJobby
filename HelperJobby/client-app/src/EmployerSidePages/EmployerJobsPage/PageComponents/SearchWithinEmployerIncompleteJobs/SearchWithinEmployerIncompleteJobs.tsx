import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './SearchWithinEmployerIncompleteJobs.scss';
import {orderOptions, sortByOptions} from "../../../../EmployerJobFilteringData";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {IncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import FiltersAndSearch from "../FiltersAndSearch/FiltersAndSearch";
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import CustomSelectWindow from "../../../../EmployersSideComponents/CustomSelectWindow/CustomSelectWindow";
import {useEmployer} from "../../../../hooks/contextHooks/useEmployer";

interface SearchWithinEmployerIncompleteJobsProps {
    jobSearchResults: IncompleteJobDTO[];
    setJobSearchResults: Dispatch<SetStateAction<IncompleteJobDTO[]>>;
    filteringInProgress: boolean;
    setFilteringInProcess: Dispatch<SetStateAction<boolean>>;
}

const SearchWithinEmployerIncompleteJobs: FC<SearchWithinEmployerIncompleteJobsProps> =({
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
        if(filteringInProgress){
            setFilteringInProcess(false);
        }
    }, [filteringInProgress]);


    function sortJobs(jobs: IncompleteJobDTO[], sortBy: string, order: string) {
        setFilteringInProcess(true);
        return jobs.sort((a: IncompleteJobDTO, b: IncompleteJobDTO) => {
            const valueA = a.jobTitle.toLowerCase();
            const valueB = b.jobTitle.toLowerCase();
            if (order === "Ascending") {
                return valueA < valueB ? -1 : 1;
            } else {
                return valueA > valueB ? -1 : 1;
            }
        });
    }

    function filterJobs(jobs: IncompleteJobDTO[], title: string, location: string) {
        setFilteringInProcess(true);
        return jobs.filter((job: JobDTO | IncompleteJobDTO) => {
            const titleMatch = job.jobTitle.toLowerCase().includes(title.toLowerCase());
            const locationMatch = job.location.toLowerCase().includes(location.toLowerCase());
            return titleMatch && locationMatch;
        });
    }

    function handleViewResultsClick() {
        let filteredJobs = filterJobs(employer!.incompleteJobs, jobTitleSearch, jobLocationSearch);
        let sortedAndOrderedJobs = sortJobs(filteredJobs, sortBySelectedOption, orderSelectedOption);
        setJobSearchResults(sortedAndOrderedJobs);
    }

    function eraseFilters(event: React.MouseEvent) {
        event.stopPropagation();
        setJobSearchResults(employer!.incompleteJobs);
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
                            />
                            <CustomInputField fieldLabel={"Location"}
                                              isRequired={false}
                                              inputFieldValue={jobLocationSearch}
                                              setInputFieldValue={setJobLocationSearch}
                                              placeholderText={"Type to search"}
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
                <div className={"sort-jobs-by-container ai-center jc-center"}>
                    <span className={"dark-default-text bold-text"}>Sorted by Job title</span>
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


export default SearchWithinEmployerIncompleteJobs;
