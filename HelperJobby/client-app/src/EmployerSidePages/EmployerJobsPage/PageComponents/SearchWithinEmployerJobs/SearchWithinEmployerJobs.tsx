import React, {ChangeEvent, FC, useRef, useState} from 'react';
import './SearchWithinEmployerJobs.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faSliders, faXmark} from "@fortawesome/free-solid-svg-icons";
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import CustomSelectWindow from "../../../../EmployersSideComponents/CustomSelectWindow/CustomSelectWindow";
import {orderOptions, sortByOptions} from "../../../../EmployerJobFilteringData";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {IncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import FiltersAndSearch from "../FiltersAndSearch/FiltersAndSearch";

interface SearchWithinEmployerJobsProps {
    jobs: JobDTO[] | IncompleteJobDTO[];
}

const SearchWithinEmployerJobs: FC<SearchWithinEmployerJobsProps> = ({
                                                                         jobs
                                                                     }) => {
    const [showExpandedFiltersDropdown, setShowExpandedFiltersDropdown] = useState(false);
    const [sortBySelectedOption, setSortBySelectedOption] = useState(sortByOptions[0]);
    const [orderSelectedOption, setOrderSelectedOption] = useState(orderOptions[0]);
    const [jobTitleSearch, setJobTitleSearch] = useState("");
    const [jobLocationSearch, setJobLocationSearch] = useState("");
    const jobLocationInputRef = useRef<HTMLInputElement>(null);

    function onLocationSearchChange(e : ChangeEvent<HTMLInputElement>) {
        setJobLocationSearch(e.target.value)
    }

    return (
        <div className="job-table-filters-container mb1rem">
            <div className={"filter-dropdown-container"}>
                <div className={"emp-job-search-filters-form"}>
                    {!showExpandedFiltersDropdown ?
                        <FiltersAndSearch
                            jobTitle={jobTitleSearch}
                            setJobTitle={setJobTitleSearch}
                            location={jobLocationSearch}
                            setLocation={setJobLocationSearch}
                            showExpandedFiltersDropdown={showExpandedFiltersDropdown}
                            setShowExpandedFiltersDropdown={setShowExpandedFiltersDropdown}
                        />
                        :
                        <div className={"expanded-job-search-filters-container mb1rem"}>
                            <FiltersAndSearch
                                jobTitle={jobTitleSearch}
                                setJobTitle={setJobTitleSearch}
                                location={jobLocationSearch}
                                setLocation={setJobLocationSearch}
                                showExpandedFiltersDropdown={showExpandedFiltersDropdown}
                                setShowExpandedFiltersDropdown={setShowExpandedFiltersDropdown}
                            />
                            <CustomInputField
                                fieldLabel={"Job title"}
                                isRequired={false}
                                inputFieldValue={jobTitleSearch}
                                setInputFieldValue={setJobTitleSearch}
                                placeholderText={"E.g. nurse, manager, nights, part-time"}
                            />
                            <div className={'field-label'}>
                                Location
                            </div>
                            <div className={"flex-column"}>
                                <div className={`field-input-container`}>
                                    <div className={`border-lining`}>
                                    </div>
                                    <input
                                        className={`field-input`}
                                        value={jobLocationSearch}
                                        type={"text"}
                                        onChange={onLocationSearchChange}
                                        ref={jobLocationInputRef}
                                        placeholder={"Type to search"}
                                    />
                                </div>
                            </div>
                            <div className={"mb1rem"}></div>
                            <button className={"br-corner-button blue-button"}>View results
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
