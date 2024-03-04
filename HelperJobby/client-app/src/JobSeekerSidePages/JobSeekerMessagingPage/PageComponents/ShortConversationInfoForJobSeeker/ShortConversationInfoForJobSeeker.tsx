import React, {FC, useEffect, useState} from 'react';
import './ShortConversationInfoForJobSeeker.scss';
import {useNavigate, useSearchParams} from "react-router-dom";
import {getConversationLastMessageFormattedTime} from "../../../../utils/convertLogic/formatDate";
import {isNanAfterIntParse} from "../../../../utils/validationLogic/numbersValidators";
import {ConversationDTO} from "../../../../DTOs/MessagingDTOs/ConversationDTO";
import JobSeekerPagesPaths from "../../../../AppRoutes/Paths/JobSeekerPagesPaths";

interface ShortConversationInfoForJobSeekerProps {
    conversation: ConversationDTO
}

const ShortConversationInfoForJobSeeker: FC<ShortConversationInfoForJobSeekerProps> = ({
                                                                                           conversation
                                                                                       }
) => {
    const [searchParams] = useSearchParams();
    const employerId = searchParams.get("employerId");
    const jobId = searchParams.get("jobId");
    const conversationId = searchParams.get("conversationId");
    const navigate = useNavigate();
    const [isSelectedConversation, setIsSelectedConversation] = useState(getInfoAboutSelectedConversation);
    const [lastMessageTime, setLastMessageTime] = useState(getConversationLastMessageFormattedTime(conversation.lastModified));

    useEffect(() => {
        setIsSelectedConversation(getInfoAboutSelectedConversation);
    }, [jobId, conversationId, employerId]);


    function getInfoAboutSelectedConversation() {
        if (employerId && jobId && !isNanAfterIntParse(employerId) && !isNanAfterIntParse(jobId)) {
            if (conversation.jobId == parseInt(jobId) && conversation.jobSeekerId == parseInt(jobId)) {
                return true;
            }
        } else if (conversationId && !isNanAfterIntParse(conversationId)) {
            if (conversation.id == parseInt(conversationId)) {
                return true;
            }
        }

        return false;
    }

    function navigateToFullConversation() {
        navigate(`${JobSeekerPagesPaths.CONVERSATIONS}?conversationId=${conversation.id}`);
    }

    return (
        <div
            className={isSelectedConversation ? "selected-conversation-short-info-box" : "conversation-short-info-box"}>
            <div
                onClick={navigateToFullConversation}
                className="short-conv-info-container">
                <div className={"conversation-topic-info"}>
                    <div className={"dark-default-text bold-text"}>
                        {conversation.employer.fullName}
                    </div>
                    <div className={"dark-small-text"}>
                        {conversation.job.jobTitle}
                    </div>
                    <div className={"last-message-block"}>
                        {conversation.messages[0].content}
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
