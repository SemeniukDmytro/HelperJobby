import React, {FC, useEffect, useRef, useState} from 'react';
import './EducationInfoComponent.scss';
import useResumeBuild from "../../../../../hooks/useResumeBuild";
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import {useNavigate} from "react-router-dom";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";
import {ProgressPercentPerPage} from "../../../SharedComponents/ProgressPercentPerPage";
import CountrySelector from "../../../../EditContactInfoPage/PageComponents/CountrySelector/CountrySelector";
import AutocompleteResultsWindow
    from "../../../../EditContactInfoPage/PageComponents/AutocompleteResultsWindow/AutocompleteResultsWindow";
import {AutocompleteWindowTypes} from "../../../../../enums/AutocompleteWindowTypes";
import DateSelector from "../../../../../Components/DateSelector/DateSelector";
import {TimeStamps} from "../../../../../enums/TimeStamps";
import {ResumeService} from "../../../../../services/resumeService";
import {EducationService} from "../../../../../services/educationService";
import {CreateUpdateEducationDTO} from "../../../../../DTOs/resumeRelatedDTOs/CreateUpdateEducationDTO";
import {ServerError} from "../../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {CreateResumeDTO} from "../../../../../DTOs/resumeRelatedDTOs/CreateResumeDTO";
import dateToStringConverter from "../../../../../utils/dateToStringConverter";

interface AddEducationComponentProps {}

const EducationInfoComponent: FC<AddEducationComponentProps> = () => {
    const {setProgressPercentage, setSaveFunc} = useResumeBuild();
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
    const [startMonth, setStartMonth] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endMonth, setEndMonth] = useState('');
    const [endYear, setEndYear] = useState('');
    const [showCityAutoComplete, setShowCityAutoComplete] = useState(false);
    
    
    useEffect(() => {
        setProgressPercentage(ProgressPercentPerPage * 4)
    }, []);

    useEffect(() => {
        setSaveFunc(() => CustomSaveFunc);
    }, [levelOfEducation, fieldOfStudy, schoolName,
    country, city, startMonth, startYear, endMonth, endYear]);

    async function CustomSaveFunc(){
        await handleEducationCreation("/my-profile")

    }

    async function addEducation(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        await handleEducationCreation("/build/education")
        
    }
    
    async function handleEducationCreation(nextPageRoute : string){
        if (jobSeeker?.resume){
            await addToExistingResume()
        }
        else {
            await createNewResume();
        }
        navigate(nextPageRoute)
    }
    
    async function createNewResume(){
        try {
            setSavingProcess(true);
            const createdResume : CreateResumeDTO = {
                educations : [fillCreateEducationDTO()],
                workExperiences : [],
                skills : []
            }
            const retrievedResume =  await resumeService.postResume(createdResume);
            const updatedJobSeeker = jobSeeker;
            updatedJobSeeker!.resume = retrievedResume;
            setJobSeeker(updatedJobSeeker);
        }
        catch (err){
            if (err instanceof ServerError){
                console.log(err.ServerErrorDTO)
                logErrorInfo(err)
            }
        }
        finally {
            setSavingProcess(false);
        }
    }
    async function addToExistingResume(){
        try {
            setSavingProcess(true);
            const retrievedEducation =  await educationService.addEducation(jobSeeker!.resume.id, fillCreateEducationDTO());
            const updatedJobSeeker = jobSeeker;
            updatedJobSeeker?.resume.educations.push(retrievedEducation);
            setJobSeeker(updatedJobSeeker);
        }
        catch (err){
            if (err instanceof ServerError){
                console.log(err.ServerErrorDTO)
                logErrorInfo(err)
            }
        }
        finally {
            setSavingProcess(false);
        }
    }
    
    function fillCreateEducationDTO(){
        let fromDate = dateToStringConverter(startMonth, startYear);
        let toDate = dateToStringConverter(endMonth, endYear);
        
        const createdEducation : CreateUpdateEducationDTO = {
            levelOfEducation,
            fieldOfStudy,
            schoolName,
            country,
            city,
            from : fromDate,
            to : toDate}
        return createdEducation;
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
                Add education
            </div>
            <CustomInputField fieldLabel={"Level of education"}
                              isRequired={true}
                              inputFieldValue={levelOfEducation}
                              setInputFieldValue={setLevelOfEducation}
                              inputRef={levelOfEducationInputRef}
                              showErrorInitially={true}/>

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
                selectRef={countryInputRef}
                isNotRequired={true}/>
            
            <CustomInputField 
                fieldLabel={"City, Province/Territory"} 
                isRequired={false}
                inputFieldValue={city}
                setInputFieldValue={setCity}
                displayGoogleLogo={true}
                inputRef={cityInputRef}
                setShowAutocompleteWindow={setShowCityAutoComplete}/>
            
            <div className={"time-stamp-container"}>
                <div className={"double-select-label"}>From</div>
                <div className={"double-select-container"}>
                    <DateSelector selectValue={startMonth} setSelectValue={setStartMonth} timeStamp={TimeStamps.Month}/>
                    <DateSelector selectValue={startYear} setSelectValue={setStartYear} timeStamp={TimeStamps.Year}/>
                </div>
            </div>
            <div className={"time-stamp-container"}>
                <div className={"double-select-label"}>To</div>
                <div className={"double-select-container"}>
                    <DateSelector selectValue={endMonth} setSelectValue={setEndMonth} timeStamp={TimeStamps.Month}/>
                    <DateSelector selectValue={endYear} setSelectValue={setEndYear} timeStamp={TimeStamps.Year}/>
                </div>
            </div>
            <div className={"form-buttons-row-container"}>
                <button className={"submit-form-button"} onClick={addEducation}>
                    Save
                </button>
                <button className={"skip-form-button"} onClick={fillCreateEducationDTO}>
                    Skip
                </button>
            </div>
        </form>
        </>
    )
}
export default EducationInfoComponent;
