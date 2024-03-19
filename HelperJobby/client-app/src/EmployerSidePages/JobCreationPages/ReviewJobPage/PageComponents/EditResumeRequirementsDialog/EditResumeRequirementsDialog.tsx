import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './EditResumeRequirementsDialog.scss';
import {resumeRequirementOptionsEnumToStringMap} from "../../../../../utils/convertLogic/enumToStringConverter";
import {resumeRequirementOptionsMapData} from "../../../../../AppConstData/ResumeRequirements";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import CustomSelectWindow from "../../../../../EmployersSideComponents/CustomSelectWindow/CustomSelectWindow";
import useCurrentEmployerJob from "../../../../../hooks/contextHooks/useCurrentEmployerJob";

interface EditResumeRequirementsDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>
}

const EditResumeRequirementsDialog: FC<EditResumeRequirementsDialogProps> = ({
                                                                                 showDialog,
                                                                                 setShowDialog
                                                                             }) => {
    const {currentJob, setCurrentJob} = useCurrentEmployerJob();
    const [isResumeRequired, setIsResumeRequired] =
        useState(currentJob?.resumeRequired ? resumeRequirementOptionsEnumToStringMap(currentJob?.resumeRequired)
            : resumeRequirementOptionsMapData[0].stringValue);
    const [requestInProgress, setRequestInProgress] = useState(false);
    const incompleteJobService = new IncompleteJobService();

    useEffect(() => {
        if (showDialog) {
            setIsResumeRequired(currentJob?.resumeRequired ? resumeRequirementOptionsEnumToStringMap(currentJob?.resumeRequired)
                : resumeRequirementOptionsMapData[0].stringValue);
        }
    }, [showDialog]);

    async function editResumeRequirements() {
        try {
            setRequestInProgress(true);
            const updatedIncompleteJob: UpdatedIncompleteJobDTO = {
                resumeRequired: resumeRequirementOptionsMapData.find(rro => rro.stringValue == isResumeRequired)?.enumValue
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
