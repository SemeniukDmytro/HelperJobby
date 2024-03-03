import React, {FC, useEffect, useState} from 'react';
import './ShortConversationInfo.scss';
import {ConversationDTO} from "../../../../DTOs/MessagingDTOs/ConversationDTO";
import {useNavigate, useSearchParams} from "react-router-dom";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import {isNanAfterIntParse} from "../../../../utils/validationLogic/numbersValidators";
import {
    formatAMPM,
    getDate_MMM_DD,
    getFullDate_MMMM_DD_YYYY
} from "../../../../utils/convertLogic/GetFullDate_MMMM_DD_YYYY";

interface ShortConversationInfoProps {
    conversation : ConversationDTO
}

const ShortConversationInfo: FC<ShortConversationInfoProps> = ({
    conversation
                                                               }) => {
    const [searchParams] = useSearchParams();
    const candidateId = searchParams.get("jobSeekerId");
    const jobId = searchParams.get("jobId");
    const conversationId = searchParams.get("conversationId");
    const navigate = useNavigate();
    const [isSelectedConversation, setIsSelectedConversation] = useState(getInfoAboutSelectedConversation);
    const [lastMessageTime, setLastMessageTime] = useState(getConversationLastMessageFormattedTime);

    useEffect(() => {
        setIsSelectedConversation(getInfoAboutSelectedConversation);
    }, [jobId, conversationId, candidateId]);
    
    
    function getInfoAboutSelectedConversation(){
        if (candidateId && jobId && !isNanAfterIntParse(candidateId) && !isNanAfterIntParse(jobId)){
            if (conversation.jobId == parseInt(jobId) && conversation.jobSeekerId == parseInt(jobId)){
                return true;
            }
        }
        else if (conversationId && !isNanAfterIntParse(conversationId)){
            if (conversation.id == parseInt(conversationId)){
                return true;
            }
        }
        
        return false;
    }
    
    function navigateToFullConversation(){
        navigate(`${EmployerPagesPaths.MESSAGES}?conversationId=${conversation.id}`);
    }
    
    function getConversationLastMessageFormattedTime(){
        const date = new Date(conversation.lastModified);
        const currentDate = new Date();
        if (date.getDay() == currentDate.getDay()){
            return formatAMPM(date);
        }
        else if (date.getFullYear() == currentDate.getFullYear()){
            return getDate_MMM_DD(conversation.lastModified);
        }
        else {
            return getFullDate_MMMM_DD_YYYY(conversation.lastModified);
        }
    }
    
    return (
        <div className={isSelectedConversation ? "selected-conversation-short-info-box" : "conversation-short-info-box"}>
            <div
                onClick={navigateToFullConversation}
                className="short-conv-info-container">
                <div className={"conversation-topic-info"}>
                    <div className={"dark-default-text bold-text"}>
                        {conversation.jobSeeker.firstName} {conversation.jobSeeker.lastName}
                    </div>
                    <div className={"dark-small-text"}>
                        {conversation.job.jobTitle}
                    </div>
                    <div className={"last-message-block"}>
                        adddddddddddddddddddddddddddddddddddddddddddddd
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

export default ShortConversationInfo;
