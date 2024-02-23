import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import './EditJobLocationDialog.scss';
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import ChangeJobLocationDialogContent
    from "../../../SharedComponents/ChangeJobLocationDialogContent/ChangeJobLocationDialogContent";

interface EditJobLocationDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
}

const EditJobLocationDialog: FC<EditJobLocationDialogProps> = ({
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
            <ChangeJobLocationDialogContent showDialog={showDialog}
                                            setShowDialog={setShowDialog}
                                            setRequestInProgress={setRequestInProgress}
                                            setEditFunction={setEditFunction}/>
        </EditJobPostDialog>
    )
}

export default EditJobLocationDialog;
