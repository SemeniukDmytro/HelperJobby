import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './ChangeJobNumberOfOpeningsDialogContent.scss';
import {IncompleteJobService} from "../../../../services/incompleteJobService";
import {UpdatedIncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {numberOfOpeningsOptions} from "../../../../AppConstData/NumberOfOpeningsOptions";
import CustomSelectField from "../../../../Components/CustomSelectField/CustomSelectField";
import {JobService} from "../../../../services/jobService";
import {JobCreationStates} from "../../../../enums/utilityEnums/JobCreationStates";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {UpdatedJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedJobDTO";
import useCurrentEmployerJob from "../../../../hooks/contextHooks/useCurrentEmployerJob";

interface ChangeJobNumberOfOpeningsDialogContentProps {
    showDialog: boolean;
    setShowDialog?: Dispatch<SetStateAction<boolean>>;
    setRequestInProgress: Dispatch<SetStateAction<boolean>>;
    setEditFunction: Dispatch<SetStateAction<() => void>>;
}

const ChangeJobNumberOfOpeningsDialogContent: FC<ChangeJobNumberOfOpeningsDialogContentProps> = ({
                                                                                                     showDialog,
                                                                                                     setRequestInProgress,
                                                                                                     setEditFunction,
                                                                                                     setShowDialog
                                                                                                 }) => {
    const {currentJob, setCurrentJob, jobCreationState} = useCurrentEmployerJob();
    const [numberOfOpenings, setNumberOfOpenings] = useState(currentJob?.numberOfOpenings.toString() || "");
    const [isInvalidSelect, setIsInvalidSelect] = useState(numberOfOpenings.length > 0);
    const [executeValidation, setExecuteValidation] = useState(false);
    const incompleteJobService = new IncompleteJobService();
    const jobService = new JobService();

    useEffect(() => {
        if (showDialog) {
            setNumberOfOpenings(currentJob?.numberOfOpenings.toString() || "")
        }
    }, [showDialog]);

    useEffect(() => {
        setEditFunction(() => editNumberOfOpenings)
    }, [numberOfOpenings]);

    async function editNumberOfOpenings() {
        setExecuteValidation(true);
        if (!numberOfOpenings || isInvalidSelect) {
            return;
        }

        try {
            setRequestInProgress(true);
            if (jobCreationState == JobCreationStates.incompleteJob) {
                const updatedIncompleteJob: UpdatedIncompleteJobDTO = {
                    ...currentJob,
                    numberOfOpenings: parseInt(numberOfOpenings)
                }
                const retrievedIncompleteJob = await incompleteJobService.updateJobCreation(currentJob!.id, updatedIncompleteJob);
                setCurrentJob(retrievedIncompleteJob);
            } else {
                const job = currentJob as JobDTO;
                const updatedJob: UpdatedJobDTO = {
                    ...job,
                    numberOfOpenings: parseInt(numberOfOpenings)
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
        <CustomSelectField
            fieldLabel={"Number of people to hire for this job"}
            fieldValue={numberOfOpenings}
            setFieldValue={setNumberOfOpenings}
            optionsArr={numberOfOpeningsOptions}
            isRequired={true}
            isInvalidSelect={isInvalidSelect}
            setIsInvalidSelect={setIsInvalidSelect}
            executeValidation={executeValidation}
            setExecuteValidation={setExecuteValidation}
        />
    )

}

export default ChangeJobNumberOfOpeningsDialogContent;
