import React, {ChangeEvent, ChangeEventHandler, FC, useRef, useState} from 'react';
import './SearchBarForJobPage.scss';
import GoogleImage from "../../../../Assets/pictures/google_on_white_hdpi.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

interface SearchBarForJobPageProps {}

const SearchBarForJobPage: FC<SearchBarForJobPageProps> = () => {
    const [job, setJob] = useState("");
    const jobRef = useRef<HTMLInputElement>(null);
    const [location, setLocation] = useState("");
    const locationRef = useRef<HTMLInputElement>(null);
    const [jobFocus, setJobFocus] = useState(false);
    const [locationFocus, setLocationFocus] = useState(false);
    const navigate = useNavigate();

    function changeJob(e: ChangeEvent<HTMLInputElement>) {
        setJob(e.target.value);
    }

    function handleJobFocus() {
        setJobFocus(true);
        jobRef.current?.focus();
    }

    function handleJobBlur() {
        setJobFocus(false);
    }

    function changeLocationValue(e: ChangeEvent<HTMLInputElement>) {
        setLocation(e.target.value);
    }
    
    function handleLocationFocus() {
        setLocationFocus(true);
        locationRef.current?.focus();
    }
    function handleLocationBlur() {
        setLocationFocus(false);
    }

    function navigateToSearchResultsPage(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const locationParam = location ? `&location=${location}` : "";
        navigate(`/jobs?q=${job}${locationParam}`);
    }

    const handleEnterKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const locationParam = location ? `&location=${location}` : "";
            navigate(`/jobs?q=${job}${locationParam}`);
        }
    };

    return (
  <div className={"jsb-layout"}>
    <div className={"jsb-block"}>
        <form className={"jsb-form"}>
            <div className={`field-input-container mr05rem`} style={{flexGrow : "1"}} onClick={handleJobFocus}>
                <div className={`border-lining ${jobFocus ? "field-focus" : ""}`}>
                </div>
                <div className={"jsb-input-label bold-text"}>What</div>
                <input className={`field-input jsb-input`}
                       value={job}
                       type={"text"}
                       onChange={changeJob}
                       onFocus={handleJobFocus}
                       onBlur={handleJobBlur}
                       placeholder={"Job title, keywords or company"}
                       ref={jobRef}
                       onKeyDown={handleEnterKeyPress}/>
            </div>
            <div className={"field-input-container mr1rem"} onClick={handleLocationFocus}>
                <div className={`border-lining ${locationFocus ? "field-focus" : ""}`}>

                </div>
                <div className={"jsb-input-label bold-text"}>Where</div>
                <input className={`field-input`}
                       value={location}
                       type={"text"}
                       onChange={changeLocationValue}
                       onFocus={handleLocationFocus}
                       onBlur={handleLocationBlur}
                       placeholder={"City, state or zip code"}
                       ref={locationRef}
                       onKeyDown={handleEnterKeyPress}/>
            </div>
            <button className={"blue-button"} onClick={navigateToSearchResultsPage}>
                Find jobs
            </button>
            
        </form>
    </div>
  </div>
)};

export default SearchBarForJobPage;
