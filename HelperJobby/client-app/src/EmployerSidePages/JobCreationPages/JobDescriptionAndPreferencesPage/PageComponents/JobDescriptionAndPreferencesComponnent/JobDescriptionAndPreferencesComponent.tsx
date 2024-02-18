import React, {FC, FormEvent, useEffect, useRef, useState} from 'react';
import './JobDescriptionAndPreferencesComponnent.scss';
import PageTitleWithImage from "../../../../../EmployersSideComponents/PageTitleWithImage/PageTitleWithImage";
import TeamAnalysis from "../../../../../Components/Icons/TeamAnalysis";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";
import {useEmployer} from "../../../../../hooks/useEmployer";
import {resumeRequirementOptionsMapData} from "../../../../../AppConstData/ResumeRequirements";
import JobCreateNavigationButtons
    from "../../../SharedComponents/JobCreateNavigationButtons/JobCreateNavigationButtons";
import {useNavigate, useParams} from "react-router-dom";
import employerPagesPaths from "../../../../../AppRoutes/Paths/EmployerPagesPaths";
import CustomSelectWindow from "../../../../../EmployersSideComponents/CustomSelectWindow/CustomSelectWindow";
import useJobCreation from "../../../../../hooks/useJobCreation";
import {
    useJobLoaderForSettingCurrentIncompleteJob
} from "../../../../../hooks/useJobLoaderForSettingCurrentIncompleteJob";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";
import {IsValidEmail, validatePhoneNumber} from "../../../../../utils/validationLogic/authFormValidators";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import {isValidDescription} from "../../../../../utils/validationLogic/isValidDescription";
import CommunicationPreferencesBlock
    from "../../../SharedComponents/CommunicationPreferencesBlock/CommunicationPreferencesBlock";
import {resumeRequirementOptionsEnumToStringMap} from "../../../../../utils/convertLogic/enumToStringConverter";

interface JobDescriptionAndPreferencesComponentProps {}

const JobDescriptionAndPreferencesComponent: FC<JobDescriptionAndPreferencesComponentProps> = () => {
    const {employer} = useEmployer();
    const [jobDescription, setJobDescription] = useState("");
    const descriptionInputRef = useRef<HTMLInputElement>(null);
    const [isInvalidDescription, setIsInvalidDescription] = useState(false);
    const [descriptionError, setDescriptionError] = useState("");
    const [contactEmail, setContactEmail] = useState(employer!.email);
    const [emailError, setEmailError] = useState("");
    const emailInputRef = useRef<HTMLInputElement>(null);
    const [contactPhoneNumber, setContactPhoneNumber] = useState(employer!.contactNumber);
    const phoneNumberInputRef = useRef<HTMLInputElement>(null);
    const [phoneError, setPhoneError] = useState("");
    const [executeFormValidation, setExecuteFormValidation] = useState(false);
    const [isContactPhoneAvailable, setIsContactPhoneAvailable] = useState(false);
    const [isResumeRequired, setIsResumeRequired] = useState(resumeRequirementOptionsMapData[0].stringValue);

    const {incompleteJob, setIncompleteJob} = useJobCreation();
    const {jobId} = useParams<{jobId : string}>();
    const {fetchJobAndSetJobCreation} =  useJobLoaderForSettingCurrentIncompleteJob(jobId ? parseInt(jobId) : 0, incompleteJob, setIncompleteJob);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [requestInProgress, setRequestInProgress] = useState(false);
    const incompleteJobService = new IncompleteJobService();

    useEffect(() => {
        fetchInitialPageData()
    }, []);

    useEffect(() => {
        if (incompleteJob){
            if (descriptionInputRef.current){
                descriptionInputRef.current.innerText = incompleteJob.description || "";
                setJobDescription(incompleteJob.description || "");
            }
            if (incompleteJob.contactPhoneNumber){
                setIsContactPhoneAvailable(true);
                setContactPhoneNumber(incompleteJob.contactPhoneNumber);
            }
            if (incompleteJob.contactEmail){
                setContactEmail(incompleteJob.contactEmail);
            }
            if (incompleteJob.resumeRequired){
                setIsResumeRequired(resumeRequirementOptionsEnumToStringMap(incompleteJob.resumeRequired));
            }
            
            setLoading(false);
        }
    }, [incompleteJob]);

    async function fetchInitialPageData(){
        await fetchJobAndSetJobCreation();
    }
    
    function changeDescriptionValue(event: React.FormEvent<HTMLDivElement>) {
        isValidDescription(event.currentTarget.innerHTML, setDescriptionError, setIsInvalidDescription);
        setJobDescription(event.currentTarget.innerHTML);
    }
    async function handleDescriptionAndPreferencesSubmit(e : FormEvent) {
        e.preventDefault();
        setExecuteFormValidation(true);
        if (!isValidDescription(jobDescription, setDescriptionError, setIsInvalidDescription)){
            descriptionInputRef.current?.focus();
            return;
            
        }
        if (!IsValidEmail(contactEmail)){
            setEmailError("Invalid email provided");
            emailInputRef.current?.focus();
            return;
        }
        if (contactPhoneNumber){
            const isInValidPhoneNumber = validatePhoneNumber(contactPhoneNumber);
            if (isInValidPhoneNumber){
                setPhoneError(isInValidPhoneNumber);
                phoneNumberInputRef.current?.focus();
                return;
            }
        }
        try {
            setRequestInProgress(true);
            const updatedIncompleteJob : UpdatedIncompleteJobDTO = {
                description : jobDescription,
                contactEmail : contactEmail,
                contactPhoneNumber : isContactPhoneAvailable ? contactPhoneNumber : "",
                resumeRequired : resumeRequirementOptionsMapData.find(rro => rro.stringValue == isResumeRequired)?.enumValue
            }
            const  retrievedIncompleteJob = await incompleteJobService.updateJobCreation(parseInt(jobId!), updatedIncompleteJob);
            setIncompleteJob(retrievedIncompleteJob);
            navigate(`${employerPagesPaths.REVIEW_JOB_PAGE}/${jobId}`)
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
            setRequestInProgress(false);
        }
    }

    function handlePaste(event: React.ClipboardEvent<HTMLDivElement>) {
        event.preventDefault();

        const text = event.clipboardData.getData('text/plain');

        document.execCommand('insertText', false, text);

        isValidDescription(text, setDescriptionError, setIsInvalidDescription);
        setJobDescription(text);
    }

    function navigateToPreviousPage() {
        navigate(`${employerPagesPaths.COMPENSATION_DETAILS}/${jobId}`);
    }

    return (
        loading ? <LoadingPage/> :
        <div className={"employers-centralized-page-layout"}>
            <PageTitleWithImage imageElement={<TeamAnalysis/>}
                                title={"Add description and set preferences"}/>
            <div className={"emp-form-fb"}>
                <form className={"emp-form"}>
                    <div className={"description-container"}>
                        <div
                            className={`small-title horizontal-title ${isInvalidDescription ? "error-text" : ""}`}
                            style={{marginBottom: "0.25rem"}}
                        >
                            <span>Job description</span>
                            <span className={"error-text"}>&nbsp;*</span>
                        </div>
                        <div style={{position: "relative", marginTop: "0.5rem"}}>
                            <div
                                role={"textbox"}
                                contentEditable={true}
                                ref={descriptionInputRef}
                                className={`description-input ${isInvalidDescription ? "red-field-focus" : ""}`}
                                onInput={changeDescriptionValue}
                                onBlur={() => isValidDescription(jobDescription, setDescriptionError, setIsInvalidDescription)}
                                onPaste={handlePaste}
                            >
                            </div>
                            <div className={`description-focused ${isInvalidDescription ? "red-field-focus" : ""}`}></div>
                        </div>
                        <div className={"mt15rem mb1rem"}>
                            <a className={"bold-navigation-link"}>Upload a PDF or DOCX</a>
                        </div>
                        {isInvalidDescription &&
                            <div className={"error-box"}>
                                <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                                <span className={"error-text"}>{descriptionError}</span>
                            </div>
                        }
                    </div>
                    <div className={"content-separation-line mt2rem mb3rem"}></div>
                    <CommunicationPreferencesBlock 
                        contactEmail={contactEmail}
                        setContactEmail={setContactEmail}
                        emailInputRef={emailInputRef}
                        emailError={emailError}
                        setEmailError={setEmailError}
                        executeFormValidation={executeFormValidation}
                        setExecuteFormValidation={setExecuteFormValidation}
                        isContactPhoneAvailable={isContactPhoneAvailable}
                        setIsContactPhoneAvailable={setIsContactPhoneAvailable}
                        contactPhoneNumber={contactPhoneNumber}
                        setContactPhoneNumber={setContactPhoneNumber}
                        phoneNumberInputRef={phoneNumberInputRef}
                        phoneError={phoneError}
                        setPhoneError={setPhoneError}
                        isResumeRequired={isResumeRequired}
                        setIsResumeRequired={setIsResumeRequired}
                        includeWindowScrollForSelect={true}/>
                    <JobCreateNavigationButtons
                        requestInProgress={requestInProgress}
                        backButtonOnClick={navigateToPreviousPage}
                        nextPageButtonClick={handleDescriptionAndPreferencesSubmit}
                    />
                </form>
            </div>
        </div>
    )
}

export default JobDescriptionAndPreferencesComponent;
