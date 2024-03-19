import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import './EditJobSalaryDialog.scss';
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import ChangeJobSalaryDialogContent
    from "../../../SharedComponents/ChangeJobSalaryDialogContent/ChangeJobSalaryDialogContent";

interface EditJobSalaryDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
}

const EditJobSalaryDialog: FC<EditJobSalaryDialogProps> = ({
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
            <ChangeJobSalaryDialogContent showDialog={showDialog}
                                          setShowDialog={setShowDialog}
                                          setRequestInProgress={setRequestInProgress}
                                          setEditFunction={setEditFunction}/>
        </EditJobPostDialog>
    )
}

export default EditJobSalaryDialog;
