import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './ShortConversationInfo.scss';
import {ConversationDTO} from "../../DTOs/MessagingDTOs/ConversationDTO";
import {ChatHubService} from "../../services/chatHubService";
import {useNavigate} from "react-router-dom";
import {onShortConversationMessagesUpdate} from "../../utils/messaging/messagingEventsHandlers";
import {getConversationLastMessageFormattedTime} from "../../utils/convertLogic/formatDate";
import {AccountTypes} from "../../enums/utilityEnums/AccountTypes";

interface ShortConversationInfoForEmployerProps {
    conversationInfo: ConversationDTO;
    setConversationsToShow: Dispatch<SetStateAction<ConversationDTO[]>>;
    conversation: ConversationDTO | null;
    secondParticipantName: string;
    navigateToFullConversationPath: string;
    shortConversationType: AccountTypes
}

const ShortConversationInfo: FC<ShortConversationInfoForEmployerProps> = ({
                                                                              conversationInfo,
                                                                              setConversationsToShow,
                                                                              conversation,
                                                                              secondParticipantName,
                                                                              navigateToFullConversationPath,
                                                                              shortConversationType
                                                                          }) => {
    const chatHubService = ChatHubService.getInstance();
    const navigate = useNavigate();
    const [lastMessage, setLastMessage] = useState(conversationInfo.messages[conversationInfo.messages.length - 1] || null);
    const [numberOfUnreadMessages, setNumberOfUnreadMessages] =
        useState(shortConversationType == AccountTypes.employer ? conversationInfo.employersUnreadMessagesCount : conversationInfo.jobSeekersUnreadMessagesCount);

    useEffect(() => {
        if (conversationInfo.id != conversation?.id) {
            chatHubService.registerShortConversationUpdateOnMessageReceive((message) => {
                onShortConversationMessagesUpdate(message, conversationInfo, setConversationsToShow, setLastMessage);
            });
        }
    }, []);

    useEffect(() => {
        setLastMessage(conversationInfo.messages[conversationInfo.messages.length - 1]);
        if (shortConversationType == AccountTypes.employer) {
            setNumberOfUnreadMessages(conversationInfo.employersUnreadMessagesCount)
        } else {
            setNumberOfUnreadMessages(conversationInfo.jobSeekersUnreadMessagesCount)
        }
    }, [conversationInfo])

    useEffect(() => {
        if (conversationInfo.id != conversation?.id) {
            return;
        }
        const newLastMessage = conversation?.messages[conversation.messages.length - 1];
        if (!newLastMessage) {
            return;
        }
        if (shortConversationType == AccountTypes.employer) {
            setNumberOfUnreadMessages(conversation.employersUnreadMessagesCount)
        } else {
            setNumberOfUnreadMessages(conversation.jobSeekersUnreadMessagesCount)
        }
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
                        {conversationInfo.job.jobTitle}
                    </div>
                    <div className={"last-message-block"}>
                        {lastMessage?.content}
                    </div>
                </div>
                <div className="conversation-update-info-container">
                    <div className={`last-conversation-interaction ${numberOfUnreadMessages > 0 ? "bold-text" : ""}`}>
                        {lastMessage?.sentAt ? getConversationLastMessageFormattedTime(lastMessage.sentAt) : ""}
                    </div>
                    {numberOfUnreadMessages != 0 &&
                        <div className={"unread-messages-count-container"}>
                            {numberOfUnreadMessages}
                        </div>
                    }
                </div>

            </div>
            <div className={"content-separation-line"}/>
        </div>
    )
}

export default ShortConversationInfo;
