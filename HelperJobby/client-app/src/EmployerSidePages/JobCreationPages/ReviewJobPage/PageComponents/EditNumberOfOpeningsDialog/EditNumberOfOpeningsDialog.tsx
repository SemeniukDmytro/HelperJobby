import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './EditNumberOfOpeningsDialog.scss';
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import useJobCreation from "../../../../../hooks/useJobCreation";
import {numberOfOpeningsOptions} from "../../../../../AppConstData/NumberOfOpeningsOptions";
import CustomSelectField from "../../../../../Components/CustomSelectField/CustomSelectField";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";

interface EditNumberOfOpeningDialogProps {
    showDialog : boolean;
    setShowDialog : Dispatch<SetStateAction<boolean>>;
    
}

const EditNumberOfOpeningsDialog: FC<EditNumberOfOpeningDialogProps> = ({
    showDialog,
    setShowDialog
                                                                        }) => {
    const {incompleteJob, setIncompleteJob} = useJobCreation();
    
    const [numberOfOpenings, setNumberOfOpenings] = useState(incompleteJob?.numberOfOpenings.toString() || "");
    const [requestInProgress, setRequestInProgress] = useState(false);
    const [isInvalidSelect, setIsInvalidSelect] = useState(numberOfOpenings.length > 0);
    const [executeValidation, setExecuteValidation] = useState(false);
    const incompleteJobService = new IncompleteJobService();

    useEffect(() => {
        if (showDialog){
            setNumberOfOpenings(incompleteJob?.numberOfOpenings.toString() || "")
        }
    }, [showDialog]);
    
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
            setShowDialog(false);
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
            executeJobEditing={editNumberOfOpenings}>
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
        </EditJobPostDialog>
    )
}

export default EditNumberOfOpeningsDialog;
