import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './EditScheduleDialog.scss';
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import ChangeJobScheduleDialogContent
    from "../../../SharedComponents/ChangeJobScheduleDialogContent/ChangeJobScheduleDialogContent";

interface EditScheduleDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
}

const EditScheduleDialog: FC<EditScheduleDialogProps> = ({
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
            <ChangeJobScheduleDialogContent showDialog={showDialog}
                                            setShowDialog={setShowDialog}
                                            setRequestInProgress={setRequestInProgress}
                                            setEditFunction={setEditFunction}/>
        </EditJobPostDialog>
    )
}

export default EditScheduleDialog;
