import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './EditContactEmailDialog.scss';
import {useEmployer} from "../../../../../hooks/useEmployer";
import useJobCreation from "../../../../../hooks/useJobCreation";
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import {IsValidEmail, validatePhoneNumber} from "../../../../../utils/validationLogic/authFormValidators";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {resumeRequirementOptionsMapData} from "../../../../../AppConstData/ResumeRequirements";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";

interface EditContactEmailDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>
}

const EditContactEmailDialog: FC<EditContactEmailDialogProps> = ({
                                                                     showDialog,
                                                                     setShowDialog
                                                                 }) => {
    const {employer} = useEmployer();
    const {incompleteJob, setIncompleteJob} = useJobCreation();
    const [requestInProgress, setRequestInProgress] = useState(false);
    const [contactEmail, setContactEmail] = useState(incompleteJob?.contactEmail || employer!.email);
    const [emailError, setEmailError] = useState("");
    const emailInputRef = useRef<HTMLInputElement>(null);
    const [executeFormValidation, setExecuteFormValidation] = useState(false);
    const incompleteJobService = new IncompleteJobService();

    useEffect(() => {
        if (showDialog){
            setContactEmail(incompleteJob?.contactEmail || employer!.email);
            setEmailError("");
        }
    }, [showDialog]);

    async function editContactEmail() {
        setExecuteFormValidation(true);

        if (!IsValidEmail(contactEmail)){
            setEmailError("Invalid email provided");
            emailInputRef.current?.focus();
            return;
        }
        
        try {
            setRequestInProgress(true);
            const updatedIncompleteJob : UpdatedIncompleteJobDTO = {
                contactEmail : contactEmail,
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
            executeJobEditing={editContactEmail}>
            <CustomInputField
                fieldLabel={"Email for job seekers to contact with you"}
                isRequired={true}
                inputFieldValue={contactEmail}
                setInputFieldValue={setContactEmail}
                inputRef={emailInputRef}
                customErrorMessage={emailError}
                setCustomErrorMessage={setEmailError}
                executeValidation={executeFormValidation}
                setExecuteValidation={setExecuteFormValidation}
            />
        </EditJobPostDialog>
    )
}

export default EditContactEmailDialog;
