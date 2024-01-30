import React, {Dispatch, FC, SetStateAction, useEffect} from 'react';
import "./NotifyPopupWindow.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-solid-svg-icons";

interface NotifyPopupWindowProps {
    isSuccessful: boolean;
    text: string;
    showNotify: boolean;
    setShowNotify: Dispatch<SetStateAction<boolean>>;
}

const NotifyPopupWindow: FC<NotifyPopupWindowProps> = (props) => {

    useEffect(() => {
        if (props.showNotify) {
            const resetTimeout = setTimeout(() => {
                props.setShowNotify(false);
            }, 3000);

            return () => {
                clearTimeout(resetTimeout);
            };
        }
    }, [props.showNotify, props.setShowNotify]);

    return (
        !props.showNotify ? null :
            <div className={"popup-bar"}>
                <div className={`pop-up-box ${props.isSuccessful ? "successful-pop-up" : "negative-pop-up"}`}>
                    {props.isSuccessful ? (
                            <div className={"successful-pop-up-icon"}>
                                <FontAwesomeIcon icon={faCircleCheck}/>
                            </div>)
                        : (
                            <div className={"negative-pop-up-icon"}>
                                <FontAwesomeIcon icon={faCircleXmark}/>
                            </div>
                        )}
                    <div className={"pop-up-text"}>
                        <span>{props.text}</span>
                    </div>

                </div>
            </div>
    )
};

export default NotifyPopupWindow;
