import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import './EditNumberOfOpeningsDialog.scss';
import EditJobPostDialog from "../EditJobPostDialog/EditJobPostDialog";
import ChangeJobNumberOfOpeningsDialogContent
    from "../../../SharedComponents/ChangeJobNumberOfOpeningsDialogContent/ChangeJobNumberOfOpeningsDialogContent";

interface EditNumberOfOpeningDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;

}

const EditNumberOfOpeningsDialog: FC<EditNumberOfOpeningDialogProps> = ({
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
            <ChangeJobNumberOfOpeningsDialogContent showDialog={showDialog}
                                                    setShowDialog={setShowDialog}
                                                    setRequestInProgress={setRequestInProgress}
                                                    setEditFunction={setEditFunction}/>
        </EditJobPostDialog>
    )
}

export default EditNumberOfOpeningsDialog;
