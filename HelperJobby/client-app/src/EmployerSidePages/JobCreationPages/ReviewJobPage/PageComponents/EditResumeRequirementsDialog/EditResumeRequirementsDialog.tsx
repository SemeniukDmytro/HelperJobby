import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './EditResumeRequirementsDialog.scss';
import {resumeRequirementOptionsEnumToStringMap} from "../../../../../utils/convertLogic/enumToStringConverter";
import {resumeRequirementOptionsMapData} from "../../../../../AppConstData/ResumeRequirements";
import useJobCreation from "../../../../../hooks/useJobCreation";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import CustomSelectWindow from "../../../../../EmployersSideComponents/CustomSelectWindow/CustomSelectWindow";

interface EditResumeRequirementsDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>
}

const EditResumeRequirementsDialog: FC<EditResumeRequirementsDialogProps> = ({
                                                                                 showDialog,
                                                                                 setShowDialog
                                                                             }) => {
    const {incompleteJob, setIncompleteJob} = useJobCreation();
    const [isResumeRequired, setIsResumeRequired] =
        useState(incompleteJob?.resumeRequired ?  resumeRequirementOptionsEnumToStringMap(incompleteJob?.resumeRequired)
            : resumeRequirementOptionsMapData[0].stringValue);
    const [requestInProgress, setRequestInProgress] = useState(false);
    const incompleteJobService = new IncompleteJobService();

    useEffect(() => {
        if (showDialog){
            setIsResumeRequired(incompleteJob?.resumeRequired ?  resumeRequirementOptionsEnumToStringMap(incompleteJob?.resumeRequired)
                : resumeRequirementOptionsMapData[0].stringValue);
        }
    }, [showDialog]);

    async function editResumeRequirements() {
        try {
            setRequestInProgress(true);
            const updatedIncompleteJob : UpdatedIncompleteJobDTO = {
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
        <EditJobPostDialog showDialog={showDialog}
                           setShowDialog={setShowDialog}
                           requestInProgress={requestInProgress}
                           executeJobEditing={editResumeRequirements}>
            <CustomSelectWindow
                fieldLabel={"Ask potential candidates for a resume?"}
                selectedValue={isResumeRequired}
                setSelectedValue={setIsResumeRequired}
                optionsArr={resumeRequirementOptionsMapData.map(rr => rr.stringValue)}
                includeWindowScroll={false}
            />
        </EditJobPostDialog>
    )
}

export default EditResumeRequirementsDialog;
