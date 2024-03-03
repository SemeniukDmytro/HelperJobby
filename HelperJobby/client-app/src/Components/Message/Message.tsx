import React, { FC } from 'react';
import './Message.scss';
import {MessageDTO} from "../../DTOs/MessagingDTOs/MessageDTO";
import {
    formatAMPM,
    getDateWithTime_MMM_DD, getFullDateWithTime_MMMM_DD_YYYY
} from "../../utils/convertLogic/GetFullDate_MMMM_DD_YYYY";

interface MessageProps {
    message : MessageDTO;
    senderName : string;
    isMyMessage : boolean;
    messageRef: React.RefObject<HTMLDivElement> | null;
}

const Message: FC<MessageProps> = ({
    message,
    senderName,
    isMyMessage,
    messageRef
                                   }) => {

    function getMessageFormattedTime(){
        const date = new Date(message.sentAt);
        const currentDate = new Date();
        if (date.getDay() == currentDate.getDay()){
            return formatAMPM(date);
        }
        if (date.toDateString() === currentDate.toDateString()) {
            return formatAMPM(date);
        }
        const oneDayMilliseconds = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(Math.abs((date.getDate() - currentDate.getDate()) / oneDayMilliseconds));

        if (diffDays <= 7) {
            return date.toLocaleDateString('en-US', { weekday: 'long' }) + ' ' + formatAMPM(date);
        }
        
        if (date.getFullYear() == currentDate.getFullYear()){
            return getDateWithTime_MMM_DD(message.sentAt);
        }
        else {
            return getFullDateWithTime_MMMM_DD_YYYY(message.sentAt);
        }
    }
    
    return (
        <div ref={messageRef} className={"message-box"}>
            <div className={"sender-info-and-time-box"}>
                <div className={"dark-small-text bold-text"}>
                    {isMyMessage ? "Me" : senderName}
                </div>
                <div className={"circle-separator"}>
                    •
                </div>
                <div className={"grey-small-text"}>
                     {getMessageFormattedTime()}
                </div>
            </div>
            <div className={"light-dark-small-text"}>
                {message.content}
            </div>
        </div>
    )
}

export default Message;
