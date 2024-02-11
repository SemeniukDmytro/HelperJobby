import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './EditJobTitleDialog.scss';
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import useJobCreation from "../../../../../hooks/useJobCreation";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";

interface EditJobTitleDialogProps {
    showEditJobTitleDialog: boolean;
    setShowEditJobTitleDialog: Dispatch<SetStateAction<boolean>>;
}

const EditJobTitleDialog: FC<EditJobTitleDialogProps> = ({
                                                             showEditJobTitleDialog,
                                                             setShowEditJobTitleDialog,
                                                         }) => {
    const {incompleteJob, setIncompleteJob} = useJobCreation();

    const [currentJobTitle, setCurrentJobTitle] = useState(incompleteJob?.jobTitle || "");
    const currentJobTitleRef = useRef<HTMLInputElement>(null);
    const [executeValidation, setExecuteValidation] = useState(false);
    const [requestInProgress, setRequestInProgress] = useState(false);
    const incompleteJobService = new IncompleteJobService();

    useEffect(() => {
        if (showEditJobTitleDialog){
            setCurrentJobTitle(incompleteJob?.jobTitle || "")
        }
    }, [showEditJobTitleDialog]);


    async function editJobTitle() {
        setExecuteValidation(true);
        if (!currentJobTitle) {
            currentJobTitleRef.current?.focus();
            return;
        }

        try {
            setRequestInProgress(true);
            const updatedJob: UpdatedIncompleteJobDTO = {
                ...incompleteJob,
                jobTitle: currentJobTitle
            };
            const retrievedJob = await incompleteJobService.updateJobCreation(incompleteJob!.id, updatedJob);
            setIncompleteJob(retrievedJob);
            setShowEditJobTitleDialog(false);
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setRequestInProgress(false);
        }
    }

    useEffect(() => {
        if (!incompleteJob) {
            setShowEditJobTitleDialog(false);
            return;
        }
    }, []);

    return (
        <EditJobPostDialog
            showDialog={showEditJobTitleDialog}
            setShowDialog={setShowEditJobTitleDialog}
            executeJobEditing={editJobTitle}
            requestInProgress={requestInProgress}
        >
            <CustomInputField
                fieldLabel={"Job title"}
                isRequired={true}
                inputFieldValue={currentJobTitle}
                setInputFieldValue={setCurrentJobTitle}
                inputRef={currentJobTitleRef}
                executeValidation={executeValidation}
                setExecuteValidation={setExecuteValidation}
            />
        </EditJobPostDialog>
    )
}

export default EditJobTitleDialog;
