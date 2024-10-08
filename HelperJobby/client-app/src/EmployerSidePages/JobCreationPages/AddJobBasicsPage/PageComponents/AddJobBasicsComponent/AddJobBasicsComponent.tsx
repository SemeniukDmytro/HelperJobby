import React, {FC, FormEvent, useEffect, useRef, useState} from 'react';
import './AddJobBasicsComponent.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong, faPen} from "@fortawesome/free-solid-svg-icons";
import SelectLanguageDialog from "../SelectLanguageDialog/SelectLanguageDialog";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";
import CustomSelectField from "../../../../../Components/CustomSelectField/CustomSelectField";
import {numberOfOpeningsOptions} from "../../../../../AppConstData/NumberOfOpeningsOptions";
import AutocompleteResultsWindow
    from "../../../../../JobSeekerSidePages/EditContactInfoPage/PageComponents/AutocompleteResultsWindow/AutocompleteResultsWindow";
import {useNavigate, useParams} from "react-router-dom";
import PageTitleWithImage from "../../../../../EmployersSideComponents/PageTitleWithImage/PageTitleWithImage";
import JobBasics from "../../../../../Components/Icons/JobBasics";
import WhiteLoadingSpinner from "../../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {AutocompleteWindowTypes} from "../../../../../enums/utilityEnums/AutocompleteWindowTypes";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";
import {CreateIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/CreateIncompleteJobDTO";
import {isNanAfterIntParse} from "../../../../../utils/validationLogic/numbersValidators";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {JobLocationTypes} from "../../../../../enums/modelDataEnums/JobLocationTypes";
import JobLocationSelectionComponent
    from "../../../SharedComponents/JobLocationSelectionComponent/JobLocationSelectionComponent";
import employerPagesPaths from "../../../../../AppRoutes/Paths/EmployerPagesPaths";
import {JobCreationStates} from "../../../../../enums/utilityEnums/JobCreationStates";
import useCurrentEmployerJob from "../../../../../hooks/contextHooks/useCurrentEmployerJob";
import {useJobLocationType} from "../../../../../hooks/comnonentSharedHooks/useJobLocationType";
import {useJobLoaderToSetCurrentJob} from "../../../../../hooks/comnonentSharedHooks/useJobLoaderToSetCurrentJob";


interface AddJobBasicsComponentProps {
}

const AddJobBasicsComponent: FC<AddJobBasicsComponentProps> = () => {
    const {currentJob, setCurrentJob} = useCurrentEmployerJob();
    const [jobPostLanguage, setJobPostLanguage] = useState("English");
    const [jobPostingCountry, setJobPostingCountry] = useState("Canada");
    const [showLanguageDialog, setShowLanguageDialog] = useState(false);
    const [jobTitle, setJobTitle] = useState("");
    const jobTitleInputRef = useRef<HTMLInputElement>(null);
    const [numberOfOpenings, setNumberOfOpenings] = useState("");
    const [invalidNumberOfOpenings, setInvalidNumberOfOpenings] = useState(true);
    const [jobLocationTypeEnumValue, setJobLocationTypeEnumValue] = useState(JobLocationTypes.InPerson);
    const [inPersonJobLocation, setInPersonJobLocation] = useState("");
    const [generalJobLocation, setGeneralJobLocation] = useState("");
    const [remoteJobLocation, setRemoteJobLocation] = useState("");
    const [onRoadJobLocation, setOnRoadJobLocation] = useState("");
    const locationInputRef = useRef<HTMLInputElement>(null);
    const [executeFormValidation, setExecuteFormValidation] = useState(false);
    const [showStreetsAutocomplete, setShowStreetsAutocomplete] = useState(false);
    const [showCityAutoComplete, setShowCitiesAutoComplete] = useState(false);
    const [locationSelectedFromSuggests, setLocationSelectedFromSuggests] = useState(false);
    const [locationError, setLocationError] = useState("");
    const {getCurrentJobLocationInputProp} = useJobLocationType(inPersonJobLocation, setInPersonJobLocation,
        generalJobLocation, setGeneralJobLocation,
        remoteJobLocation, setRemoteJobLocation,
        onRoadJobLocation, setOnRoadJobLocation);

    const navigate = useNavigate();
    const [requestInProgress, setRequestInProgress] = useState(false);
    const incompleteJobService = new IncompleteJobService();
    const [loading, setLoading] = useState(true);
    const {jobId} = useParams<{ jobId: string }>();
    const {fetchJobAndSetJobCreation} = useJobLoaderToSetCurrentJob(jobId ? parseInt(jobId) : 0, currentJob, setCurrentJob, JobCreationStates.incompleteJob);
    const [isSettingFromIncompleteJob, setIsSettingFromIncompleteJob] = useState(false);

    useEffect(() => {
        if (jobId) {
            fetchPageInitialData();
        }
    }, []);
    useEffect(() => {
        if (!jobId) {
            setLoading(false);
            return;
        }
        if (currentJob) {
            setIsSettingFromIncompleteJob(true);
            setJobTitle(currentJob.jobTitle);
            setNumberOfOpenings(currentJob.numberOfOpenings.toString())
            setJobPostLanguage(currentJob.language);
            setJobPostingCountry(currentJob.locationCountry);
            getCurrentJobLocationInputProp(currentJob.jobLocationType).setInputValue(currentJob.location);
            setJobLocationTypeEnumValue(currentJob.jobLocationType);
            setLocationSelectedFromSuggests(true);
            setInvalidNumberOfOpenings(false);
            setLoading(false);
        }
    }, [currentJob]);

    async function fetchPageInitialData() {
        await fetchJobAndSetJobCreation();
    }

    useEffect(() => {
        if (isSettingFromIncompleteJob) {
            setIsSettingFromIncompleteJob(false);
            return;
        }

        setInPersonJobLocation("");
        setOnRoadJobLocation("");
        setGeneralJobLocation("");
        setLocationSelectedFromSuggests(false);
    }, [jobPostingCountry]);

    async function handleJobBasicsSubmit(e: FormEvent) {
        e.preventDefault();
        setExecuteFormValidation(true);
        if (!jobTitle || jobTitle.length > 100) {
            jobTitleInputRef.current?.focus();
            return;
        }
        if (isNanAfterIntParse(numberOfOpenings) || invalidNumberOfOpenings) {
            return;
        }
        if (!getCurrentJobLocationInputProp(jobLocationTypeEnumValue).inputValue) {
            setLocationError("Add an address")
            return;
        }
        if (!locationSelectedFromSuggests && jobLocationTypeEnumValue != JobLocationTypes.Remote) {
            setLocationError("We don't recognize this address. Please select address from suggestions window")
            return;
        }
        if (getCurrentJobLocationInputProp(jobLocationTypeEnumValue).inputValue.length > 100) {
            return;
        }
        if (currentJob && jobId) {
            await updateIncompleteJob();
        } else {
            await createIncompleteJob();
        }
    }

    async function createIncompleteJob() {
        try {
            setRequestInProgress(true);
            const createdIncompleteJob: CreateIncompleteJobDTO = {
                jobTitle: jobTitle,
                numberOfOpenings: parseInt(numberOfOpenings),
                language: jobPostLanguage,
                locationCountry: jobPostingCountry,
                jobLocationType: jobLocationTypeEnumValue,
                location: getCurrentJobLocationInputProp(jobLocationTypeEnumValue).inputValue,

            }
            const jobCreationResponse = await incompleteJobService.startJobCreation(createdIncompleteJob);
            setCurrentJob(jobCreationResponse);
            navigate(`${employerPagesPaths.JOB_DETAILS}/${jobCreationResponse.id}`)
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setRequestInProgress(false);
        }
    }

    async function updateIncompleteJob() {
        try {
            setRequestInProgress(true);
            const updatedIncompleteJob: UpdatedIncompleteJobDTO = {
                jobTitle: jobTitle,
                numberOfOpenings: parseInt(numberOfOpenings),
                language: jobPostLanguage,
                locationCountry: jobPostingCountry,
                jobLocationType: jobLocationTypeEnumValue,
                location: getCurrentJobLocationInputProp(jobLocationTypeEnumValue).inputValue,
            }
            const retrievedIncompleteJob = await incompleteJobService.updateJobCreation(currentJob!.id, updatedIncompleteJob);
            setCurrentJob(retrievedIncompleteJob);
            navigate(`${employerPagesPaths.JOB_DETAILS}/${retrievedIncompleteJob.id}`)
        } catch (error) {
            logErrorInfo(error)
        } finally {
            setRequestInProgress(false);
        }
    }


    return (
        loading ? <LoadingPage/> :
            <>
                {showStreetsAutocomplete && <AutocompleteResultsWindow
                    inputFieldRef={locationInputRef}
                    windowMaxWidth={"702px"}
                    inputValue={getCurrentJobLocationInputProp(jobLocationTypeEnumValue).inputValue}
                    setInputValue={getCurrentJobLocationInputProp(jobLocationTypeEnumValue).setInputValue}
                    country={jobPostingCountry}
                    showResult={showStreetsAutocomplete}
                    setShowResult={setShowStreetsAutocomplete}
                    autocompleteWindowType={AutocompleteWindowTypes.streetAddress}
                    locationSelected={locationSelectedFromSuggests}
                    setLocationSelected={setLocationSelectedFromSuggests}
                    fullLocationResult={true}
                />}
                {showCityAutoComplete && <AutocompleteResultsWindow
                    inputFieldRef={locationInputRef}
                    windowMaxWidth={"702px"}
                    inputValue={getCurrentJobLocationInputProp(jobLocationTypeEnumValue).inputValue}
                    setInputValue={getCurrentJobLocationInputProp(jobLocationTypeEnumValue).setInputValue}
                    country={jobPostingCountry}
                    showResult={showCityAutoComplete}
                    setShowResult={setShowCitiesAutoComplete}
                    autocompleteWindowType={AutocompleteWindowTypes.city}
                    locationSelected={locationSelectedFromSuggests}
                    setLocationSelected={setLocationSelectedFromSuggests}
                    fullLocationResult={true}
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
                                <span className={"semi-dark-default-text"}>Job post will be in&nbsp;</span>
                                <span className={"semi-dark-default-text bold-text"}>{jobPostLanguage}</span>
                                <span className={"semi-dark-default-text"}>&nbsp;in&nbsp;</span>
                                <span className={"semi-dark-default-text bold-text"}>{jobPostingCountry}</span>
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
                                maxInputLength={100}
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
                            <JobLocationSelectionComponent
                                jobLocationTypeEnumValue={jobLocationTypeEnumValue}
                                setJobLocationTypeEnumValue={setJobLocationTypeEnumValue}
                                locationInputRef={locationInputRef}
                                inPersonJobLocation={inPersonJobLocation}
                                setInPersonJobLocation={setInPersonJobLocation}
                                generalJobLocation={generalJobLocation}
                                setGeneralJobLocation={setGeneralJobLocation}
                                remoteJobLocation={remoteJobLocation}
                                setRemoteJobLocation={setRemoteJobLocation}
                                onRoadJobLocation={onRoadJobLocation}
                                setOnRoadJobLocation={setOnRoadJobLocation}
                                setShowStreetsAutocomplete={setShowStreetsAutocomplete}
                                setShowCitiesAutocomplete={setShowCitiesAutoComplete}
                                executeFormValidation={executeFormValidation}
                                setExecuteFormValidation={setExecuteFormValidation}
                                locationSelectedFromSuggests={locationSelectedFromSuggests}
                                setLocationSelectedFromSuggests={setLocationSelectedFromSuggests}
                                locationError={locationError}
                                setLocationError={setLocationError}
                                includeWindowScroll={true}
                            />

                            <button
                                className="blue-button br-corner-button min-8chr-arrow-btn-width"
                                type={'submit'}
                                disabled={requestInProgress}
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
