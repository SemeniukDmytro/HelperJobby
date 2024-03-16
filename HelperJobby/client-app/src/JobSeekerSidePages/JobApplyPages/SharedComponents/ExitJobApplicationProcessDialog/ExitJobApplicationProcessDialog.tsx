import React, {Dispatch, FC, SetStateAction, useEffect} from 'react';
import './ExitJobApplicationProcessDialog.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import WhiteLoadingSpinner from "../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {useNavigate} from "react-router-dom";

interface ExitJobApplicationProcessDialogProps {
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>
}

const ExitJobApplicationProcessDialog: FC<ExitJobApplicationProcessDialogProps> = ({
                                                                                       showDialog,
                                                                                       setShowDialog
                                                                                   }) => {
    const navigate = useNavigate();

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

    function exitJobApplication() {
        navigate("/");
    }

    return (
        !showDialog ? null :
            <div className={"dialog-window"}>
                <div className={"exit-dialog-container"}>
                    <div className={"dialog-header-box"}>
                        <span className={"bold-text"}>Are you sure you want to exit?</span>
                        <button className={"small-interaction-button"} onClick={closeDialog}>
                            <FontAwesomeIcon className={"svg1rem"} icon={faXmark}/>
                        </button>
                    </div>
                    <div className={"dialog-separation-line"}></div>
                    <div className={"dialog-main-content"}>
                        <span>Your application and any documents uploaded during this application will not be saved.</span>
                    </div>
                    <div className={"dialog-separation-line"}></div>
                    <div className={"dialog-buttons"}>
                        <button
                            className={"blue-button full-width-button"}
                            onClick={exitJobApplication}
                        >
                            Exit
                        </button>
                    </div>
                </div>
                <div className={"background-overlay"} onClick={closeDialog}>

                </div>
            </div>
    )
}

export default ExitJobApplicationProcessDialog;
