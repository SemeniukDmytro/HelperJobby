import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './EditApplicationMethodDialog.scss';
import useJobCreation from "../../../../../hooks/useJobCreation";
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import {resumeRequirementOptionsMapData} from "../../../../../AppConstData/ResumeRequirements";
import {useEmployer} from "../../../../../hooks/useEmployer";
import {resumeRequirementOptionsEnumToStringMap} from "../../../../../utils/convertLogic/enumToStringConverter";
import CommunicationPreferencesBlock
    from "../../../SharedComponents/CommunicationPreferencesBlock/CommunicationPreferencesBlock";
import {IsValidEmail, validatePhoneNumber} from "../../../../../utils/validationLogic/authFormValidators";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";

interface EditApplicationMethodDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
}

const EditApplicationMethodDialog: FC<EditApplicationMethodDialogProps> = ({
                                                                               showDialog,
                                                                               setShowDialog
                                                                           }) => {
    const {employer} = useEmployer();
    const {incompleteJob, setIncompleteJob} = useJobCreation();
    const [requestInProgress, setRequestInProgress] = useState(false);
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
            setContactPhoneNumber("");
            setIsResumeRequired(incompleteJob?.resumeRequired ?  resumeRequirementOptionsEnumToStringMap(incompleteJob?.resumeRequired)
                : resumeRequirementOptionsMapData[0].stringValue);
            setIsContactPhoneAvailable(incompleteJob?.contactPhoneNumber !== undefined);
        }
    }, [showDialog]);

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
            setShowDialog(false)
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
            setRequestInProgress(false);
        }
    }


    return (
        <EditJobPostDialog
            showDialog={showDialog}
            setShowDialog={setShowDialog}
            requestInProgress={requestInProgress}
            executeJobEditing={editApplicationMethod}>
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
        </EditJobPostDialog>
    )
}

export default EditApplicationMethodDialog;
