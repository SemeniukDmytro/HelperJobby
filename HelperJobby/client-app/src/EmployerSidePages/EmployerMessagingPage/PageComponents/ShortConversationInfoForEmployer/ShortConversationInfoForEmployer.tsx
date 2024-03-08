import React, {FC, useEffect, useState} from 'react';
import './ShortConversationInfoForEmployer.scss';
import {ConversationDTO} from "../../../../DTOs/MessagingDTOs/ConversationDTO";
import {useNavigate, useSearchParams} from "react-router-dom";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import {isNanAfterIntParse} from "../../../../utils/validationLogic/numbersValidators";
import {getConversationLastMessageFormattedTime
} from "../../../../utils/convertLogic/formatDate";
import {useEmployerMessagingConversation} from "../../../../hooks/contextHooks/useEmployerMessagingConversation";

interface ShortConversationInfoForEmployerProps {
    conversationInfo : ConversationDTO
}

const ShortConversationInfoForEmployer: FC<ShortConversationInfoForEmployerProps> = ({
    conversationInfo
                                                               }) => {
    const [searchParams] = useSearchParams();
    const {conversation} = useEmployerMessagingConversation();
    const candidateId = searchParams.get("jobSeekerId");
    const jobId = searchParams.get("jobId");
    const conversationId = searchParams.get("conversationId");
    const navigate = useNavigate();
    const [isSelectedConversation, setIsSelectedConversation] = useState(getInfoAboutSelectedConversation);
    const [lastMessageTime, setLastMessageTime] = useState(getConversationLastMessageFormattedTime(conversationInfo.lastModified) || "");
    const [lastMessage, setLastMessage] = useState(conversationInfo.messages[conversationInfo.messages.length-1] || null);

    useEffect(() => {
        if (!conversation){
            setIsSelectedConversation(false);
            return;
        }
        setIsSelectedConversation(getInfoAboutSelectedConversation);
    }, [jobId, conversationId, candidateId, conversation]);

    useEffect(() => {
        if (conversationInfo.id != conversation?.id){
            return;
        }
        const newLastMessage = conversation?.messages[conversation.messages.length-1];
        if (!newLastMessage){
            return;
        }
        setLastMessage(newLastMessage);
        setLastMessageTime(getConversationLastMessageFormattedTime(newLastMessage.sentAt));
    }, [conversation]);
    
    
    function getInfoAboutSelectedConversation(){
        if (!conversation){
            return false;
        }
        if (candidateId && jobId && !isNanAfterIntParse(candidateId) && !isNanAfterIntParse(jobId)){
            if (conversationInfo.jobId == parseInt(jobId) && conversationInfo.jobSeekerId == parseInt(jobId)){
                return true;
            }
        }
        else if (conversationId && !isNanAfterIntParse(conversationId)){
            if (conversationInfo.id == parseInt(conversationId)){
                return true;
            }
        }
        
        return false;
    }
    
    function navigateToFullConversation(){
        navigate(`${EmployerPagesPaths.MESSAGES}?conversationId=${conversationInfo.id}`);
    }
    
    
    return (
        <div className={isSelectedConversation ? "selected-conversation-short-info-box" : "conversation-short-info-box"}>
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
