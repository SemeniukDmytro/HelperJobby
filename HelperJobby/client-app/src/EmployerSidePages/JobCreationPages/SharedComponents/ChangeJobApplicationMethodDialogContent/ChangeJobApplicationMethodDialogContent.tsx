import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './ChangeJobApplicationMethodDialogContent.scss';
import CommunicationPreferencesBlock from "../CommunicationPreferencesBlock/CommunicationPreferencesBlock";
import {resumeRequirementOptionsEnumToStringMap} from "../../../../utils/convertLogic/enumToStringConverter";
import {resumeRequirementOptionsMapData} from "../../../../AppConstData/ResumeRequirements";
import {IncompleteJobService} from "../../../../services/incompleteJobService";
import {IsValidEmail, validatePhoneNumber} from "../../../../utils/validationLogic/authFormValidators";
import {UpdatedIncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {JobCreationStates} from "../../../../enums/utilityEnums/JobCreationStates";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {UpdatedJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedJobDTO";
import {JobService} from "../../../../services/jobService";
import {useEmployer} from "../../../../hooks/contextHooks/useEmployer";
import useCurrentEmployerJob from "../../../../hooks/contextHooks/useCurrentEmployerJob";

interface ChangeJobApplicationMethodDialogContentProps {
    showDialog : boolean;
    setShowDialog? : Dispatch<SetStateAction<boolean>>;
    setRequestInProgress : Dispatch<SetStateAction<boolean>>;
    setEditFunction : Dispatch<SetStateAction<() => void>>;
}

const ChangeJobApplicationMethodDialogContent: FC<ChangeJobApplicationMethodDialogContentProps> = ({
    showDialog,
    setRequestInProgress,
    setEditFunction,
    setShowDialog
                                                                                                   }) => {
    const {employer} = useEmployer();
    const {currentJob, setCurrentJob, jobCreationState} = useCurrentEmployerJob();
    const [contactEmail, setContactEmail] = useState(currentJob?.contactEmail || employer!.email);
    const [emailError, setEmailError] = useState("");
    const emailInputRef = useRef<HTMLInputElement>(null);
    const [contactPhoneNumber, setContactPhoneNumber] =
        useState(currentJob?.contactPhoneNumber || employer!.contactNumber);
    const phoneNumberInputRef = useRef<HTMLInputElement>(null);
    const [phoneError, setPhoneError] = useState("");
    const [executeFormValidation, setExecuteFormValidation] = useState(false);
    const [isContactPhoneAvailable, setIsContactPhoneAvailable] =
        useState(currentJob?.contactPhoneNumber !== undefined);
    const [isResumeRequired, setIsResumeRequired] =
        useState(currentJob?.resumeRequired ?  resumeRequirementOptionsEnumToStringMap(currentJob?.resumeRequired)
            : resumeRequirementOptionsMapData[0].stringValue);
    
    const incompleteJobService = new IncompleteJobService();
    const jobService = new JobService();

    useEffect(() => {
        if (showDialog){
            setContactEmail(currentJob?.contactEmail || employer!.email);
            setEmailError("");
            setContactPhoneNumber(currentJob?.contactPhoneNumber || employer!.contactNumber);
            setPhoneError("");
            setIsResumeRequired(currentJob?.resumeRequired ?  resumeRequirementOptionsEnumToStringMap(currentJob?.resumeRequired)
                : resumeRequirementOptionsMapData[0].stringValue);
            setIsContactPhoneAvailable(currentJob?.contactPhoneNumber !== undefined);
        }
    }, [showDialog]);

    useEffect(() => {
        setEditFunction(() => editApplicationMethod);
    }, [contactEmail, contactPhoneNumber, isResumeRequired]);
    

    async function editApplicationMethod() {
        setExecuteFormValidation(true);

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
            if (jobCreationState == JobCreationStates.incompleteJob){
                const updatedIncompleteJob : UpdatedIncompleteJobDTO = {
                    ...currentJob,
                    contactEmail : contactEmail,
                    contactPhoneNumber : isContactPhoneAvailable ? contactPhoneNumber : "",
                    resumeRequired : resumeRequirementOptionsMapData.find(rro => rro.stringValue == isResumeRequired)?.enumValue
                }
                const retrievedIncompleteJob = await incompleteJobService.updateJobCreation(currentJob!.id, updatedIncompleteJob);
                setCurrentJob(retrievedIncompleteJob);
            }
            else {
                const job = currentJob as JobDTO;
                const updatedJob: UpdatedJobDTO = {
                    ...job,
                    contactEmail : contactEmail,
                    contactPhoneNumber : isContactPhoneAvailable ? contactPhoneNumber : "",
                    resumeRequired : resumeRequirementOptionsMapData.find(rro => rro.stringValue == isResumeRequired)!.enumValue
                };
                const retrievedJob = await jobService.putJob(currentJob!.id, updatedJob);
                setCurrentJob(retrievedJob);
            }
            setShowDialog && setShowDialog(false);
        }
        catch (err){
            logErrorInfo(err);
        }
        finally {
            setRequestInProgress(false);
        }
    }
    
    return (
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
            includeWindowScrollForSelect={false}
        />
    )
}

export default ChangeJobApplicationMethodDialogContent;
