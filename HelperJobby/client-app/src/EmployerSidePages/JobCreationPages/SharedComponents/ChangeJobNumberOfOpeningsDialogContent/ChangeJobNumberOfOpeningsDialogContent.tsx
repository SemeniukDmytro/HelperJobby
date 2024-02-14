import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './ChangeJobNumberOfOpeningsDialogContent.scss';
import useJobCreation from "../../../../hooks/useJobCreation";
import {IncompleteJobService} from "../../../../services/incompleteJobService";
import {UpdatedIncompleteJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {numberOfOpeningsOptions} from "../../../../AppConstData/NumberOfOpeningsOptions";
import CustomSelectField from "../../../../Components/CustomSelectField/CustomSelectField";

interface ChangeJobNumberOfOpeningsDialogContentProps {
    showDialog : boolean;
    setShowDialog? : Dispatch<SetStateAction<boolean>>;
    setRequestInProgress : Dispatch<SetStateAction<boolean>>;
    setEditFunction : Dispatch<SetStateAction<() => void>>;
}

const ChangeJobNumberOfOpeningsDialogContent: FC<ChangeJobNumberOfOpeningsDialogContentProps> = ({
                                                                                                     showDialog,
                                                                                                     setRequestInProgress,
                                                                                                     setEditFunction,
                                                                                                     setShowDialog
                                                                                                 }) => {
    const {incompleteJob, setIncompleteJob} = useJobCreation();
    const [numberOfOpenings, setNumberOfOpenings] = useState(incompleteJob?.numberOfOpenings.toString() || "");
    const [isInvalidSelect, setIsInvalidSelect] = useState(numberOfOpenings.length > 0);
    const [executeValidation, setExecuteValidation] = useState(false);
    const incompleteJobService = new IncompleteJobService();

    useEffect(() => {
        if (showDialog){
            setNumberOfOpenings(incompleteJob?.numberOfOpenings.toString() || "")
        }
    }, [showDialog]);

    useEffect(() => {
        setEditFunction(() => editNumberOfOpenings)
    }, [numberOfOpenings]);

    async function editNumberOfOpenings() {
        setExecuteValidation(true);
        if (!numberOfOpenings || isInvalidSelect){
            return;
        }

        try {
            setRequestInProgress(true);
            const updatedJob : UpdatedIncompleteJobDTO = {
                ...incompleteJob,
                numberOfOpenings : parseInt(numberOfOpenings)
            }
            const retrievedJob = await incompleteJobService.updateJobCreation(incompleteJob!.id, updatedJob);
            setIncompleteJob(retrievedJob);
            setShowDialog && setShowDialog(false);
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
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
