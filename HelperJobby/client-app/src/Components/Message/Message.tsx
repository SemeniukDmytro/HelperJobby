import React, { FC } from 'react';
import './Message.scss';
import {MessageDTO} from "../../DTOs/MessagingDTOs/MessageDTO";
import {getMessageFormattedTime} from "../../utils/convertLogic/formatDate";

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
                     {getMessageFormattedTime(message.sentAt)}
                </div>
            </div>
            <div className={"light-dark-small-text"}>
                {message.content}
            </div>
        </div>
    )
}

export default Message;
