import React, {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './JobSeekerConversation.scss';
import {ChatHubService} from "../../../../services/chatHubService";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ConversationService} from "../../../../services/conversationService";
import {isNanAfterIntParse} from "../../../../utils/validationLogic/numbersValidators";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import Message from "../../../../Components/Message/Message";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import {useJobSeeker} from "../../../../hooks/contextHooks/useJobSeeker";
import JobSeekerPagesPaths from "../../../../AppRoutes/Paths/JobSeekerPagesPaths";
import {useJobSeekerMessagingConversation} from "../../../../hooks/contextHooks/useJobSeekerMessagingConversation";
import {getConversationMessagesGroupFormattedTime} from "../../../../utils/convertLogic/formatDate";
import OutgoingMessage from "../../../../Components/OutgoingMessage/OutgoingMessage";
import {groupMessagesByDate} from "../../../../utils/messaging/groupMessagesByDate";
import {onConversationsUpdate, onMessageSent} from "../../../../utils/messaging/messagingEventsHandlers";
import {ConversationDTO} from "../../../../DTOs/MessagingDTOs/ConversationDTO";

interface JobSeekerConversationProps {
    conversationsToShow : ConversationDTO[];
    setConversationsToShow : Dispatch<SetStateAction<ConversationDTO[]>>
}

const JobSeekerConversation: FC<JobSeekerConversationProps> = ({
    conversationsToShow,
    setConversationsToShow
                                                               }) => {
    const {jobSeeker, fetchJobSeeker} = useJobSeeker();
    const chatHubService = ChatHubService.getInstance();
    const [searchParams] = useSearchParams();
    const conversationId = searchParams.get("conversationId");
    const [messageInput, setMessageInput] = useState("");
    const navigate = useNavigate();
    const conversationService = new ConversationService();
    const [loading, setLoading] = useState(true);
    const messagesWindowRef = useRef<HTMLDivElement>(null);
    const {conversation, setConversation} = useJobSeekerMessagingConversation();
    const [sendingMessages, setSendingMessages] = useState<string[]>([]);

    useEffect(() => {
        fetchJobSeeker();

        chatHubService.startConnection().catch(err => console.error('Connection failed:', err));
        
        return () => {
            chatHubService.disconnect();
        }
        
    }, []);

    useEffect(() => {
        chatHubService.registerConversationsUpdateHandler((message) => {
            onConversationsUpdate(message, setConversationsToShow);
        });

        chatHubService.registerMessageSent((message) => {
            onMessageSent(message, conversation, setConversation, setConversationsToShow);
        });

        chatHubService.registerMessageReceivedHandler((message, senderId) => {
            if (senderId != jobSeeker?.id) {
                onMessageSent(message, conversation, setConversation, setConversationsToShow)
            }
        });
    }, [conversation]);
    
    useEffect(() => {
        if (messagesWindowRef.current) {
            const messagesContainer = messagesWindowRef.current;
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }, [[], conversation?.messages]);

    useEffect(() => {
        if (!conversationId || isNanAfterIntParse(conversationId))
        {
            navigate(JobSeekerPagesPaths.CONVERSATIONS);
            return;

        }

        loadConversationInfo();

        return () => {
            unsubscribeFromConversationEvents();
        }
    }, [conversationId]);

    function unsubscribeFromConversationEvents() {
        chatHubService.unregisterMessageReceivedHandler()
        chatHubService.unregisterMessageSentHandler();
    }
    

    async function loadConversationInfo() {
        try {
            setLoading(true);
            if (conversationId) {
                const retrievedConversation = await conversationService.getConversationById(parseInt(conversationId));
                setConversation(retrievedConversation);
            }

        } catch (err) {
            logErrorInfo(err);
        } finally {
            setLoading(false);
        }
    }
    

    async function sendMessage() {
        if (!messageInput.trim()) return;
        const conversationId = conversation?.id || null;
        setMessageInput("");
        setSendingMessages(prev => [...prev, messageInput]);
        try {
            await chatHubService.sendMessageToEmployer(conversation!.employerId, messageInput, conversation!.jobId, conversation);
            setSendingMessages(prev => prev.slice(0, -1));
        } catch (err) {
            logErrorInfo(err)
        }
    }

    function onMessageChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setMessageInput(e.target.value);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (messageInput.trim()) {
                sendMessage();
            }
        }
    }
    
    return (
        <div className={"js-conversation-fb"}>
            <div className={"conversation-details"}>
                <div className={"chat-window"}>
                    <div className={"chat-window-header"}>
                        <div className={"dark-small-text bold-text"}>
                            Job title
                        </div>
                        <div className={"grey-small-text"}>
                            Company name
                        </div>
                    </div>
                    <div className={"content-separation-line"}/>
                    <div className={"apply-date-container"}>
                    <span className={"semi-dark-small-text"}>
                        Candidate applied to this position on Date
                    </span>
                    </div>
                    <div className={"content-separation-line"}/>
                    <div
                        ref={messagesWindowRef}
                        className={"messages-window"}>
                        {loading ? <LoadingPage/> :
                            conversation?.messages &&
                            Object.entries(groupMessagesByDate(conversation!.messages)).map(([date, messages]) => (
                                <div key={date}>
                                    <div className={"messages-group-date-container"}>
                                        <div className="messages-group-date-line"/>
                                        <span
                                            className={"messages-group-date"}>{getConversationMessagesGroupFormattedTime(date)}</span>
                                        <div className={"messages-group-date-line"}/>
                                    </div>
                                    {messages.map((message, index) => (
                                        <Message
                                            message={message}
                                            isMyMessage={message.jobSeekerId == jobSeeker?.id}
                                            conversation={conversation}
                                            setConversation={setConversation}
                                            key={index}
                                        />
                                    ))}
                                </div>
                            ))
                        }
                        {sendingMessages.map((msg, index) => (
                            <OutgoingMessage content={msg} key={index}/>
                        ))}
                    </div>
                    <div className={"write-message-container"}>
                    <textarea className={"message-input"}
                              placeholder={"Write your message"}
                              value={messageInput}
                              onChange={onMessageChange}
                              onKeyDown={handleKeyDown}
                    >
                        
                    </textarea>
                        <div className={"br-corner-button mr05rem mt05rem mb05rem"}>
                            <button
                                onClick={sendMessage}
                                className={"blue-button"}
                                disabled={messageInput.length == 0}
                            >
                                Send
                            </button>
                        </div>

                    </div>
                </div>
                <div className={"conversation-job-details-container"}>
                    <div className={"conversation-job-details-header"}>
                        <div className="grey-default-text mr1rem    ">
                            <FontAwesomeIcon icon={faBuilding}/>
                        </div>
                        <div className={"conversation-main-job-details"}>
                            <div className={"dark-default-text bold-text"}>
                                Job title
                            </div>
                            <div className={"semi-dark-small-text"}>
                                Organization Name
                            </div>
                            <div className={"semi-dark-small-text"}>
                                Job Location
                            </div>
                        </div>
                    </div>
                    <div className={"content-separation-line"}></div>
                    <div className={"conversation-job-full-info-container"}>
                        <div className={"dark-small-text bold-text"}>
                            Job type
                        </div>
                        <div className={"semi-dark-small-text"}>
                            Job types
                        </div>
                        <div className={"dark-small-text bold-text"}>
                            Salary
                        </div>
                        <div className={"semi-dark-small-text"}>
                            Job salary
                        </div>
                        <div className={"dark-small-text bold-text"}>
                            Job shift
                        </div>
                        <div className={"semi-dark-small-text mb05rem"}>
                            Job schedule
                        </div>
                        <div>
                        <span className={"default-link"}>
                            View full job description
                        </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default JobSeekerConversation;
