import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './Message.scss';
import {MessageDTO} from "../../DTOs/MessagingDTOs/MessageDTO";
import {formatAMPM} from "../../utils/convertLogic/formatDate";
import {ChatHubService} from "../../services/chatHubService";
import {ConversationDTO} from "../../DTOs/MessagingDTOs/ConversationDTO";
import {getMessageSenderName} from "../../utils/messaging/getMessageSenderName";

interface MessageProps {
    message: MessageDTO;
    isMyMessage: boolean;
    conversation: ConversationDTO;
    setConversation: Dispatch<SetStateAction<ConversationDTO | null>>;
    setConversationsToShow: Dispatch<SetStateAction<ConversationDTO[]>>;
}

const Message: FC<MessageProps> = ({
                                       message,
                                       isMyMessage,
                                       conversation,
                                       setConversation,
                                       setConversationsToShow
                                   }) => {
    const chatHubService = ChatHubService.getInstance();
    const messageRef = useRef<HTMLDivElement>(null);
    const [isMessageRead, setIsMessageRead] = useState(message.isRead);

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
        if (messageRef.current && !message.isRead) {
            observer.observe(messageRef.current);
        }
        chatHubService.registerMessageRead((message) => {
            setIsMessageRead(true);
            if (message.conversationId == conversation.id){
                const updatedShortConversation = {...conversation};
                message.employerId ? updatedShortConversation.jobSeekersUnreadMessagesCount-- : updatedShortConversation.employersUnreadMessagesCount--;
                setConversationsToShow(prevConversations => {
                    const conversationIndex = prevConversations.findIndex(conversation => conversation.id === updatedShortConversation.id);
                    const updatedConversations = [...prevConversations];
                    if (conversationIndex !== -1) {
                        updatedConversations[conversationIndex] = {...updatedShortConversation};
                    }
                    return updatedConversations;
                });
            }
        });

        return () => observer.disconnect();
    }, []);

    async function markMessageAsRead() {
        try {
            if (message.isRead) {
                return;
            }
            if (message.jobSeekerId && !isMyMessage) {
                await chatHubService.readMessageFromJobSeeker(message.id, message.jobSeekerId);
            } else if (message.employerId && !isMyMessage) {
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
                    {isMyMessage ? "Me" : getMessageSenderName(message, conversation)}
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
                    {isMessageRead ? "Read" : "Delivered"}
                </div>
            }
        </div>
    )
}

export default Message;
