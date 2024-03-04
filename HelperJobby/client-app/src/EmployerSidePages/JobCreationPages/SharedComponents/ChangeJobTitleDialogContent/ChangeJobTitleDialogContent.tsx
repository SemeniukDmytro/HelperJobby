import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './ChangeJobTitleDialogContent.scss';
import {IncompleteJobService} from "../../../../services/incompleteJobService";
import {UpdatedIncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import {JobCreationStates} from "../../../../enums/utilityEnums/JobCreationStates";
import {IncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import {JobService} from "../../../../services/jobService";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {UpdatedJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedJobDTO";
import useCurrentEmployerJob from "../../../../hooks/contextHooks/useCurrentEmployerJob";

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
    
    const {currentJob, setCurrentJob, jobCreationState} = useCurrentEmployerJob();

    const [currentJobTitle, setCurrentJobTitle] = useState(currentJob?.jobTitle || "");
    const currentJobTitleRef = useRef<HTMLInputElement>(null);
    const [executeValidation, setExecuteValidation] = useState(false);
    const incompleteJobService = new IncompleteJobService();
    const jobService = new JobService();

    useEffect(() => {
        if (showDialog){
            setCurrentJobTitle(currentJob?.jobTitle || "")
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
            
            if (jobCreationState == JobCreationStates.incompleteJob){
                const job = currentJob as IncompleteJobDTO;
                const updatedJob: UpdatedIncompleteJobDTO = {
                    ...job,
                    jobTitle: currentJobTitle
                };
                const retrievedJob = await incompleteJobService.updateJobCreation(currentJob!.id, updatedJob);
                setCurrentJob(retrievedJob);
            }
            else {
                const job = currentJob as JobDTO;
                const updatedJob: UpdatedJobDTO = {
                    ...job,
                    jobTitle: currentJobTitle
                };
                const retrievedJob = await jobService.putJob(currentJob!.id, updatedJob);
                setCurrentJob(retrievedJob);
            }
            
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
