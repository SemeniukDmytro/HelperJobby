import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './EditContactPhoneDialog.scss';
import {IncompleteJobService} from "../../../../../services/incompleteJobService";
import {validatePhoneNumber} from "../../../../../utils/validationLogic/authFormValidators";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";
import {useEmployer} from "../../../../../hooks/contextHooks/useEmployer";
import useCurrentEmployerJob from "../../../../../hooks/contextHooks/useCurrentEmployerJob";

interface EditContactPhoneDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
}

const EditContactPhoneDialog: FC<EditContactPhoneDialogProps> = ({
                                                                     showDialog,
                                                                     setShowDialog
                                                                 }) => {

    const {employer} = useEmployer();
    const {currentJob, setCurrentJob} = useCurrentEmployerJob();
    const [requestInProgress, setRequestInProgress] = useState(false);
    const [contactPhoneNumber, setContactPhoneNumber] =
        useState(currentJob?.contactPhoneNumber || employer!.contactNumber);
    const phoneNumberInputRef = useRef<HTMLInputElement>(null);
    const [phoneError, setPhoneError] = useState("");
    const [executeFormValidation, setExecuteFormValidation] = useState(false);
    const incompleteJobService = new IncompleteJobService();

    useEffect(() => {
        if (showDialog) {
            setContactPhoneNumber(currentJob?.contactPhoneNumber || employer!.contactNumber);
            setPhoneError("");
        }
    }, [showDialog]);

    async function editApplicationMethod() {
        setExecuteFormValidation(true);

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
                contactPhoneNumber: contactPhoneNumber,
            }
            const retrievedIncompleteJob = await incompleteJobService.updateJobCreation(currentJob!.id, updatedIncompleteJob);
            setCurrentJob(retrievedIncompleteJob);
            setShowDialog(false)
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setRequestInProgress(false);
        }
    }


    return (
        <EditJobPostDialog
            showDialog={showDialog}
            setShowDialog={setShowDialog}
            requestInProgress={requestInProgress}
            executeJobEditing={editApplicationMethod}>
            <CustomInputField
                fieldLabel={"Phone number for job seekers to contact with you"}
                fieldSubtitle={"Include country code (start with +). Phone number must contain only numbers without spaces or dashes"}
                isRequired={false}
                inputFieldValue={contactPhoneNumber}
                setInputFieldValue={setContactPhoneNumber}
                inputRef={phoneNumberInputRef}
                customErrorMessage={phoneError}
                setCustomErrorMessage={setPhoneError}
                executeValidation={executeFormValidation}
                setExecuteValidation={setExecuteFormValidation}
                maxInputLength={15}
            />
        </EditJobPostDialog>
    )
}

export default EditContactPhoneDialog;
