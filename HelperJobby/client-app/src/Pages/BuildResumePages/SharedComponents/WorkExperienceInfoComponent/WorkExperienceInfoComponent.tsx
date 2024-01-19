import React, {FC, useRef, useState} from 'react';
import './WorkExperienceInfoComponent.scss';
import TimePeriod from "../TimePeriod/TimePeriod";
import AutocompleteResultsWindow
    from "../../../EditContactInfoPage/PageComponents/AutocompleteResultsWindow/AutocompleteResultsWindow";
import {AutocompleteWindowTypes} from "../../../../enums/AutocompleteWindowTypes";
import {WorkExperienceDTO} from "../../../../DTOs/resumeRelatedDTOs/WorkExperienceDTO";
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import CountrySelector from "../../../EditContactInfoPage/PageComponents/CountrySelector/CountrySelector";

interface WorkExperienceInfoComponentProps {
    workExperience? : WorkExperienceDTO
}

const WorkExperienceInfoComponent: FC<WorkExperienceInfoComponentProps> = ({workExperience}) => {
    
    const [jobTitle, setJobTitle] = useState("");
    const jobTitleInputRef = useRef<HTMLInputElement>(null);
    const [company, setCompany] = useState("");
    const [country, setCountry] = useState('');
    const countryInputRef = useRef<HTMLSelectElement>(null);
    const [city, setCity] = useState('');
    const cityInputRef = useRef<HTMLInputElement>(null);
    const [fromMonth, setFromMonth] = useState('');
    const [fromYear, setFromYear] = useState('');
    const [toMonth, setToMonth] = useState('');
    const [toYear, setToYear] = useState('');
    const [invalidValuesProvided, setInvalidValuesProvided] = useState(false);
    const [currentlyWorkingHere, setCurrentlyWorkingHere] = useState(false);
    const [showCityAutoComplete, setShowCityAutoComplete] = useState(false);
    const [savingInfo, setSavingInfo] = useState(false);
    
    function toggleCurrentlyWorkHere(){
        setCurrentlyWorkingHere(!currentlyWorkingHere)
    }

    return(
        <>
            {showCityAutoComplete && <AutocompleteResultsWindow inputFieldRef={cityInputRef}
                                                                inputValue={city}
                                                                setInputValue={setCity}
                                                                country={country || "Canada"}
                                                                showResult={showCityAutoComplete}
                                                                setShowResult={setShowCityAutoComplete}
                                                                autocompleteWindowType={AutocompleteWindowTypes.city}/>}

            <form className={"build-resume-form"}>
                {savingInfo && <div className={"saving-in-progress-surface"}></div>}
                <div className={"build-page-header"}>
                    {workExperience ? <span>Edit work experience</span> : <span>Add work experience</span>}
                </div>
                <CustomInputField 
                    fieldLabel={"Job title"}
                    isRequired={true}
                    inputFieldValue={jobTitle}
                    setInputFieldValue={setJobTitle}
                    inputRef={jobTitleInputRef}
                    notShowErrorInitially={true}/>
                
                <CustomInputField
                    fieldLabel={"Company"}
                    isRequired={false}
                    inputFieldValue={company}
                    setInputFieldValue={setCompany}/>

                <CountrySelector
                    country={country}
                    setCountry={setCountry}
                    selectRef={countryInputRef}/>

                <CustomInputField
                    fieldLabel={"City, Province/Territory"}
                    isRequired={false}
                    inputFieldValue={city}
                    setInputFieldValue={setCity}
                    displayGoogleLogo={true}
                    inputRef={cityInputRef}
                    setShowAutocompleteWindow={setShowCityAutoComplete}/>
                
                <div className={"is-current"}>
                    <div className={"field-label"}>
                        Time period
                    </div>
                    <div className={"checkbox-container"}>
                        <input className={"checkbox"} type={"checkbox"}/>
                        <span>I currently work here</span>
                    </div>
                </div>
                
                <TimePeriod
                    fromMonth={fromMonth}
                    setFromMonth={setFromMonth}
                    fromYear={fromYear}
                    setFromYear={setFromYear}
                    toMonth={toMonth}
                    setToMonth={setToMonth}
                    toYear={toYear}
                    setToYear={setToYear}
                    invalidValuesProvided={invalidValuesProvided}
                    setInvalidValuesProvided={setInvalidValuesProvided}
                    currentlyEnrolledSelected={currentlyWorkingHere}/>
            </form>
        </>
        
    )
}

export default WorkExperienceInfoComponent;
