import React, {FC, useEffect, useRef, useState} from 'react';
import './EducationInfoComponent.scss';
import {EducationDTO} from "../../../../DTOs/resumeRelatedDTOs/EducationDTO";
import useResumeBuild from "../../../../hooks/useResumeBuild";
import {useJobSeeker} from "../../../../hooks/useJobSeeker";
import {ResumeService} from "../../../../services/resumeService";
import {EducationService} from "../../../../services/educationService";
import {useNavigate} from "react-router-dom";
import {ProgressPercentPerPage} from "../ProgressPercentPerPage";
import {isNotEmpty} from "../../../../utils/validationLogic/isNotEmptyString";
import {CreateResumeDTO} from "../../../../DTOs/resumeRelatedDTOs/CreateResumeDTO";
import {ServerError} from "../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import dateToStringConverter from "../../../../utils/convertLogic/dateToStringConverter";
import {CreateUpdateEducationDTO} from "../../../../DTOs/resumeRelatedDTOs/CreateUpdateEducationDTO";
import {months} from "../../../../AppConstData/Months";
import AutocompleteResultsWindow
    from "../../../EditContactInfoPage/PageComponents/AutocompleteResultsWindow/AutocompleteResultsWindow";
import {AutocompleteWindowTypes} from "../../../../enums/AutocompleteWindowTypes";
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import CountrySelector from "../../../EditContactInfoPage/PageComponents/CountrySelector/CountrySelector";
import TimePeriod from "../TimePeriod/TimePeriod";
import WhiteLoadingSpinner from "../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {getResumeInfoPageParentPath} from "../../../../utils/getResumeInfoPageParentPath";


interface AddEducationComponentProps {
    education?: EducationDTO;
}

const EducationInfoComponent: FC<AddEducationComponentProps> = ({education}) => {
    const {
        setProgressPercentage, setSaveFunc
        , setShowDialogWindow
    } = useResumeBuild();
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const navigate = useNavigate();
    const resumeService = new ResumeService();
    const educationService = new EducationService();
    const [savingProcess, setSavingProcess] = useState(false);
    const [levelOfEducation, setLevelOfEducation] = useState("");
    const levelOfEducationInputRef = useRef<HTMLInputElement>(null);
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const fieldOfStudyInputRef = useRef<HTMLInputElement>(null);
    const [schoolName, setSchoolName] = useState('');
    const schoolNameInputRef = useRef<HTMLInputElement>(null);
    const [country, setCountry] = useState('');
    const countryInputRef = useRef<HTMLSelectElement>(null);
    const [city, setCity] = useState('');
    const cityInputRef = useRef<HTMLInputElement>(null);
    const [fromMonth, setFromMonth] = useState('');
    const [fromYear, setFromYear] = useState('');
    const [toMonth, setToMonth] = useState('');
    const [toYear, setToYear] = useState('');
    const [showCityAutoComplete, setShowCityAutoComplete] = useState(false);
    const [invalidTimeProvided, setInvalidTimeProvided] = useState(false);
    const [executeInputsValidation, setExecuteInputValidations] = useState(false);
    const [parentPagePath, setParentPagePath] = useState("");

    useEffect(() => {
        const currentPath = window.location.pathname;
        let parentPathFirstPart = getResumeInfoPageParentPath(currentPath);
        if (parentPathFirstPart == "/build"){
            parentPathFirstPart = "/build/education"
        }
        setParentPagePath(parentPathFirstPart);
    }, []);


    useEffect(() => {
        setProgressPercentage(ProgressPercentPerPage * 4)
        setPassedEducationValues();
    }, []);

    useEffect(() => {
        setSaveFunc(() => CustomSaveFunc);
    }, [levelOfEducation, fieldOfStudy, schoolName,
        country, city, fromMonth, fromYear, toMonth, toYear]);

    async function CustomSaveFunc() {
        await handleEducationCreation("/my-profile", true)
    }

    async function addEducation(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        await handleEducationCreation(parentPagePath, false)

    }

    async function handleEducationCreation(nextPageRoute: string, isSaveAndExitAction: boolean) {
        if (!isNotEmpty(levelOfEducation)) {
            setExecuteInputValidations(true);
            if (levelOfEducationInputRef.current) {
                levelOfEducationInputRef.current.focus();
                levelOfEducationInputRef.current.scrollIntoView({block: "end", behavior: "smooth"});
                if (isSaveAndExitAction) {
                    setShowDialogWindow(true);
                }
                return;
            }
        }
        if (invalidTimeProvided) {
            setExecuteInputValidations(true);
            if (isSaveAndExitAction) {
                setShowDialogWindow(true);
            }
            return;
        }
        if (education) {
            await updateEducation();
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
                educations: [fillCreateEducationDTO()],
                workExperiences: [],
                skills: []
            }
            const retrievedResume = await resumeService.postResume(createdResume);
            const updatedJobSeeker = jobSeeker;
            updatedJobSeeker!.resume = retrievedResume;
            setJobSeeker(updatedJobSeeker);
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
            const retrievedEducation = await educationService.addEducation(jobSeeker!.resume!.id, fillCreateEducationDTO());
            const updatedJobSeeker = jobSeeker;
            updatedJobSeeker?.resume!.educations.push(retrievedEducation);
            setJobSeeker(updatedJobSeeker);
        } catch (err) {
            if (err instanceof ServerError) {
                logErrorInfo(err)
            }
        } finally {
            setSavingProcess(false);
        }
    }

    async function updateEducation() {
        try {
            setSavingProcess(true);
            const retrievedEducation = await educationService.updateEducation(education!.id, fillCreateEducationDTO());
            const updatedJobSeeker = jobSeeker;
            const educationIndex = updatedJobSeeker!.resume!.educations.findIndex(e => e.id === retrievedEducation.id);

            if (educationIndex !== -1) {
                updatedJobSeeker!.resume!.educations[educationIndex] = retrievedEducation;
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
    
    function cancelEditing(){
        navigate(parentPagePath)
    }
    
    function navigateToWorkExperiencePage(){
        navigate("/build/experience")
    }

    function fillCreateEducationDTO() {
        let fromDate = dateToStringConverter(fromMonth, fromYear);
        let toDate = dateToStringConverter(toMonth, toYear);

        const createdEducation: CreateUpdateEducationDTO = {
            levelOfEducation,
            fieldOfStudy,
            schoolName,
            country,
            city,
            from: fromDate,
            to: toDate
        }
        return createdEducation;
    }

    function setPassedEducationValues() {
        if (!education) {
            return;
        }
        const educationFormattedFromDate = education.from?.toString().split("-");
        const educationFormattedToDate = education.to?.toString().split("-");

        setLevelOfEducation(education.levelOfEducation)
        setFieldOfStudy(education.fieldOfStudy || "");
        setSchoolName(education.schoolName || "");
        setCountry(education.country || "");
        setCity(education.city || "");
        if (educationFormattedFromDate && educationFormattedToDate) {
            const convertedFromMonth = months
                .find((m) => m.monthNumber == Number.parseInt(educationFormattedFromDate[1]))?.name;
            const convertedToMonth = months
                .find((m) => m.monthNumber == Number.parseInt(educationFormattedToDate[1]))?.name;

            setFromMonth(convertedFromMonth || "");
            setFromYear(educationFormattedFromDate[0]);
            setToMonth(convertedToMonth || "");
            setToYear(educationFormattedToDate[0]);
        }
    }

    return (
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
                    {education ? <span>Edit education</span> : <span>Add Education</span>}
                </div>
                <CustomInputField fieldLabel={"Level of education"}
                                  isRequired={true}
                                  inputFieldValue={levelOfEducation}
                                  setInputFieldValue={setLevelOfEducation}
                                  inputRef={levelOfEducationInputRef}
                                  notShowErrorInitially={true} executeValidation={executeInputsValidation} setExecuteValidation={setExecuteInputValidations}/>

                <CustomInputField
                    fieldLabel={'Field of study'}
                    isRequired={false}
                    inputFieldValue={fieldOfStudy}
                    setInputFieldValue={setFieldOfStudy}
                    inputRef={fieldOfStudyInputRef}
                />

                <CustomInputField
                    fieldLabel={'School name'}
                    isRequired={false}
                    inputFieldValue={schoolName}
                    setInputFieldValue={setSchoolName}
                    inputRef={schoolNameInputRef}
                />
                
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
                
                <TimePeriod
                    fromMonth={fromMonth}
                    setFromMonth={setFromMonth}
                    fromYear={fromYear}
                    setFromYear={setFromYear}
                    toMonth={toMonth}
                    setToMonth={setToMonth}
                    toYear={toYear}
                    setToYear={setToYear}
                    invalidValuesProvided={invalidTimeProvided}
                    setInvalidValuesProvided={setInvalidTimeProvided}/>
                <div className={"form-buttons-row-container"}>
                    <button className={"submit-form-button"} onClick={addEducation}>
                        {savingProcess ?
                            <WhiteLoadingSpinner/>
                            :
                            <span>Save</span>
                        }
                    </button>
                    {parentPagePath == "/build/education" ? 
                    <button className={"skip-form-button"} onClick={navigateToWorkExperiencePage}>
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
export default EducationInfoComponent;
