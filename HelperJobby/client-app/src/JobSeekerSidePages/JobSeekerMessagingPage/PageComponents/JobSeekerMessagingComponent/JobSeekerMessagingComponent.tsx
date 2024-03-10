import React, {FC, useEffect, useState} from 'react';
import './JobSeekerMessagingComponent.scss';
import PageWrapWithHeader from "../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";
import JobSeekerConversation from "../JobSeekerConversation/JobSeekerConversation";
import {useNavigate} from "react-router-dom";
import {ConversationService} from "../../../../services/conversationService";
import {ConversationDTO} from "../../../../DTOs/MessagingDTOs/ConversationDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {useJobSeeker} from "../../../../hooks/contextHooks/useJobSeeker";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import JobSeekerPagesPaths from "../../../../AppRoutes/Paths/JobSeekerPagesPaths";
import {useJobSeekerMessagingConversation} from "../../../../hooks/contextHooks/useJobSeekerMessagingConversation";
import ShortConversationInfo from "../../../../Components/ShortConversationInfo/ShortConversationInfo";
import {AccountTypes} from "../../../../enums/utilityEnums/AccountTypes";

interface JobSeekerMessagingComponentProps {
}

const JobSeekerMessagingComponent: FC<JobSeekerMessagingComponentProps> = () => {
    const navigate = useNavigate();
    const {setJobSeeker} = useJobSeeker();
    const [loading, setLoading] = useState(true);
    const conversationService = new ConversationService();
    const [conversationsToShow, setConversationsToShow] = useState<ConversationDTO[]>([]);
    const {conversation} = useJobSeekerMessagingConversation();
    
    useEffect(() => {
        loadJobSeekerAllConversations();
    }, []);


    async function loadJobSeekerAllConversations() {
        try {
            setLoading(true);
            const retrievedConversations = await conversationService.getCurrentJobSeekerConversations();
            setJobSeeker(prev => {
                return prev && {
                    ...prev,
                    conversations: retrievedConversations
                }
            });
            setConversationsToShow(retrievedConversations);
            if (retrievedConversations.length != 0) {
                navigate(`${JobSeekerPagesPaths.CONVERSATIONS}?conversationId=${retrievedConversations[0].id}`);
            }
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className={"js-msg-page-layout"}>
            <PageWrapWithHeader>
                <div className={"js-msg-page-background"}>
                    <div className={"js-messaging-window-container"}>
                        <div className={"js-inbox-fb"}>
                            <div className="js-inbox-header">
                                Messages
                            </div>
                            <div className={"content-separation-line"}/>
                            {
                                loading ?
                                    <LoadingPage/>
                                    :
                                    conversationsToShow.length != 0 &&
                                    <div className={"conversations-container"}>
                                        {
                                            conversationsToShow.map((conv, index) => (
                                                <ShortConversationInfo conversationInfo={conv}
                                                                       conversation={conversation}
                                                                       secondParticipantName={conv.employer.fullName || "Not specified"}
                                                                       setConversationsToShow={setConversationsToShow}
                                                                       navigateToFullConversationPath={`${JobSeekerPagesPaths.CONVERSATIONS}?conversationId=${conv.id}`}
                                                                       shortConversationType={AccountTypes.jobSeeker}
                                                                       key={index}/>
                                            ))
                                        }
                                    </div>

                            }

                        </div>
                        <JobSeekerConversation
                            setConversationsToShow={setConversationsToShow}
                        /></div>
                </div>
            </PageWrapWithHeader>
        </div>
    )
}

export default JobSeekerMessagingComponent;
