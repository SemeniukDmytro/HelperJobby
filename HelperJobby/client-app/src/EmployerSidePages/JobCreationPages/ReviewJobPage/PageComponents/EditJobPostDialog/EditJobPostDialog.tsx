import React, {Dispatch, FC, ReactNode, SetStateAction, useEffect} from 'react';
import './EditJobPostDialog.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import WhiteLoadingSpinner from "../../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";

interface EditJobPostDialogProps {
    showDialog : boolean;
    setShowDialog : Dispatch<SetStateAction<boolean>>;
    requestInProgress : boolean;
    executeJobEditing : () => void;
    children : ReactNode
}

const EditJobPostDialog: FC<EditJobPostDialogProps> = ({
    showDialog,
    setShowDialog,
    executeJobEditing,
    requestInProgress,
    children
                                                             }) => {


    useEffect(() => {
        if (showDialog) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = "";
            document.body.style.paddingRight = '';
        }
    }, [showDialog]);

    function closeDialog() {
        setShowDialog(false);
    }

    return (
        !showDialog ? null :
            <div className={"dialog-window"}>
                <div className={"dialog-content-container job-post-dialog"}>
                    <div className={"dialog-header-box"}>
                        <span className={"bold-text"}>Edit the job post</span>
                        <button className={"small-interaction-button"} onClick={closeDialog}>
                            <FontAwesomeIcon className={"svg1rem"} icon={faXmark}/>
                        </button>
                    </div>
                    <div className={"dialog-separation-line"}></div>
                    <div className={"dialog-main-content"}>
                        {children}
                    </div>
                    <div className={"dialog-separation-line"}></div>
                    <div className={"dialog-buttons"}>
                        <button
                            className={"light-button-with-margin"}
                            onClick={closeDialog}
                        >
                            Close
                        </button>
                        <button
                            className={"blue-button min-4chr-btn-width"}
                            onClick={executeJobEditing}
                            disabled={requestInProgress}
                        >
                            {requestInProgress ? <WhiteLoadingSpinner/>
                                :
                                <>
                                    <span>Done</span>
                                </>
                            }
                        </button>
                    </div>
                </div>
                <div className={"background-overlay"} onClick={closeDialog}>
                        
                </div>
            </div>
    )
}

export default EditJobPostDialog;
