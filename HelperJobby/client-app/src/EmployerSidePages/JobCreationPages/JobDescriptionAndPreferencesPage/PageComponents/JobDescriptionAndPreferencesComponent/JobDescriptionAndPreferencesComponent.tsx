import React, {FC, FormEvent, useEffect, useRef, useState} from 'react';
import './JobDescriptionAndPreferencesComponent.scss';
import PageTitleWithImage from "../../../../../EmployersSideComponents/PageTitleWithImage/PageTitleWithImage";
import TeamAnalysis from "../../../../../Components/Icons/TeamAnalysis";
import {resumeRequirementOptionsMapData} from "../../../../../AppConstData/ResumeRequirements";
import JobCreateNavigationButtons
    from "../../../SharedComponents/JobCreateNavigationButtons/JobCreateNavigationButtons";
import {useNavigate, useParams} from "react-router-dom";
import employerPagesPaths from "../../../../../AppRoutes/Paths/EmployerPagesPaths";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";
import {IsValidEmail, validatePhoneNumber} from "../../../../../utils/validationLogic/authFormValidators";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import {isValidDescription} from "../../../../../utils/validationLogic/isValidDescription";
import CommunicationPreferencesBlock
    from "../../../SharedComponents/CommunicationPreferencesBlock/CommunicationPreferencesBlock";
import {resumeRequirementOptionsEnumToStringMap} from "../../../../../utils/convertLogic/enumToStringConverter";
import {JobCreationStates} from "../../../../../enums/utilityEnums/JobCreationStates";
import {useEmployer} from "../../../../../hooks/contextHooks/useEmployer";
import useCurrentEmployerJob from "../../../../../hooks/contextHooks/useCurrentEmployerJob";
import {useJobLoaderToSetCurrentJob} from "../../../../../hooks/comnonentSharedHooks/useJobLoaderToSetCurrentJob";
import DOMPurify from "dompurify";
import DescriptionInputWindow from "../../../../../Components/DescriptionInputWindow/DescriptionInputWindow";

interface JobDescriptionAndPreferencesComponentProps {
}

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

    const {currentJob, setCurrentJob} = useCurrentEmployerJob();
    const {jobId} = useParams<{ jobId: string }>();
    const [loading, setLoading] = useState(false);
    const {fetchJobAndSetJobCreation} = useJobLoaderToSetCurrentJob(jobId ? parseInt(jobId) : 0, currentJob, setCurrentJob, JobCreationStates.incompleteJob);
    const navigate = useNavigate();
    const [requestInProgress, setRequestInProgress] = useState(false);
    const incompleteJobService = new IncompleteJobService();

    useEffect(() => {
        fetchInitialPageData()
    }, []);

    useEffect(() => {
        if (currentJob) {
            if (descriptionInputRef.current) {
                const sanitizedDescription = DOMPurify.sanitize(currentJob.description || "", {
                    ALLOWED_TAGS: ['b', 'i', 'br', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'blockquote'],
                });
                descriptionInputRef.current.innerHTML = sanitizedDescription;
                setJobDescription(sanitizedDescription);
            }
            if (currentJob.contactPhoneNumber) {
                setIsContactPhoneAvailable(true);
                setContactPhoneNumber(currentJob.contactPhoneNumber);
            }
            if (currentJob.contactEmail) {
                setContactEmail(currentJob.contactEmail);
            }
            if (currentJob.resumeRequired) {
                setIsResumeRequired(resumeRequirementOptionsEnumToStringMap(currentJob.resumeRequired));
            }

            setLoading(false);
        }
    }, [currentJob]);

    async function fetchInitialPageData() {
        await fetchJobAndSetJobCreation();
    }

    async function handleDescriptionAndPreferencesSubmit(e: FormEvent) {
        e.preventDefault();
        setExecuteFormValidation(true);
        if (!isValidDescription(jobDescription, setDescriptionError, setIsInvalidDescription)) {
            descriptionInputRef.current?.focus();
            return;

        }
        if (!IsValidEmail(contactEmail)) {
            setEmailError("Invalid email provided");
            emailInputRef.current?.focus();
            return;
        }
        if (contactPhoneNumber) {
            const isInValidPhoneNumber = validatePhoneNumber(contactPhoneNumber);
            if (isInValidPhoneNumber) {
                setPhoneError(isInValidPhoneNumber);
                phoneNumberInputRef.current?.focus();
                return;
            }
        }
        try {
            setRequestInProgress(true);
            const updatedIncompleteJob: UpdatedIncompleteJobDTO = {
                description: jobDescription,
                contactEmail: contactEmail,
                contactPhoneNumber: isContactPhoneAvailable ? contactPhoneNumber : "",
                resumeRequired: resumeRequirementOptionsMapData.find(rro => rro.stringValue == isResumeRequired)?.enumValue
            }
            const retrievedIncompleteJob = await incompleteJobService.updateJobCreation(parseInt(jobId!), updatedIncompleteJob);
            setCurrentJob(retrievedIncompleteJob);
            navigate(`${employerPagesPaths.REVIEW_JOB_PAGE}/${jobId}`)
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setRequestInProgress(false);
        }
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
                        <DescriptionInputWindow
                            jobDescription={jobDescription}
                            setJobDescription={setJobDescription}
                            descriptionInputRef={descriptionInputRef}
                            descriptionError={descriptionError}
                            setDescriptionError={setDescriptionError}
                            isInvalidDescription={isInvalidDescription}
                            setIsInvalidDescription={setIsInvalidDescription}
                        />
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