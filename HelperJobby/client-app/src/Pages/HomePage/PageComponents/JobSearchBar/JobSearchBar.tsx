import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import "./JobSearchBar.scss";
import {mapCountryWithA2Code} from "../../../../utils/countryWithTldMapper";
import {ServerError} from "../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {LocationAutocompleteService} from "../../../../services/locationAutocompleteService";
import {useJobSeeker} from "../../../../hooks/useJobSeeker";
import GoogleImage from "../../../../Assets/pictures/google_on_white_hdpi.png";

interface JobSearchBarProps {}

const JobSearchBar: FC<JobSearchBarProps> = () => {
    const [jobInput, setJobInput] = useState("");
    const [locationInput, setLocationInput] = useState("");
    const [jobInputFocus, setJobInputFocus] = useState(false);
    const [locationInputFocus, setLocationInputFocus] = useState(false);
    const [autocompleteResults, setAutocompleteResults] = useState<string[][]>([]);
    const [showAutoComplete, setShowAutoComplete] = useState(false);
    const [delayedInputValue, setDelayedInputValue] = useState("");
    const [loading, setLoading] = useState(true);
    
    const locationAutocompleteService = new LocationAutocompleteService();
    const {jobSeeker} = useJobSeeker();
    
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDelayedInputValue(locationInput);
        }, 300);
        return () => clearTimeout(timeout)
    }, [locationInput]);


    useEffect(() => {
        const fetchData = async () => {
            if (delayedInputValue.length <= 0 || locationInput.length <= 0) {
                return;
            }
            try {
                setLoading(true);
                let response : string [];
                let country = "CA";
                if (jobSeeker){
                    country = jobSeeker.address.country;
                }
                response = await locationAutocompleteService.GetAutocompletesForCities(
                    delayedInputValue,
                    mapCountryWithA2Code(country)
                );
                
                const separatedValues = response.map((result) => result.split(', '));
                const autoCompleteResults = separatedValues.map((values) => values.slice(0, values.length - 1));
                if ("remote".includes(delayedInputValue.toLowerCase())){
                    autoCompleteResults.push(["Remote"]);
                }
                if (autoCompleteResults.length == 0){
                    setShowAutoComplete(false);
                }
                setAutocompleteResults(autoCompleteResults);
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
    }, [delayedInputValue]);
    
    function handleCitySelect(locationResult: string[]) {
        setLocationInput(locationResult.join(", "))
        setShowAutoComplete(false);
    }
    
    function handleJobQueryFocus() {
        setJobInputFocus(true);
    }

    function handleJobQueryBlur() {
        setJobInputFocus(false);
    }
    function handleLocationQueryFocus() {
        setLocationInputFocus(true);
    }
    function handleLocationQueryBlur() {
        setLocationInputFocus(false);
    }

    function handleLocationInput(e: ChangeEvent<HTMLInputElement>) {
        setLocationInput(e.target.value);
        setShowAutoComplete(true);
    }

    function eraseLocationInput(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setLocationInput("");
    }

    function handleJobQueryInput(e: ChangeEvent<HTMLInputElement>) {
        setJobInput(e.target.value);
    }

    function eraseJobInput(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setJobInput("");
    }

    return(
        <div className={"search-container"}>
            <div className={"search-boxes"}>
                <form className={"search-form"}>
                    <div className={"input-fields-box"}>
                        <div className={`query-box`}>
                            <div className={`border-lining ${jobInputFocus ? "job-query-box-focus" : ""}`}/>
                            <div className={"icon-box"}>
                                <FontAwesomeIcon className={"query-box-icon"} icon={faMagnifyingGlass}/>
                            </div>
                            <input className={`query-input`}
                                   value={jobInput}
                                   onChange={handleJobQueryInput}
                                   placeholder={"Job title, keywords or company"}
                                   onFocus={handleJobQueryFocus}
                                   onBlur={handleJobQueryBlur}/>
                            <div className={"cross-icon-box"}>
                                <button className={"cross-outline"} onClick={eraseJobInput}>
                                    <FontAwesomeIcon className={"cross-icon"} icon={faXmark}/>
                                </button>
                            </div>
                        </div>
                        <div className={"separator"}></div>
                        <div className={`query-box`}>
                            <div className={`border-lining ${locationInputFocus ? "location-query-box-focus" : ""}`}/>
                            <div className={"icon-box"}>
                                <FontAwesomeIcon className={"query-box-icon"} icon={faLocationDot} />
                            </div>
                            <div style={{position: "relative", display: "flex", flexGrow: 1}}>
                                <input className={"query-input"}
                                         value={locationInput}
                                         onChange={handleLocationInput}
                                         placeholder={`City, province, or "remote"`}
                                         onFocus={handleLocationQueryFocus}
                                         onBlur={handleLocationQueryBlur}/>
                                <img className={"google-logo"} src={GoogleImage} alt={""}></img>
                            </div>
                            <div className={"cross-icon-box"} >
                                <button className={"cross-outline"} onClick={eraseLocationInput}>
                                    <FontAwesomeIcon className={"cross-icon"} icon={faXmark}/>
                                </button>
                            </div>
                            {loading ? null : (
                                showAutoComplete ? (
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
