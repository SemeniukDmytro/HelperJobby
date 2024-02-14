import React, {Dispatch, FC, SetStateAction, useEffect} from 'react';
import './DialogWindow.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import '../../Assets/scssSharedStyles/DefaultButtons.scss'

interface DialogWindowProps {
    firstButtonOnClick?: () => void | Promise<void>;
    secondButtonOnClick?: () => void | Promise<void>;
    showDialog: boolean;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
    titleText: string;
    mainText: string;
    firstButtonText: string;
    secondButtonText: string;
    positiveDialog: boolean;
}

const DialogWindow: FC<DialogWindowProps> = ({
                                                 firstButtonOnClick,
                                                 secondButtonOnClick,
                                                 showDialog,
                                                 setShowDialog,
                                                 titleText,
                                                 mainText,
                                                 firstButtonText,
                                                 secondButtonText,
                                                 positiveDialog
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
                <div className={"dialog-content-container"}>
                    <div className={"dialog-header-box"}>
                        <span className={"bold-text"}>{titleText}</span>
                        <button className={"small-interaction-button"} onClick={closeDialog}>
                            <FontAwesomeIcon className={"svg1rem"} icon={faXmark}/>
                        </button>
                    </div>
                    <div className={"dialog-separation-line"}></div>
                    <div className={"dialog-main-content"}>
                        <span>{mainText}</span>
                    </div>
                    <div className={"dialog-separation-line"}></div>
                    <div className={"dialog-buttons"}>
                        <button
                            className={"light-button-with-margin"}
                            onClick={firstButtonOnClick ? firstButtonOnClick : closeDialog}
                        >
                            {firstButtonText}
                        </button>
                        <button
                            className={`${positiveDialog ? "blue-button" : "red-button"}`}
                            onClick={secondButtonOnClick ? secondButtonOnClick : closeDialog}
                        >
                            {secondButtonText}
                        </button>
                    </div>
                </div>
                <div className={"background-overlay"} onClick={closeDialog}>

                </div>
            </div>
    )
}

export default DialogWindow;
