import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './EditBenefitsDialog.scss';
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import useJobCreation from "../../../../../hooks/useJobCreation";
import {UpdatedIncompleteJobDTO} from "../../../../../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {IncompleteJobService} from "../../../../../services/incompleteJobService";
import {benefitsStringValues} from "../../../../../AppConstData/JobEnumsToStringsArrays";
import JobFeature from "../../../../../EmployersSideComponents/JobFeature/JobFeature";
import {benefitStringToEnumMap} from "../../../../../utils/convertLogic/enumToStringConverter";
import {handleJobFeaturesListAppearance} from "../../../../../utils/handleJobFeaturesListHeight";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {addBenefit} from "../../../../../utils/manageJobFeatureSelect";
import ChangeJobBenefitsDialogContent
    from "../../../SharedComponents/ChangeJobBenefitsDialogContent/ChangeJobBenefitsDialogContent";

interface EditBenefitsDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
}

const EditBenefitsDialog: FC<EditBenefitsDialogProps> = ({
                                                             showDialog,
                                                             setShowDialog
                                                         }) => {
    const [requestInProgress, setRequestInProgress] = useState(false);
    const [editFunction, setEditFunction] = useState<() => void>(async () => {
    });
    
    
    return (
        <EditJobPostDialog
            showDialog={showDialog}
            setShowDialog={setShowDialog}
            requestInProgress={requestInProgress}
            executeJobEditing={() => editFunction()}>
            <ChangeJobBenefitsDialogContent showDialog={showDialog}
                                            setShowDialog={setShowDialog}
                                            setRequestInProgress={setRequestInProgress}
                                            setEditFunction={setEditFunction}/>
        </EditJobPostDialog>
    )
}

export default EditBenefitsDialog;
