import React, {FC, useEffect, useRef, useState} from 'react';
import './WorkExperienceInfoComponent.scss';
import TimePeriod from "../TimePeriod/TimePeriod";
import AutocompleteResultsWindow
    from "../../../EditContactInfoPage/PageComponents/AutocompleteResultsWindow/AutocompleteResultsWindow";
import {WorkExperienceDTO} from "../../../../DTOs/resumeRelatedDTOs/WorkExperienceDTO";
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import CountrySelector from "../../../EditContactInfoPage/PageComponents/CountrySelector/CountrySelector";
import {ProgressPercentPerPage} from "../ProgressPercentPerPage";
import WhiteLoadingSpinner from "../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {CreateResumeDTO} from "../../../../DTOs/resumeRelatedDTOs/CreateResumeDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {CreateUpdateWorkExperienceDTO} from "../../../../DTOs/resumeRelatedDTOs/CreateUpdateWorkExperienceDTO";
import {WorkExperienceService} from "../../../../services/workExperienceService";
import {ResumeService} from "../../../../services/resumeService";
import {JobSeekerDTO} from "../../../../DTOs/accountDTOs/JobSeekerDTO";
import {useLocation, useNavigate} from "react-router-dom";
import {months} from "../../../../AppConstData/Months";
import {getResumeInfoPageParentPath} from "../../../../utils/getResumeInfoPageParentPath";
import LocationCustomInputField from "../../../../Components/LocationCustomInputField/LocationCustomInputField";
import {AutocompleteWindowTypes} from "../../../../enums/utilityEnums/AutocompleteWindowTypes";
import {MonthAndYearFromJSONToStringConverter} from "../../../../utils/convertLogic/formatDate";
import useResumeBuild from "../../../../hooks/contextHooks/useResumeBuild";
import {useJobSeeker} from "../../../../hooks/contextHooks/useJobSeeker";
import useCurrentJobApplication from "../../../../hooks/contextHooks/useCurrentJobApplication";

interface WorkExperienceInfoComponentProps {
    workExperience?: WorkExperienceDTO
}

const WorkExperienceInfoComponent: FC<WorkExperienceInfoComponentProps> = ({workExperience}) => {
    const {setProgressPercentage, setShowDialogWindow, setSaveFunc} = useResumeBuild();
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const {job} = useCurrentJobApplication();
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
    const [validateJobTitle, setExecuteValidation] = useState(false);
    const [parentPagePath, setParentPagePath] = useState("");
    const location = useLocation();


    useEffect(() => {
        if (descriptionInputRef.current) {
            descriptionInputRef.current.innerText = workExperience?.description || "";
        }
        setProgressPercentage(ProgressPercentPerPage * 5);
        if (workExperience) {
            setPassedWorkExperienceValues();
        }

        const currentPath = location.pathname;
        let parentPathFirstPart = getResumeInfoPageParentPath(currentPath);
        if (parentPathFirstPart == "/build") {
            parentPathFirstPart = "/build/experience"
        }
        else if (parentPathFirstPart == "/apply-resume"){
            parentPathFirstPart = "/apply-resume/experience"
        }
        setParentPagePath(parentPathFirstPart);
    }, []);

    useEffect(() => {
        setSaveFunc(() => CustomSaveFunc);
    }, [jobTitle, company, country, city, fromMonth,
        fromYear, toMonth, toYear, description, currentlyWorkingHere]);

    function changeDescriptionValue(event: React.FormEvent<HTMLDivElement>) {
        setDescription(event.currentTarget.innerHTML);
    }

    function toggleCurrentlyWorkHere() {
        setCurrentlyWorkingHere(!currentlyWorkingHere)
    }

    async function CustomSaveFunc() {
        let nextPagePath = "/my-profile";
        if (parentPagePath.includes("/apply-resume") && job){
            nextPagePath = `job-apply/${job.id}/resume`
        }
        await handleWorkExperienceCreation(nextPagePath, true)
    }

    function navigateToSkillsPage() {
        let nextPagePath = "/build/skills";
        if (parentPagePath.includes("/apply-resume") && job){
            nextPagePath = `/apply-resume/skills`;
        }
        navigate(nextPagePath); 
    }

    function cancelEditing() {
        navigate(parentPagePath);
    }

    async function addWorkExperience(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        await handleWorkExperienceCreation(parentPagePath, false)
    }

    async function handleWorkExperienceCreation(nextPageRoute: string, isSaveAndExitAction: boolean) {
        if (!jobTitle) {
            setExecuteValidation(true);
            jobTitleInputRef.current?.focus();
            jobTitleInputRef.current?.scrollIntoView({block: "end", behavior: "smooth"});
            if (isSaveAndExitAction) {
                setShowDialogWindow(true);
            }
            return;
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
                if (prev) {
                    const updatedJobSeeker: JobSeekerDTO = {
                        ...prev,
                        resume: retrievedResume
                    }
                    return updatedJobSeeker;
                }
                return prev;
            });

        } catch (err) {
            logErrorInfo(err);
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
            logErrorInfo(err)
        } finally {
            setSavingProcess(false);
        }
    }

    async function updateWorkExperience() {
        try {
            setSavingProcess(true);
            const retrievedWorkExperience = await workExperienceService.updateWorkExperience(workExperience!.id, fillWorkExperienceDTO());
            const updatedJobSeeker = jobSeeker;
            const workExperienceIndex = updatedJobSeeker!.resume!.workExperiences.findIndex(e => e.id === retrievedWorkExperience.id);
            if (workExperienceIndex !== -1) {
                updatedJobSeeker!.resume!.workExperiences[workExperienceIndex] = retrievedWorkExperience;
                setJobSeeker(updatedJobSeeker);
            }
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setSavingProcess(false);
        }
    }

    function fillWorkExperienceDTO() {
        let fromDate = MonthAndYearFromJSONToStringConverter(fromMonth, fromYear);
        let toDate = MonthAndYearFromJSONToStringConverter(toMonth, toYear);

        let createUpdateWorkExperienceDTO: CreateUpdateWorkExperienceDTO = {
            jobTitle,
            company,
            country,
            cityOrProvince: city,
            from: fromDate,
            description: description,
            currentlyWorkHere: currentlyWorkingHere
        };
        if (!currentlyWorkingHere) {
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
        if (educationFormattedToDate) {
            const convertedToMonth = months
                .find((m) => m.monthNumber == Number.parseInt(educationFormattedToDate[1]))?.name;
            setToMonth(convertedToMonth || "");
            setToYear(educationFormattedToDate[0]);
        }
    }

    return (
        <>
            {showCityAutoComplete && <AutocompleteResultsWindow
                inputFieldRef={cityInputRef}
                windowMaxWidth={"calc(602px - 2rem)"}
                inputValue={city}
                setInputValue={setCity}
                country={country || "Canada"}
                showResult={showCityAutoComplete}
                setShowResult={setShowCityAutoComplete}
                autocompleteWindowType={AutocompleteWindowTypes.city}
            />}

            <form className={"build-resume-form"}>
                {savingProcess && <div className={"request-in-process-surface"}></div>}
                <div className={"build-page-header"}>
                    {workExperience ? <span>Edit work experience</span> :
                        <span>{parentPagePath.includes("/apply-resume") ?
                            "Do you want to add a recent job?"
                            : "Add Experience"}</span>}
                </div>
                <CustomInputField
                    fieldLabel={"Job title"}
                    isRequired={true}
                    inputFieldValue={jobTitle}
                    setInputFieldValue={setJobTitle}
                    inputRef={jobTitleInputRef}
                    executeValidation={validateJobTitle}
                    setExecuteValidation={setExecuteValidation}
                />

                <CustomInputField
                    fieldLabel={"Company"}
                    isRequired={false}
                    inputFieldValue={company}
                    setInputFieldValue={setCompany}
                />

                <CountrySelector
                    country={country}
                    setCountry={setCountry}
                    selectRef={countryInputRef}
                />

                <LocationCustomInputField
                    fieldLabel={"City, Province / Territory"}
                    inputValue={city}
                    setInputValue={setCity}
                    inputRef={cityInputRef}
                    isRequired={false}
                    setShowAutocompleteResults={setShowCityAutoComplete}/>

                <div className={"is-current"}>
                    <div className={"field-label"}>
                        Time period
                    </div>
                <div className={"checkbox-container mt05rem"}>
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
                    currentlyEnrolledSelected={currentlyWorkingHere}
                />

                <div className={"description-container"}>
                    <div className={"field-label"}>
                        <span>Description</span>
                    </div>
                    <div style={{position: "relative", marginTop: "0.5rem"}}>
                        <div
                            role={"textbox"}
                            contentEditable={true}
                            className={"description-input"}
                            onInput={changeDescriptionValue}
                            ref={descriptionInputRef}
                        >
                        </div>
                        <div className={"description-focused"}></div>
                    </div>
                </div>
                <div className={"between-lines-spacing"}></div>
                <div className={"form-buttons-row-container"}>
                    <button className={"blue-button min-4chr-btn-width"} onClick={addWorkExperience}>
                        {savingProcess ?
                            <WhiteLoadingSpinner/>
                            :
                            <span>Save</span>
                        }
                    </button>
                    {parentPagePath == "/build/experience" || parentPagePath == "/apply-resume/experience" ?
                        <button className={"skip-form-button"} onClick={navigateToSkillsPage}>
                            Skip
                        </button>
                        :
                        <button className={"skip-form-button"} onClick={cancelEditing}>
                            Cancel
                        </button>
                    }
                </div>
            </form>
        </>

    )
}

export default WorkExperienceInfoComponent;
