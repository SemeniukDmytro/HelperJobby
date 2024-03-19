import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import './EditDescriptionDialog.scss';
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import ChangeJobDescriptionDialogContent
    from "../../../SharedComponents/ChangeJobDescriptionDialogContent/ChangeJobDescriptionDialogContent";

interface EditDescriptionDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
}

const EditDescriptionDialog: FC<EditDescriptionDialogProps> = ({
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
            <ChangeJobDescriptionDialogContent
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                setRequestInProgress={setRequestInProgress}
                setEditFunction={setEditFunction}
            />
        </EditJobPostDialog>
    )
}

export default EditDescriptionDialog;
