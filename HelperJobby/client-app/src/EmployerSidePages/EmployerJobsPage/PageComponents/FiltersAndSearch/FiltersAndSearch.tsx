import React, {Dispatch, FC, SetStateAction} from 'react';
import './FiltersAndSearch.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faSliders, faXmark} from "@fortawesome/free-solid-svg-icons";

interface FiltersAndSearchProps {
    jobTitle: string;
    location: string;
    showExpandedFiltersDropdown: boolean;
    setShowExpandedFiltersDropdown: Dispatch<SetStateAction<boolean>>;
    onEraseFiltersClick: (event: React.MouseEvent) => void;
}

const FiltersAndSearch: FC<FiltersAndSearchProps> = ({
                                                         jobTitle,
                                                         location,
                                                         showExpandedFiltersDropdown,
                                                         setShowExpandedFiltersDropdown,
                                                         onEraseFiltersClick
                                                     }) => {

    return (
        <div
            className={`filters-unexpanded-dropdown ${(location.length != 0 || jobTitle.length != 0) ? "filters-dropdown-with-filters" : ""}
             ${showExpandedFiltersDropdown ? "expanded-filters-dropdown mb1rem" : ""}`}
            onClick={() => setShowExpandedFiltersDropdown(!showExpandedFiltersDropdown)}>

            <FontAwesomeIcon className={"svg1rem icon-right-margin"}
                             icon={faSliders}/>
            {(location.length != 0 || jobTitle.length != 0) ?
                <div className={"filters-text-box"}>
                    <div className={"emp-job-filters-container"}>
                        {jobTitle.length != 0 &&
                            <span>
                            Job title : {jobTitle}
                        </span>
                        }
                        {location.length != 0 &&
                            <span>
                                &nbsp; Location : {location}
                            </span>
                        }
                    </div>
                </div>
                :
                <span className={"light-dark-small-text"}>Filter and search jobs</span>
            }
            <div className={"flex-row ai-center"}>
                {(location.length != 0 || jobTitle.length != 0) &&
                    <FontAwesomeIcon
                        className={"svg1rem semi-dark-default-text mr1rem"}
                        onClick={onEraseFiltersClick}
                        icon={faXmark}/>
                }
                <div>
                    {showExpandedFiltersDropdown ?
                        <FontAwesomeIcon className={"svg1rem mt025rem mr1rem semi-dark-default-text"}
                                         icon={faChevronUp}/>
                        :
                        <FontAwesomeIcon className={"svg1rem mr1rem semi-dark-default-text"}
                                         icon={faChevronDown}/>
                    }

                </div>
            </div>

        </div>
    )
}
export default FiltersAndSearch;
