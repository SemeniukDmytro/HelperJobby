import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './DialogWindow.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import '../../Assets/scssSharedStyles/DefaultButtons.scss'
interface DialogWindowProps {
    notCloseOptionOnClick : () => void;
    showDialog : boolean;
    setShowDialog : Dispatch<SetStateAction<boolean>>;
}

const DialogWindow: FC<DialogWindowProps> = ({notCloseOptionOnClick, showDialog, setShowDialog}) => {

    useEffect(() => {
        showDialog ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";
    }, [showDialog]);


    function closeDialog() {
        setShowDialog(false);
    }

    return (
        !showDialog ? null :
        <div className={"dialog-window"}>
            <div className={"dialogue-content-container"}>
                <div className={"dialog-header-box"}>
                    <span>Are you sure you want to exit?</span>
                    <button className={"close-dialogue-button"} onClick={closeDialog}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>
                </div>
                <div className={"dialog-separation-line"}></div>
                <div className={"dialog-main-text"}>
                    <span>We found an error on this page. You might be missing required information. Please review, or exit without saving.</span>
                </div>
                <div className={"dialog-separation-line"}></div>
                <div className={"dialog-buttons"}>
                    <button className={"light-button"} onClick={notCloseOptionOnClick}>
                        Exit without saving
                    </button>
                    <button className={"blue-button"} onClick={closeDialog}>
                        Return to page
                    </button>
                </div>
            </div>
            <div className={"background-overlay"} onClick={closeDialog}>
                
            </div>
        </div>
    )
}

export default DialogWindow;
