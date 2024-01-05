import React, {FC, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import "./JobSearchBar.scss";

interface JobSearchBarProps {}

const JobSearchBar: FC<JobSearchBarProps> = () => {
    const [jobQueryFocus, setJobQueryFocus] = useState(false);
    const [locationQueryFocus, setLocationQueryFocus] = useState(false);
    function handleJobQueryFocus() {
        setJobQueryFocus(true);
    }

    function handleJobQueryBlur() {
        setJobQueryFocus(false);
    }
    function handleLocationQueryFocus() {
        setLocationQueryFocus(true);
    }
    function handleLocationQueryBlur() {
        setLocationQueryFocus(false);
    }
    
    return(
        <div className={"search-container"}>
            <div className={"search-boxes"}>
                <form className={"search-form"}>
                    <div className={"input-fields-box"}>
                        <div className={`query-box`}>
                            <div className={`border-lining ${jobQueryFocus ? "job-query-box-focus" : ""}`}/>
                            <div className={"icon-box"}>
                                <FontAwesomeIcon className={"query-box-icon"} icon={faMagnifyingGlass}/>
                            </div>
                            <input className={`query-input`}
                                   placeholder={"Job title, keywords or company"}
                                   onFocus={handleJobQueryFocus}
                                   onBlur={handleJobQueryBlur}/>
                            <div className={"cross-icon-box"}>
                                <div className={"cross-outline"}>
                                    <FontAwesomeIcon className={"cross-icon"} icon={faXmark}/>
                                </div>
                            </div>
                        </div>
                        <div className={"separator"}></div>
                        <div className={`query-box`}>
                            <div className={`border-lining ${locationQueryFocus ? "location-query-box-focus" : ""}`}/>
                            <div className={"icon-box"}>
                                <FontAwesomeIcon className={"query-box-icon"} icon={faLocationDot} />
                            </div>
                            <input className={"query-input"}
                                   placeholder={`City, province, or "remote"`}
                                   onFocus={handleLocationQueryFocus}
                                   onBlur={handleLocationQueryBlur}/>
                            <div className={"cross-icon-box"}>
                                <div className={"cross-outline"}>
                                    <FontAwesomeIcon className={"cross-icon"} icon={faXmark}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"search-button-box"}>
                        <button className={"search-button"}>
                            <span>Find jobs</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
    
}

export default JobSearchBar;
