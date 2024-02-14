import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import './EditJobTitleDialog.scss';
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import ChangeJobTitleDialogContent
    from "../../../SharedComponents/ChangeJobTitleDialogContent/ChangeJobTitleDialogContent";

interface EditJobTitleDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
}

const EditJobTitleDialog: FC<EditJobTitleDialogProps> = ({
                                                             showDialog,
                                                             setShowDialog,
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
            <ChangeJobTitleDialogContent showDialog={showDialog}
                                          setShowDialog={setShowDialog}
                                          setRequestInProgress={setRequestInProgress}
                                          setEditFunction={setEditFunction}/>
        </EditJobPostDialog>
    )
}

export default EditJobTitleDialog;
