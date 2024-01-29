import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import "./JobSearchBar.scss"
import GoogleImage from "../../Assets/pictures/google_on_white_hdpi.png";
import {useNavigate} from "react-router-dom";
import {LocationAutocompleteService} from "../../services/locationAutocompleteService";
import {useJobSeeker} from "../../hooks/useJobSeeker";
import {ServerError} from "../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../utils/logErrorInfo";
import useJobQueryParams from "../../hooks/useQueryParams";

interface JobSearchBarProps {
    jobInitial : string;
    locationInitial : string;
}

const JobSearchBar: FC<JobSearchBarProps> = (props) => {
    const [job, setJob]= useState(props.jobInitial);
    const [location, setLocation] = useState(props.locationInitial);
    const [jobFocus, setJobFocus] = useState(false);
    const [locationFocus, setLocationFocus] = useState(false);
    const [autocompleteResults, setAutocompleteResults] = useState<string[][]>([]);
    const [showAutoComplete, setShowAutoComplete] = useState(false);
    const [delayedLocationValue, setDelayedLocationValue] = useState("");
    const [loading, setLoading] = useState(true);
    const [showEraseLocationBtn, setShowEraseLocationBtn] = useState(false);
    const [showEraseJobBtn, setShowEraseJobBtn] = useState(false);
    const locationRef = useRef<HTMLInputElement>(null);
    const jobRef = useRef<HTMLInputElement>(null);
    const eraseLocationButtonRef = useRef<HTMLDivElement>(null);
    const eraseJobButtonRef = useRef<HTMLDivElement>(null);
    
    const locationAutocompleteService = new LocationAutocompleteService();
    const {jobSeeker} = useJobSeeker();
    const {query,
        setQuery,
        jobLocation,
        setJobLocation} = useJobQueryParams();
    const navigate = useNavigate();


    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            const clickedElement = e.target as HTMLElement;
            if (eraseLocationButtonRef.current?.contains(clickedElement)){
                setLocation("");
                setShowEraseLocationBtn(false);
            }
            if (eraseJobButtonRef.current?.contains(clickedElement)){
                setJob("");
                setShowEraseLocationBtn(false);
            }
            if (!locationRef.current?.contains(clickedElement)) {
                setShowAutoComplete(false);
                setShowEraseLocationBtn(false);
            }
            if (!jobRef.current?.contains(clickedElement)){
                setShowEraseJobBtn(false);
            }
        };
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    useEffect(() => {
        if (!props.locationInitial && jobSeeker?.address?.city){
            setLocation(jobSeeker?.address.city)
        }
    }, [jobSeeker]);
    
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDelayedLocationValue(location);
        }, 300);
        return () => clearTimeout(timeout)
    }, [location]);


    useEffect(() => {
        const fetchData = async () => {
            if (delayedLocationValue.length <= 0 || location.length <= 0) {
                setShowAutoComplete(false);
                return;
            }
            try {
                setLoading(true);
                const response = await locationAutocompleteService.GetAutocompletesForJobLocation(
                    delayedLocationValue
                );
                
                const separatedValues = response.map((result) => result.split(', '));
                const autocompleteResultsSlices = separatedValues.map((values) => {
                    if (values.length > 1) {
                        return values.slice(0, values.length - 1);
                    } else {
                        return values;
                    }
                });
                if ("remote".includes(delayedLocationValue.toLowerCase())){
                    autocompleteResultsSlices.push(["Remote"]);
                }
                setAutocompleteResults(autocompleteResultsSlices);
                if (autocompleteResultsSlices.length == 0){
                    setShowAutoComplete(false);
                }
            } catch (error) {
                if (error instanceof ServerError) {
                    logErrorInfo(error);
                }
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [delayedLocationValue]);
    
    
    function handleCitySelect(locationResult: string[]) {
        setLocation(locationResult.join(", "))
        setShowAutoComplete(false);
    }

    function handleJobInput(e: ChangeEvent<HTMLInputElement>) {
        setJob(e.target.value);
        setQuery(e.target.value);
        if (e.target.value.length > 0){
            setShowEraseJobBtn(true);
        }
        else {
            setShowEraseJobBtn(false);
        }
    }

    function eraseJobInput(e : React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
        setJob("");
        setQuery("");
        setShowEraseJobBtn(false);
        if (jobRef.current){
            jobRef.current.focus();
        }
    }
    
    function handleJobFocus() {
        setJobFocus(true);
        setShowEraseJobBtn(true);
    }

    function handleJobInputBlur() {
        setJobFocus(false);
    }

    

    function handleJobInputHover() {
        if (job){
            setShowEraseJobBtn(true)
        }
    }

    function handleJobInputLeave() {
        setShowEraseJobBtn(false)
    }

    

    function handleLocationInput(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length > 0){
          setShowEraseLocationBtn(true)  
        }
        else {
            setShowEraseLocationBtn(false)
        }
        setLocation(e.target.value);
        setJobLocation(e.target.value);
        setLoading(true);
        setShowAutoComplete(true);
    }

    

    function eraseLocationInput(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
        setLocation("");
        setJobLocation("");
        setShowEraseLocationBtn(false);
        if (locationRef.current){
            locationRef.current.focus();
        }
    }

    function handleLocationFocus() {
        if (location){
            setShowEraseLocationBtn(true);
        }
        setLocationFocus(true);
    }
    function handleLocationBlur() {
        setLocationFocus(false);
    }

    function handleLocationInputHover() {
        if (location){
            setShowEraseLocationBtn(true);
        }
    }

    function handleLocationInputLeave() {
        if (!locationFocus){
            setShowEraseLocationBtn(false);
        }
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

    return(
        <div className={"search-container"}>
            <div className={"search-boxes"}>
                <form className={"search-form"}>
                    <div className={"input-fields-box"}>
                        <div className={`query-box`}
                             onMouseEnter={handleJobInputHover}
                             onMouseLeave={handleJobInputLeave}>
                            <div className={`border-lining ${jobFocus ? "job-query-box-focus" : ""}`}/>
                            <div className={"icon-box"}>
                                <FontAwesomeIcon className={"medium-svg"} icon={faMagnifyingGlass}/>
                            </div>
                            <input className={`query-input`}
                                   value={job}
                                   onChange={handleJobInput}
                                   placeholder={"Job title, keywords or company"}
                                   ref={jobRef}
                                   onFocus={handleJobFocus}
                                   onBlur={handleJobInputBlur}
                                   onKeyDown={handleEnterKeyPress}/>
                            {showEraseJobBtn &&<div className={"cross-icon-box"} onClick={eraseJobInput} ref={eraseJobButtonRef}>
                                 <button className={"cross-outline"}>
                                    <FontAwesomeIcon className={"cross-icon small-svg"} icon={faXmark}/>
                                </button>
                            </div>}
                        </div>
                        <div className={"separator"}></div>
                        <div className={`query-box`} 
                             onMouseEnter={handleLocationInputHover}
                             onMouseLeave={handleLocationInputLeave}>
                            <div className={`border-lining ${locationFocus ? "location-query-box-focus" : ""}`}/>
                            <div className={"icon-box"}>
                                <FontAwesomeIcon className={"query-box-icon medium-svg"} icon={faLocationDot} />
                            </div>
                            <div style={{position: "relative", display: "flex", flexGrow: 1}}>
                                <input className={"query-input"}
                                       value={location}
                                       onChange={handleLocationInput}
                                       placeholder={`City, province, or "remote"`}
                                       onFocus={handleLocationFocus}
                                       onBlur={handleLocationBlur}
                                       ref = {locationRef}
                                       onKeyDown={handleEnterKeyPress}/>
                                <img className={"google-logo"} src={GoogleImage} alt={""}></img>
                            </div>
                            {showEraseLocationBtn && <div className={"cross-icon-box"} onClick={eraseLocationInput} ref={eraseLocationButtonRef} >
                                <button className={"cross-outline"}>
                                    <FontAwesomeIcon className={"cross-icon small-svg"} icon={faXmark}/>
                                </button>
                            </div>}
                            
                            {!showAutoComplete ? null : (
                                !loading ? (
                                    <div className={"location-search-autocomplete-window"}>
                                        {autocompleteResults.map((locationResult, index) => (
                                            <div
                                                className={"autocomplete-result"}
                                                key={index}
                                                onClick={() => handleCitySelect(locationResult)}
                                            >
                                                {locationResult.join(', ')}
                                            </div>
                                        ))}
                                    </div>
                                ) : null
                            )}
                        </div>
                    </div>
                    <div className={"search-button-box"}>
                        <button className={"blue-button"} onClick={navigateToSearchResultsPage}>
                            <span>Find jobs</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
    
}

export default JobSearchBar;
