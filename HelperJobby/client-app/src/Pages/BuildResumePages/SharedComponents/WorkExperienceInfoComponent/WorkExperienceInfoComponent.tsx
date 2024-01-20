import React, {FC, useEffect, useRef, useState} from 'react';
import './WorkExperienceInfoComponent.scss';
import TimePeriod from "../TimePeriod/TimePeriod";
import AutocompleteResultsWindow
    from "../../../EditContactInfoPage/PageComponents/AutocompleteResultsWindow/AutocompleteResultsWindow";
import {AutocompleteWindowTypes} from "../../../../enums/AutocompleteWindowTypes";
import {WorkExperienceDTO} from "../../../../DTOs/resumeRelatedDTOs/WorkExperienceDTO";
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import CountrySelector from "../../../EditContactInfoPage/PageComponents/CountrySelector/CountrySelector";
import useResumeBuild from "../../../../hooks/useResumeBuild";
import {ProgressPercentPerPage} from "../ProgressPercentPerPage";
import WhiteLoadingSpinner from "../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {CreateResumeDTO} from "../../../../DTOs/resumeRelatedDTOs/CreateResumeDTO";
import {ServerError} from "../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import dateToStringConverter from "../../../../utils/convertLogic/dateToStringConverter";
import {CreateUpdateWorkExperienceDTO} from "../../../../DTOs/resumeRelatedDTOs/CreateUpdateWorkExperienceDTO";
import {useJobSeeker} from "../../../../hooks/useJobSeeker";
import {WorkExperienceService} from "../../../../services/workExperienceService";
import {ResumeService} from "../../../../services/resumeService";
import {JobSeekerAccountDTO} from "../../../../DTOs/accountDTOs/JobSeekerAccountDTO";
import {isNotEmpty} from "../../../../utils/validationLogic/isNotEmptyString";
import {useNavigate} from "react-router-dom";
import {months} from "../../../../AppConstData/Months";

interface WorkExperienceInfoComponentProps {
    workExperience? : WorkExperienceDTO
}

const WorkExperienceInfoComponent: FC<WorkExperienceInfoComponentProps> = ({workExperience}) => {
    const {setProgressPercentage, setShowDialogWindow, setSaveFunc} = useResumeBuild();
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const workExperienceService = new WorkExperienceService();
    const resumeService = new ResumeService();
    const navigate = useNavigate();
    
    const [jobTitle, setJobTitle] = useState("");
    const jobTitleInputRef = useRef<HTMLInputElement>(null);
    const [company, setCompany] = useState("");
    const [country, setCountry] = useState('');
    const countryInputRef = useRef<HTMLSelectElement>(null);
    const [city, setCity] = useState("");
    const cityInputRef = useRef<HTMLInputElement>(null);
    const [fromMonth, setFromMonth] = useState('');
    const [fromYear, setFromYear] = useState('');
    const [toMonth, setToMonth] = useState('');
    const [toYear, setToYear] = useState('');
    const [description, setDescription] = useState("");
    const descriptionInputRef = useRef<HTMLDivElement>(null);
    const [invalidValuesProvided, setInvalidValuesProvided] = useState(false);
    const [currentlyWorkingHere, setCurrentlyWorkingHere] = useState(false);
    const [showCityAutoComplete, setShowCityAutoComplete] = useState(false);
    const [savingProcess, setSavingProcess] = useState(false);

    useEffect(() => {
        if (descriptionInputRef.current) {
            descriptionInputRef.current.innerText = description;
        }
        setProgressPercentage(ProgressPercentPerPage * 5);
    }, []);

    useEffect(() => {
        setSaveFunc(() => CustomSaveFunc);
    }, [jobTitle, company, country, city, fromMonth,
    fromYear, toMonth, toYear, description, currentlyWorkingHere]);

    function changeDescriptionValue(event: React.FormEvent<HTMLDivElement>) {
        setDescription(event.currentTarget.innerHTML);
    }

    function toggleCurrentlyWorkHere(){
        setCurrentlyWorkingHere(!currentlyWorkingHere)
    }
    
    async function CustomSaveFunc() {
        await handleWorkExperienceCreation("/my-profile", true)
    }
    
    function navigateToSkillsPage() {
        navigate("/build/skills")
    }

    function navigateToWorkExperiencePage() {
        navigate("/build/experience")
    }

    async function addWorkExperience(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        await handleWorkExperienceCreation("/build/experience", false)
    }

    async function handleWorkExperienceCreation(nextPageRoute: string, isSaveAndExitAction: boolean) {
        if (!isNotEmpty(jobTitle)) {
            if (jobTitleInputRef.current) {
                jobTitleInputRef.current.focus();
                if (isSaveAndExitAction) {
                    setShowDialogWindow(true);
                }
                return;
            }
        }
        if (invalidValuesProvided) {
            if (isSaveAndExitAction) {
                setShowDialogWindow(true);
            }
            return;
        }
        if (workExperience) {
            await updateWorkExperience();
        } else if (jobSeeker?.resume) {
            await addToExistingResume()
        } else {
            await createNewResume();
        }
        navigate(nextPageRoute)
    }

    async function createNewResume() {
        try {
            setSavingProcess(true);
            const createdResume: CreateResumeDTO = {
                educations: [],
                workExperiences: [fillWorkExperienceDTO()],
                skills: []
            }
            const retrievedResume = await resumeService.postResume(createdResume);
            setJobSeeker((prev) => {
                if (prev){
                    const updatedJobSeeker : JobSeekerAccountDTO = {
                        ...prev,
                        resume : retrievedResume
                    }
                    return updatedJobSeeker;
                }
                return prev;});
            
        } catch (err) {
            if (err instanceof ServerError) {
                logErrorInfo(err)
            }
        } finally {
            setSavingProcess(false);
        }
    }

    async function addToExistingResume() {
        try {
            setSavingProcess(true);
            const retrievedWorkExperience = await workExperienceService.addWorkExperience(jobSeeker!.resume!.id, fillWorkExperienceDTO());
            const updatedJobSeeker = jobSeeker;
            updatedJobSeeker?.resume!.workExperiences.push(retrievedWorkExperience);
            setJobSeeker(updatedJobSeeker);
        } catch (err) {
            if (err instanceof ServerError) {
                logErrorInfo(err)
            }
        } finally {
            setSavingProcess(false);
        }
    }

    async function updateWorkExperience() {
        try {
            setSavingProcess(true);
            const retrievedWorkExperience = await workExperienceService.updateWorkExperience(workExperience!.workExperienceId, fillWorkExperienceDTO());
            const updatedJobSeeker = jobSeeker;
            const workExperienceIndex = updatedJobSeeker!.resume!.educations.findIndex(e => e.id === retrievedWorkExperience.workExperienceId);

            if (workExperienceIndex !== -1) {
                updatedJobSeeker!.resume!.workExperiences[workExperienceIndex] = retrievedWorkExperience;
                setJobSeeker(updatedJobSeeker);
            }
        } catch (err) {
            if (err instanceof ServerError) {
                logErrorInfo(err)
            }
        } finally {
            setSavingProcess(false);
        }
    }

    function fillWorkExperienceDTO() {
        let fromDate = dateToStringConverter(fromMonth, fromYear);
        let toDate = dateToStringConverter(toMonth, toYear);

        let createUpdateWorkExperienceDTO: CreateUpdateWorkExperienceDTO = {
            jobTitle,
            company,
            country,
            cityOrProvince : city,
            from : fromDate,
            description : description,
            currentlyWorkHere : currentlyWorkingHere
        };
        if (!currentlyWorkingHere){
            createUpdateWorkExperienceDTO.to = toDate;
        }
        return createUpdateWorkExperienceDTO;
    }

    function setPassedWorkExperienceValues() {
        if (!workExperience) {
            return;
        }
        const educationFormattedFromDate = workExperience.from?.toString().split("-");
        const educationFormattedToDate = workExperience.to?.toString().split("-");

        setJobTitle(workExperience.jobTitle)
        setCompany(workExperience.company || "");
        setDescription(workExperience.description || "");
        setCountry(workExperience.country || "");
        setCity(workExperience.cityOrProvince || "");
        setCurrentlyWorkingHere(workExperience.currentlyWorkHere || false);
        if (educationFormattedFromDate) {
            const convertedFromMonth = months
                .find((m) => m.monthNumber == Number.parseInt(educationFormattedFromDate[1]))?.name;
            

            setFromMonth(convertedFromMonth || "");
            setFromYear(educationFormattedFromDate[0]);
        }
        if (educationFormattedToDate){
            const convertedToMonth = months
                .find((m) => m.monthNumber == Number.parseInt(educationFormattedToDate[1]))?.name;
            setToMonth(convertedToMonth || "");
            setToYear(educationFormattedToDate[0]);
        }
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
                {savingProcess && <div className={"saving-in-progress-surface"}></div>}
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
                        <input className={"checkbox"} type={"checkbox"} onChange={toggleCurrentlyWorkHere}/>
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
                
                <div className={"description-container"}>
                    <div className={"field-label"}>
                        <span>Description</span>
                    </div>
                    <div style={{position : "relative", marginTop: "0.5rem"}}>
                        <div
                            role={"textbox"}
                            contentEditable={true}
                            className={"description-input"}
                            onInput={changeDescriptionValue}
                            ref={descriptionInputRef}>
                        </div>
                        <div className={"description-focused"}></div>
                    </div>
                </div>
                <div className={"between-lines-spacing"}></div>
                <div className={"form-buttons-row-container"}>
                    <button className={"blue-button"} onClick={addWorkExperience}>
                        {savingProcess ?
                            <WhiteLoadingSpinner/>
                            :
                            <span>Save</span>
                        }
                    </button>
                    {!workExperience ?
                        <button className={"skip-form-button"} onClick={navigateToSkillsPage}>
                            Skip
                        </button>
                        :
                        <button className={"skip-form-button"} onClick={navigateToWorkExperiencePage}>
                            Cancel
                        </button>
                    }
                </div>
            </form>
        </>
        
    )
}

export default WorkExperienceInfoComponent;
