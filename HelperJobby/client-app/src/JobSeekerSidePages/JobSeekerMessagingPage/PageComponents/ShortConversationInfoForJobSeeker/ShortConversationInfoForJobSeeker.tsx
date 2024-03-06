import React, {FC, useEffect, useState} from 'react';
import './ShortConversationInfoForJobSeeker.scss';
import {useNavigate, useSearchParams} from "react-router-dom";
import {getConversationLastMessageFormattedTime} from "../../../../utils/convertLogic/formatDate";
import {isNanAfterIntParse} from "../../../../utils/validationLogic/numbersValidators";
import {ConversationDTO} from "../../../../DTOs/MessagingDTOs/ConversationDTO";
import JobSeekerPagesPaths from "../../../../AppRoutes/Paths/JobSeekerPagesPaths";  
import {useJobSeekerMessagingConversation} from "../../../../hooks/contextHooks/useJobSeekerMessagingConversation";

interface ShortConversationInfoForJobSeekerProps {
    conversationInfo: ConversationDTO
}

const ShortConversationInfoForJobSeeker: FC<ShortConversationInfoForJobSeekerProps> = ({
                                                                                           conversationInfo
                                                                                       }
) => {
    const [searchParams] = useSearchParams();
    const conversationId = searchParams.get("conversationId");
    const navigate = useNavigate();
    const [isSelectedConversation, setIsSelectedConversation] = useState(getInfoAboutSelectedConversation);
    const [lastMessageTime, setLastMessageTime] = useState(getConversationLastMessageFormattedTime(conversationInfo.lastModified));
    const [lastMessage, setLastMessage] = useState(conversationInfo.messages[conversationInfo.messages.length-1] || null);
    const {conversation} = useJobSeekerMessagingConversation();
    
    useEffect(() => {
        setIsSelectedConversation(getInfoAboutSelectedConversation);
    }, [conversationId]);

    useEffect(() => {
        const newLastMessage = conversation?.messages[conversation.messages.length-1];
        if (!newLastMessage){
            return;
        }
        setLastMessage(newLastMessage);
        setLastMessageTime(getConversationLastMessageFormattedTime(newLastMessage.sentAt));
    }, [conversation]);


    function getInfoAboutSelectedConversation() {
        if (conversationId && !isNanAfterIntParse(conversationId)) {
            if (conversationInfo.id == parseInt(conversationId)) {
                return true;
            }
        }

        return false;
    }

    function navigateToFullConversation() {
        navigate(`${JobSeekerPagesPaths.CONVERSATIONS}?conversationId=${conversationInfo.id}`);
    }

    return (
        <div
            className={isSelectedConversation ? "selected-conversation-short-info-box" : "conversation-short-info-box"}>
            <div
                onClick={navigateToFullConversation}
                className="short-conv-info-container">
                <div className={"conversation-topic-info"}>
                    <div className={"dark-default-text bold-text"}>
                        {conversationInfo.employer.fullName}
                    </div>
                    <div className={"dark-small-text"}>
                        {conversationInfo.job.jobTitle}
                    </div>
                    <div className={"last-message-block"}>
                        {lastMessage.content || ""}
                    </div>
                </div>
                <div className={"last-conversation-interaction"}>
                    {lastMessageTime}
                </div>
            </div>
            <div className={"content-separation-line"}/>
        </div>
    )

}

export default ShortConversationInfoForJobSeeker;
