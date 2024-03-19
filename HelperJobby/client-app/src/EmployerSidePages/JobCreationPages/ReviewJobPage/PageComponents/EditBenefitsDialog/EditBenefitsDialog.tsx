import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import './EditBenefitsDialog.scss';
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
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
