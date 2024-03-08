import React, {Dispatch, FC, SetStateAction, useEffect, useRef} from 'react';
import './Message.scss';
import {MessageDTO} from "../../DTOs/MessagingDTOs/MessageDTO";
import {formatAMPM} from "../../utils/convertLogic/formatDate";
import {ChatHubService} from "../../services/chatHubService";
import {ConversationDTO} from "../../DTOs/MessagingDTOs/ConversationDTO";

interface MessageProps {
    message: MessageDTO;
    senderName: string;
    isMyMessage: boolean;
    conversation: ConversationDTO;
    setConversation: Dispatch<SetStateAction<ConversationDTO | null>>
}

const Message: FC<MessageProps> = ({
                                       message,
                                       senderName,
                                       isMyMessage,
                                       conversation,
                                       setConversation
                                   }) => {
    const chatHubService = ChatHubService.getInstance();
    const messageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    markMessageAsRead();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });
        if (messageRef.current){
            observer.observe(messageRef.current);
        }

        return () => observer.disconnect();
    }, []);

    async function markMessageAsRead() {
        console.log(message)
        try {
            if (message.jobSeekerId && !isMyMessage){
                await chatHubService.readMessageFromJobSeeker(message.id, message.jobSeekerId);
            }
            else if (message.employerId && !isMyMessage){
                console.log(message.employerId)
                console.log("das")
                await chatHubService.readMessageFromEmployer(message.id, message.employerId);
            }
            setConversation(prevState => (prevState && {
                ...prevState,
                messages: prevState.messages.map(msg => msg.id === message.id ? {...msg, read: true} : msg),
            }));
        } catch (error) {
            console.error('Error marking message as read:', error);
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
                    {formatAMPM(new Date(message.sentAt))}
                </div>
            </div>
            <div className={"light-dark-small-text"}>
                {message.content}
            </div>
            {isMyMessage &&
                <div className={"message-status"}>
                    {message.isRead ? "Read" : "Delivered"}
                </div>
            }
        </div>
    )
}

export default Message;
