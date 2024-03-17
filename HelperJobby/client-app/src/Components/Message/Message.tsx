import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './Message.scss';
import {MessageDTO} from "../../DTOs/MessagingDTOs/MessageDTO";
import {formatAMPM} from "../../utils/convertLogic/formatDate";
import {ChatHubService} from "../../services/chatHubService";
import {ConversationDTO} from "../../DTOs/MessagingDTOs/ConversationDTO";
import {getMessageSenderName} from "../../utils/messaging/getMessageSenderName";
import ReadTicks from "../Icons/ReadTicks";
import SentTick from "../Icons/SentTick";

interface MessageProps {
    message: MessageDTO;
    isMyMessage: boolean;
    conversation: ConversationDTO;
    setConversation: Dispatch<SetStateAction<ConversationDTO | null>>;
    setConversationsToShow: Dispatch<SetStateAction<ConversationDTO[]>>;
    lastMessageRef?: React.RefObject<HTMLDivElement>;
    messagesWindowRef: React.RefObject<HTMLDivElement>;
}

const Message: FC<MessageProps> = ({
                                       message,
                                       isMyMessage,
                                       conversation,
                                       setConversation,
                                       setConversationsToShow,
                                       lastMessageRef,
                                       messagesWindowRef
                                   }) => {
    const chatHubService = ChatHubService.getInstance();
    const messageRef = useRef<HTMLDivElement>(null);
    const [isMessageRead, setIsMessageRead] = useState(message.isRead);


    useEffect(() => {
        if (isMyMessage && message.id == conversation.messages[conversation.messages.length - 1].id) {
            messagesWindowRef.current?.scrollTo({
                top: messagesWindowRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [conversation.messages]);

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
        chatHubService.registerMessageRead((msg) => {
            if (msg.id !== message.id) {
                return;
            }
            setIsMessageRead(true);
            if (isMyMessage) {
                return;
            }
            if (msg.conversationId === conversation.id) {
                setConversation(prev => {
                    if (!prev) return null;
                    const countKey = msg.employerId ? 'jobSeekersUnreadMessagesCount' : 'employersUnreadMessagesCount';
                    const updatedCount = Math.max(prev[countKey] - 1, 0);
                    return {...prev, [countKey]: updatedCount};
                });

                setConversationsToShow(prevConversations => {
                    return prevConversations.map(conversationItem => {
                        if (conversationItem.id === msg.conversationId) {
                            const countKey = msg.employerId ? 'jobSeekersUnreadMessagesCount' : 'employersUnreadMessagesCount';
                            const updatedCount = Math.max(conversationItem[countKey] - 1, 0);
                            return {...conversationItem, [countKey]: updatedCount};
                        }
                        return conversationItem;
                    });
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
        <div ref={lastMessageRef}>
            <div ref={messageRef} className={"message-box"}>
                <div className={"message-additional-info-container"}>
                    <div className="sender-info-and-time-container">
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
                    {isMyMessage &&
                        <div className={"message-status"}>
                            {isMessageRead ? <ReadTicks/> : <SentTick/>}
                        </div>
                    }
                </div>
                <div style={{whiteSpace : "pre"}} className={"light-dark-small-text"}>
                    {message.content}
                </div>
            </div>
        </div>
    )
}

export default Message;
