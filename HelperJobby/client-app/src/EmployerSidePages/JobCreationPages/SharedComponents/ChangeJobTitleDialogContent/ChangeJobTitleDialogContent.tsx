import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './ChangeJobTitleDialogContent.scss';
import useJobCreation from "../../../../hooks/useJobCreation";
import {IncompleteJobService} from "../../../../services/incompleteJobService";
import {UpdatedIncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";

interface ChangeJobTitleDialogContentProps {
    showDialog : boolean;
    setShowDialog? : Dispatch<SetStateAction<boolean>>;
    setRequestInProgress : Dispatch<SetStateAction<boolean>>;
    setEditFunction : Dispatch<SetStateAction<() => void>>;
}

const ChangeJobTitleDialogContent: FC<ChangeJobTitleDialogContentProps> = ({
                                                                               showDialog,
                                                                               setRequestInProgress,
                                                                               setEditFunction,
                                                                               setShowDialog
                                                                           }) => {
    
    const {incompleteJob, setIncompleteJob} = useJobCreation();

    const [currentJobTitle, setCurrentJobTitle] = useState(incompleteJob?.jobTitle || "");
    const currentJobTitleRef = useRef<HTMLInputElement>(null);
    const [executeValidation, setExecuteValidation] = useState(false);
    const incompleteJobService = new IncompleteJobService();

    useEffect(() => {
        if (showDialog){
            setCurrentJobTitle(incompleteJob?.jobTitle || "")
        }
    }, [showDialog]);

    useEffect(() => {
        setEditFunction(() => editJobTitle)
    }, [currentJobTitle]);


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
            setShowDialog && setShowDialog(false);
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setRequestInProgress(false);
        }
    }
    
    return (
        <CustomInputField
            fieldLabel={"Job title"}
            isRequired={true}
            inputFieldValue={currentJobTitle}
            setInputFieldValue={setCurrentJobTitle}
            inputRef={currentJobTitleRef}
            executeValidation={executeValidation}
            setExecuteValidation={setExecuteValidation}
        />
    )
}

export default ChangeJobTitleDialogContent;
