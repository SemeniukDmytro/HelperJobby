import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import './EditApplicationMethodDialog.scss';
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import ChangeJobApplicationMethodDialogContent
    from "../../../SharedComponents/ChangeJobApplicationMethodDialogContent/ChangeJobApplicationMethodDialogContent";

interface EditApplicationMethodDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
}

const EditApplicationMethodDialog: FC<EditApplicationMethodDialogProps> = ({
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
            <ChangeJobApplicationMethodDialogContent showDialog={showDialog}
                                                     setShowDialog={setShowDialog}
                                                     setRequestInProgress={setRequestInProgress}
                                                     setEditFunction={setEditFunction}
            />
        </EditJobPostDialog>
    )
}

export default EditApplicationMethodDialog;
