import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './ShortConversationInfoForEmployer.scss';
import {ConversationDTO} from "../../../../DTOs/MessagingDTOs/ConversationDTO";
import {useNavigate} from "react-router-dom";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import {getConversationLastMessageFormattedTime
} from "../../../../utils/convertLogic/formatDate";
import {useEmployerMessagingConversation} from "../../../../hooks/contextHooks/useEmployerMessagingConversation";
import {ChatHubService} from "../../../../services/chatHubService";

interface ShortConversationInfoForEmployerProps {
    conversationInfo : ConversationDTO;
    setConversationsToShow : Dispatch<SetStateAction<ConversationDTO[]>>;
}

const ShortConversationInfoForEmployer: FC<ShortConversationInfoForEmployerProps> = ({
    conversationInfo,
    setConversationsToShow
                                                               }) => {
    const chatHubService = ChatHubService.getInstance();
    const {conversation} = useEmployerMessagingConversation();
    const navigate = useNavigate();
    const [lastMessageTime, setLastMessageTime] = useState(getConversationLastMessageFormattedTime(conversationInfo.lastModified) || "");
    const [lastMessage, setLastMessage] = useState(conversationInfo.messages[conversationInfo.messages.length-1] || null);

    useEffect(() => {
        if (conversationInfo.id != conversation?.id){
            chatHubService.registerShortConversationUpdateOnMessageReceive((message, senderId) => {
                if (message.conversationId == conversationInfo.id){
                    conversationInfo.messages.push(message);
                    conversationInfo.lastModified = message.sentAt;
                    setConversationsToShow(prevConversations => {
                        const conversationIndex = prevConversations.findIndex(conversation => conversation.id === conversationInfo.id);
                        const updatedConversations = [...prevConversations];
                        if (conversationIndex !== -1) {
                            updatedConversations[conversationIndex] = {...conversationInfo};
                        }
                        return updatedConversations;
                    });
                    console.log(`setLast 1 for ${conversationInfo}`)
                    setLastMessage(message)
                    setLastMessageTime(getConversationLastMessageFormattedTime(message.sentAt));
                }
            });
        }
    }, []);
    
    useEffect(() => {
        console.log(`setLast 2 for ${conversationInfo}`)
        setLastMessage(conversationInfo.messages[conversationInfo.messages.length-1])
    },[conversationInfo])

    useEffect(() => {
        if (conversationInfo.id != conversation?.id){
            return;
        }
        const newLastMessage = conversation?.messages[conversation.messages.length-1];
        if (!newLastMessage){
            return;
        }
        console.log(`setLast 3 for ${conversationInfo}`)
        setLastMessage(newLastMessage);
        setLastMessageTime(getConversationLastMessageFormattedTime(newLastMessage.sentAt));
    }, [conversation]);
    
    function navigateToFullConversation(){
        navigate(`${EmployerPagesPaths.MESSAGES}?conversationId=${conversationInfo.id}`);
    }
    
    
    return (
        <div className={conversation?.id == conversationInfo.id ? "selected-conversation-short-info-box" : "conversation-short-info-box"}>
            <div
                onClick={navigateToFullConversation}
                className="short-conv-info-container">
                <div className={"conversation-topic-info"}>
                    <div className={"dark-default-text bold-text"}>
                        {(conversationInfo.jobSeeker.firstName && conversationInfo.jobSeeker.lastName) ? 
                            `${conversationInfo.jobSeeker.firstName} ${conversationInfo.jobSeeker.lastName}` : 
                        "Not specified"}
                    </div>
                    <div className={"dark-small-text"}>
                        {conversationInfo.job.jobTitle}
                    </div>
                    <div className={"last-message-block"}>
                        {lastMessage?.content || ""}
                    </div>
                </div>
                <div className={"last-conversation-interaction"}>
                    {conversationInfo?.messages.length != 0 ? lastMessageTime : ""}
                </div>
            </div>
            <div className={"content-separation-line"}/>
        </div>
    )
}

export default ShortConversationInfoForEmployer;
