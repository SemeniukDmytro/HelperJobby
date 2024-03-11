import React, {FC, useEffect, useState} from 'react';
import './ShortConversationInfo.scss';
import {ConversationDTO} from "../../DTOs/MessagingDTOs/ConversationDTO";
import {ChatHubService} from "../../services/chatHubService";
import {useNavigate} from "react-router-dom";
import {getConversationLastMessageFormattedTime} from "../../utils/convertLogic/formatDate";
import {AccountTypes} from "../../enums/utilityEnums/AccountTypes";

interface ShortConversationInfoForEmployerProps {
    conversationInfo: ConversationDTO;
    conversation: ConversationDTO | null;
    secondParticipantName: string;
    navigateToFullConversationPath: string;
    shortConversationType: AccountTypes
}

const ShortConversationInfo: FC<ShortConversationInfoForEmployerProps> = ({
                                                                              conversationInfo,
                                                                              conversation,
                                                                              secondParticipantName,
                                                                              navigateToFullConversationPath,
                                                                              shortConversationType
                                                                          }) => {
    const chatHubService = ChatHubService.getInstance();
    const navigate = useNavigate();
    const [shortConversationInfo, setShortConversationInfo] = useState(conversationInfo);
    const [lastMessage, setLastMessage] = useState(conversationInfo.messages[conversationInfo.messages.length - 1] || null);

    useEffect(() => {
        if (conversationInfo.id != conversation?.id) {
            chatHubService.registerShortConversationUpdateOnMessageReceive((message) => {
                if (message.conversationId == conversationInfo.id) {
                    setShortConversationInfo(prev => {
                        const countKey = message.employerId ? 'jobSeekersUnreadMessagesCount' : 'employersUnreadMessagesCount';
                        const updatedCount = prev[countKey] + 1;
                        return {
                            ...prev,
                            [countKey]: updatedCount,
                            messages: [...prev.messages, message],
                            lastModified: message.sentAt
                        }
                    })
                    setLastMessage(message)
                }
            });
        }
    }, []);

    useEffect(() => {
        setShortConversationInfo(conversationInfo)
    }, [conversationInfo])

    useEffect(() => {
        if (conversationInfo.id != conversation?.id) {
            return;
        }
        const newLastMessage = conversation?.messages[conversation.messages.length - 1];
        if (!newLastMessage) {
            return;
        }
        setShortConversationInfo(conversation)
        setLastMessage(newLastMessage);
    }, [conversation]);

    function navigateToFullConversation() {
        navigate(navigateToFullConversationPath);
    }


    return (
        <div
            className={conversation?.id == conversationInfo.id ? "selected-conversation-short-info-box" : "conversation-short-info-box"}>
            <div
                onClick={navigateToFullConversation}
                className="short-conv-info-container">
                <div className={"conversation-topic-info"}>
                    <div className={"dark-default-text bold-text"}>
                        {secondParticipantName}
                    </div>
                    <div className={"dark-small-text"}>
                        {shortConversationInfo.job.jobTitle}
                    </div>
                    <div className={"last-message-block"}>
                        {lastMessage?.content}
                    </div>
                </div>
                <div className="conversation-update-info-container">
                    <div className={`last-conversation-interaction
                     ${(shortConversationType === AccountTypes.jobSeeker && shortConversationInfo.jobSeekersUnreadMessagesCount > 0)
                    || (shortConversationType === AccountTypes.employer && shortConversationInfo.employersUnreadMessagesCount > 0)
                        ? "bold-text" : ""}`}>
                        {lastMessage?.sentAt ? getConversationLastMessageFormattedTime(lastMessage.sentAt) : ""}
                    </div>
                    {((shortConversationType === AccountTypes.jobSeeker && shortConversationInfo.jobSeekersUnreadMessagesCount > 0)
                            || (shortConversationType === AccountTypes.employer && shortConversationInfo.employersUnreadMessagesCount > 0)) &&
                        <div className={"unread-messages-count-container"}>
                            {shortConversationType === AccountTypes.jobSeeker ? shortConversationInfo.jobSeekersUnreadMessagesCount :
                                shortConversationInfo.employersUnreadMessagesCount}
                        </div>
                    }


                </div>

            </div>
            <div className={"content-separation-line"}/>
        </div>
    )
}

export default ShortConversationInfo;
