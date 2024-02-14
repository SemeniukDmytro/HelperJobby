import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './ChangeJobApplicationMethodDialogContent.scss';
import CommunicationPreferencesBlock from "../CommunicationPreferencesBlock/CommunicationPreferencesBlock";
import {useEmployer} from "../../../../hooks/useEmployer";
import useJobCreation from "../../../../hooks/useJobCreation";
import {resumeRequirementOptionsEnumToStringMap} from "../../../../utils/convertLogic/enumToStringConverter";
import {resumeRequirementOptionsMapData} from "../../../../AppConstData/ResumeRequirements";
import {IncompleteJobService} from "../../../../services/incompleteJobService";
import {IsValidEmail, validatePhoneNumber} from "../../../../utils/validationLogic/authFormValidators";
import {UpdatedIncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";

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
    const {incompleteJob, setIncompleteJob} = useJobCreation();
    const [contactEmail, setContactEmail] = useState(incompleteJob?.contactEmail || employer!.email);
    const [emailError, setEmailError] = useState("");
    const emailInputRef = useRef<HTMLInputElement>(null);
    const [contactPhoneNumber, setContactPhoneNumber] =
        useState(incompleteJob?.contactPhoneNumber || employer!.contactNumber);
    const phoneNumberInputRef = useRef<HTMLInputElement>(null);
    const [phoneError, setPhoneError] = useState("");
    const [executeFormValidation, setExecuteFormValidation] = useState(false);
    const [isContactPhoneAvailable, setIsContactPhoneAvailable] =
        useState(incompleteJob?.contactPhoneNumber !== undefined);
    const [isResumeRequired, setIsResumeRequired] =
        useState(incompleteJob?.resumeRequired ?  resumeRequirementOptionsEnumToStringMap(incompleteJob?.resumeRequired)
            : resumeRequirementOptionsMapData[0].stringValue);
    
    const incompleteJobService = new IncompleteJobService();

    useEffect(() => {
        if (showDialog){
            setContactEmail(incompleteJob?.contactEmail || employer!.email);
            setEmailError("");
            setContactPhoneNumber(incompleteJob?.contactPhoneNumber || employer!.contactNumber);
            setPhoneError("");
            setIsResumeRequired(incompleteJob?.resumeRequired ?  resumeRequirementOptionsEnumToStringMap(incompleteJob?.resumeRequired)
                : resumeRequirementOptionsMapData[0].stringValue);
            setIsContactPhoneAvailable(incompleteJob?.contactPhoneNumber !== undefined);
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
            const updatedIncompleteJob : UpdatedIncompleteJobDTO = {
                contactEmail : contactEmail,
                contactPhoneNumber : isContactPhoneAvailable ? contactPhoneNumber : "",
                resumeRequired : resumeRequirementOptionsMapData.find(rro => rro.stringValue == isResumeRequired)?.enumValue
            }
            const  retrievedIncompleteJob = await incompleteJobService.updateJobCreation(incompleteJob!.id, updatedIncompleteJob);
            setIncompleteJob(retrievedIncompleteJob);
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
