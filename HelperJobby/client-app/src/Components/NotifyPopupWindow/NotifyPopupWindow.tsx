import React, {FC, useEffect, useState} from 'react';
import "./NotifyPopupWindow.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleXmark} from "@fortawesome/free-solid-svg-icons";

interface NotifyPopupWindowProps {
    isSuccessful : boolean;
    text : string;
}

const NotifyPopupWindow: FC<NotifyPopupWindowProps> = (props) => {
    return (
        <div className={"popup-bar"}>
            <div className={`pop-up-box ${props.isSuccessful ? "successful-pop-up" : "negative-pop-up"}`}>
                {props.isSuccessful ?( 
                <div className={"successful-pop-up-icon"}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                </div>)
                   : (
                <div className={"negative-pop-up-icon"}>
                    <FontAwesomeIcon icon={faCircleXmark} />
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
