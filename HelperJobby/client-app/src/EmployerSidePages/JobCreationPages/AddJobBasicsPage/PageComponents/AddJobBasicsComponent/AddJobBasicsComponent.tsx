import React, {FC, FormEvent, useEffect, useRef, useState} from 'react';
import './AddJobBasicsComponent.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong, faCircleInfo, faPen} from "@fortawesome/free-solid-svg-icons";
import SelectLanguageDialog from "../SelectLanguageDialog/SelectLanguageDialog";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";
import CustomSelectField from "../../../../../Components/CustomSelectField/CustomSelectField";
import {numberOfOpeningsOptions} from "../../../../../AppConstData/NumberOfOpeningsOptions";
import JobLocationTypeSelector from "../JobLocationTypeSelector/JobLocationTypeSelector";
import AutocompleteResultsWindow
    from "../../../../../JobSeekerSidePages/EditContactInfoPage/PageComponents/AutocompleteResultsWindow/AutocompleteResultsWindow";
import LocationCustomInputField from "../../../../../Components/LocationCustomInputField/LocationCustomInputField";
import {useNavigate, useParams} from "react-router-dom";
import PageTitleWithImage from "../../../../../EmployersSideComponents/PageTitleWithImage/PageTitleWithImage";
import JobBasics from "../../../../../Components/Icons/JobBasics";
import WhiteLoadingSpinner from "../../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {AutocompleteWindowTypes} from "../../../../../enums/utilityEnums/AutocompleteWindowTypes";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";
import {CreateIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/CreateIncompleteJobDTO";
import {isNanAfterIntParse} from "../../../../../utils/validationLogic/numbersValidators";
import useJobCreation from "../../../../../hooks/useJobCreation";
import {
    useJobLoaderForSettingCurrentIncompleteJob
} from "../../../../../hooks/useJobLoaderForSettingCurrentIncompleteJob";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {JobLocationTypes} from "../../../../../enums/modelDataEnums/JobLocationTypes";


interface AddJobBasicsComponentProps {
}

const AddJobBasicsComponent: FC<AddJobBasicsComponentProps> = () => {
    const {incompleteJob, setIncompleteJob} = useJobCreation();
    const [jobPostLanguage, setJobPostLanguage] = useState("English");
    const [jobPostingCountry, setJobPostingCountry] = useState("Canada");
    const [showLanguageDialog, setShowLanguageDialog] = useState(false);
    const [jobTitle, setJobTitle] = useState("");
    const jobTitleInputRef = useRef<HTMLInputElement>(null);
    const [numberOfOpenings, setNumberOfOpenings] = useState("");
    const [invalidNumberOfOpenings, setInvalidNumberOfOpenings] = useState(true);
    const [jobLocationTypeEnumValue, setJobLocationTypeEnumValue] = useState(JobLocationTypes.InPerson);
    const [jobLocationFieldLabel, setJobLocationFieldLabel] = useState("What is the street address for this location?");
    const [jobLocation, setJobLocation] = useState("");
    const locationInputRef = useRef<HTMLInputElement>(null);
    const [executeFormValidation, setExecuteFormValidation] = useState(false);
    const [showStreetsAutocomplete, setShowStreetsAutocomplete] = useState(false);
    const [showCityAutoComplete, setShowCityAutoComplete] = useState(false);
    const [locationSelectedFromSuggests, setLocationSelectedFromSuggests] = useState(false);
    const [locationError, setLocationError] = useState("");
    const navigate = useNavigate();
    const [requestInProgress, setRequestInProgress] = useState(false);
    const incompleteJobService = new IncompleteJobService();
    const [loading, setLoading] = useState(true);
    const {jid} = useParams<{jid : string}>();
    const {fetchJobAndSetJobCreation} =  useJobLoaderForSettingCurrentIncompleteJob(jid ? parseInt(jid) : 0, incompleteJob, setIncompleteJob);
    
    useEffect(() => {
        if (jid){
            fetchPageInitialData();
        }
    }, []);
    console.log(jobLocation);

    useEffect(() => {
        if (!jid){
            setLoading(false);
            return;
        }
        if (incompleteJob){
            setJobTitle(incompleteJob.jobTitle);
            setNumberOfOpenings(incompleteJob.numberOfOpenings.toString())
            setJobPostLanguage(incompleteJob.language);
            setJobPostingCountry(incompleteJob.locationCountry);
            setJobLocation(incompleteJob.location);
            setJobLocationTypeEnumValue(incompleteJob.jobLocationType);
            getJobLocationTypeLabel();
            setLocationSelectedFromSuggests(true);
            setLoading(false);
        }
    }, [incompleteJob]);
    
    async function fetchPageInitialData(){
        await fetchJobAndSetJobCreation();
    }
    
    useEffect(() => {
        handleJobLocationTypeChange()
    }, [jobLocationTypeEnumValue]);

    async function handleJobBasicsSubmit(e: FormEvent) {
        e.preventDefault();
        setExecuteFormValidation(true);
        if (!jobTitle){
            jobTitleInputRef.current?.focus();
            return;
        }
        if (isNanAfterIntParse(numberOfOpenings) || invalidNumberOfOpenings){
            return;
        }
        if (!jobLocation){
            setLocationError("Add an address")
            return;
        }
        if (!locationSelectedFromSuggests){
            setLocationError("We don't recognize this address. Please select address from suggestions window")
            return;
        }
        
        if (incompleteJob && jid){
            await updateIncompleteJob();
        }
        else {
            await createIncompleteJob();
        }
    }
    
    async function createIncompleteJob(){
        try {
            setRequestInProgress(true);
            const createdIncompleteJob : CreateIncompleteJobDTO = {
                jobTitle: jobTitle,
                numberOfOpenings: parseInt(numberOfOpenings),
                language: jobPostLanguage,
                locationCountry : jobPostingCountry,
                jobLocationType : jobLocationTypeEnumValue,
                location: jobLocation,
                
            }
            const jobCreationResponse = await incompleteJobService.startJobCreation(createdIncompleteJob);
            setIncompleteJob(jobCreationResponse);
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
            setRequestInProgress(false);
        }
    }
    
    async function updateIncompleteJob(){
        try {
            setRequestInProgress(true);
            const updatedIncompleteJob: UpdatedIncompleteJobDTO = {
                jobTitle: jobTitle,
                numberOfOpenings: parseInt(numberOfOpenings),
                language: jobPostLanguage,
                locationCountry : jobPostingCountry,
                jobLocationType : jobLocationTypeEnumValue,
                location: jobLocation,
            }
            const retrievedIncompleteJob = await incompleteJobService.updateJobCreation(incompleteJob!.id, updatedIncompleteJob);
            setIncompleteJob(retrievedIncompleteJob);
        }
        catch (error){
            logErrorInfo(error)
        }
        finally {
            setRequestInProgress(false);
        }
    }

    function handleJobLocationTypeChange() {
        if (jobLocation !== incompleteJob?.location){
            setJobLocation("");
        }
        getJobLocationTypeLabel();
    }
    
    function getJobLocationTypeLabel(){
        switch (jobLocationTypeEnumValue) {
            case JobLocationTypes.InPerson:
                setJobLocationFieldLabel("What is the street address for this location?")
                return;
            case JobLocationTypes.GeneralLocation:
                setJobLocationFieldLabel("What is the job location?")
                return;
            case JobLocationTypes.Remote:
                setJobLocationFieldLabel("Your job location will appear as Remote, and we’ll advertise it to people searching for remote work nationwide.")
                setJobLocation("Remote");
                return;
            case JobLocationTypes.OnRoad:
                setJobLocationFieldLabel("What is the operating area for this job?")
                return;
        }
    }

    return (
        loading ? <LoadingPage/> : 
        <>
            {showStreetsAutocomplete && <AutocompleteResultsWindow
                inputFieldRef={locationInputRef}
                windowMaxWidth={"702px"}
                inputValue={jobLocation}
                setInputValue={setJobLocation}
                country={jobPostingCountry}
                showResult={showStreetsAutocomplete}
                setShowResult={setShowStreetsAutocomplete}
                autocompleteWindowType={AutocompleteWindowTypes.streetAddress}
                locationSelected={locationSelectedFromSuggests}
                setLocationSelected={setLocationSelectedFromSuggests}
            />}
            {showCityAutoComplete && <AutocompleteResultsWindow
                inputFieldRef={locationInputRef}
                windowMaxWidth={"702px"}
                inputValue={jobLocation}
                setInputValue={setJobLocation}
                country={jobPostingCountry}
                showResult={showCityAutoComplete}
                setShowResult={setShowCityAutoComplete}
                autocompleteWindowType={AutocompleteWindowTypes.city}
                locationSelected={locationSelectedFromSuggests}
                setLocationSelected={setLocationSelectedFromSuggests}
            />}

            <SelectLanguageDialog
                showDialog={showLanguageDialog}
                setShowDialog={setShowLanguageDialog}
                currentLanguage={jobPostLanguage}
                setCurrentLanguage={setJobPostLanguage}
                currentCountry={jobPostingCountry}
                setCurrentCountry={setJobPostingCountry}
            />
            <div className={"employers-centralized-page-layout"}>
                <PageTitleWithImage imageElement={<JobBasics/>} title={"Add job basics"}/>
                <div className={"emp-form-fb"}>
                    <form className={"emp-form"}>
                        <div className={"mb2rem"}>
                            <span className={"dark-default-text"}>Job post will be in&nbsp;</span>
                            <span className={"dark-default-text bold-text"}>{jobPostLanguage}</span>
                            <span className={"dark-default-text"}>&nbsp;in&nbsp;</span>
                            <span className={"dark-default-text bold-text"}>{jobPostingCountry}</span>
                            <button
                                className={"small-interaction-button dark-blue-color ml1rem"}
                                type={"button"}
                                onClick={() => setShowLanguageDialog(true)}
                            >
                                <FontAwesomeIcon className={"svg1rem"} icon={faPen}/>
                            </button>
                        </div>
                        <div className={"content-separation-line mb2rem"}></div>
                        <CustomInputField
                            fieldLabel={"Job title"}
                            isRequired={true}
                            inputFieldValue={jobTitle}
                            setInputFieldValue={setJobTitle}
                            inputRef={jobTitleInputRef}
                            executeValidation={executeFormValidation}
                            setExecuteValidation={setExecuteFormValidation}
                        />
                        <CustomSelectField
                            fieldLabel={"Number of people to hire for this job"}
                            fieldValue={numberOfOpenings}
                            setFieldValue={setNumberOfOpenings}
                            optionsArr={numberOfOpeningsOptions}
                            isRequired={true}
                            isInvalidSelect={invalidNumberOfOpenings}
                            setIsInvalidSelect={setInvalidNumberOfOpenings}
                            executeValidation={executeFormValidation}
                            setExecuteValidation={setExecuteFormValidation}
                        />
                        <JobLocationTypeSelector
                            jobLocationTypeEnumValue={jobLocationTypeEnumValue}
                            setJobLocationTypeEnumValue={setJobLocationTypeEnumValue}
                        />
                        {jobLocationTypeEnumValue === JobLocationTypes.Remote ?
                            <div className={"info-notify-container blue-notify-container mb15rem"}>
                                <FontAwesomeIcon className={"svg1rem dark-blue-color mr1rem"} icon={faCircleInfo}/>
                                <span className={"dark-small-text"}>{jobLocationFieldLabel}</span>
                            </div>
                            :
                            (jobLocationTypeEnumValue === JobLocationTypes.InPerson ?
                                <LocationCustomInputField
                                    fieldLabel={jobLocationFieldLabel}
                                    inputValue={jobLocation}
                                    setInputValue={setJobLocation}
                                    inputRef={locationInputRef}
                                    isRequired={true}
                                    setShowAutocompleteResults={setShowStreetsAutocomplete}
                                    selectedFromSuggests={locationSelectedFromSuggests}
                                    setSelectedFromSuggests={setLocationSelectedFromSuggests}
                                    executeValidation={executeFormValidation}
                                    setExecuteValidation={setExecuteFormValidation}
                                    customErrorMessage={locationError}
                                    setCustomErrorMessage={setLocationError}/>
                                :
                                <LocationCustomInputField
                                    fieldLabel={jobLocationFieldLabel}
                                    inputValue={jobLocation}
                                    setInputValue={setJobLocation}
                                    inputRef={locationInputRef}
                                    isRequired={true}
                                    setShowAutocompleteResults={setShowCityAutoComplete}
                                    selectedFromSuggests={locationSelectedFromSuggests}
                                    setSelectedFromSuggests={setLocationSelectedFromSuggests}
                                    executeValidation={executeFormValidation}
                                    setExecuteValidation={setExecuteFormValidation}
                                    customErrorMessage={locationError}
                                    setCustomErrorMessage={setLocationError}/>
                            )
                        }
                        <button
                            className="blue-button br-corner-button min-continue-button-size"
                            type={'submit'}
                            onClick={handleJobBasicsSubmit}
                        >
                            {requestInProgress ? <WhiteLoadingSpinner/>
                                :
                                <>
                                    <span>Continue</span>
                                    <FontAwesomeIcon className={'svg1rem ml05rem'} icon={faArrowRightLong}/>
                                </>
                            }
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddJobBasicsComponent;
