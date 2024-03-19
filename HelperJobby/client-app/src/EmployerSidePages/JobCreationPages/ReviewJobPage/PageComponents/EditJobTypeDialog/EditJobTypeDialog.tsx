import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import './EditJobTypeDialog.scss';
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import ChangeJobTypeDialogContent
    from "../../../SharedComponents/ChangeJobTypeDialogContent/ChangeJobTypeDialogContent";

interface EditJobTypeDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
}

const EditJobTypeDialog: FC<EditJobTypeDialogProps> = ({
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
            <ChangeJobTypeDialogContent showDialog={showDialog}
                                        setShowDialog={setShowDialog}
                                        setRequestInProgress={setRequestInProgress}
                                        setEditFunction={setEditFunction}/>
        </EditJobPostDialog>
    )
}

export default EditJobTypeDialog;
