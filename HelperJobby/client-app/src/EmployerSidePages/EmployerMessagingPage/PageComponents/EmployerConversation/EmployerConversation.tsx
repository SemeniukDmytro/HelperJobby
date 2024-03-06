import React, {ChangeEvent, FC, useEffect, useMemo, useRef, useState} from 'react';
import './EmployerConversation.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import {ChatHubService} from "../../../../services/chatHubService";
import {useNavigate, useSearchParams} from "react-router-dom";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import {ConversationService} from "../../../../services/conversationService";
import {isNanAfterIntParse} from "../../../../utils/validationLogic/numbersValidators";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {MessageDTO} from "../../../../DTOs/MessagingDTOs/MessageDTO";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import Message from "../../../../Components/Message/Message";
import {useEmployer} from "../../../../hooks/contextHooks/useEmployer";
import {useEmployerMessagingConversation} from "../../../../hooks/contextHooks/useEmployerMessagingConversation";
import {groupMessagesByDate} from "../../../../utils/groupMessagesByDate";
import {
    getConversationMessagesGroupFormattedTime
} from "../../../../utils/convertLogic/formatDate";

interface EmployerJobChatComponentProps {
}

const EmployerConversation: FC<EmployerJobChatComponentProps> = () => {
    const {employer} = useEmployer();
    const chatHubService = useMemo(() => new ChatHubService(), []);
    const [searchParams] = useSearchParams();
    const candidateId = searchParams.get("jobSeekerId");
    const jobId = searchParams.get("jobId");
    const conversationId = searchParams.get("conversationId");
    const [messageInput, setMessageInput] = useState("");
    const navigate = useNavigate();
    const conversationService = new ConversationService();
    const [loading, setLoading] = useState(true);
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const messagesWindowRef = useRef<HTMLDivElement>(null);
    const {conversation, setConversation} = useEmployerMessagingConversation();

    useEffect(() => {
        if (messagesWindowRef.current) {
            const messagesContainer = messagesWindowRef.current;
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }, [[], conversation?.messages]);

    useEffect(() => {
        if ((!jobId || !candidateId || isNanAfterIntParse(jobId) || isNanAfterIntParse(candidateId)) && (!conversationId || isNanAfterIntParse(conversationId))) {
            navigate(EmployerPagesPaths.MESSAGES);
            return;

        }
        if (conversationId && (jobId || candidateId)) {
            navigate(EmployerPagesPaths.MESSAGES);
            return;
        }
        chatHubService.startConnection().catch(err => console.error('Connection failed:', err));

        chatHubService.registerMessageReceivedHandler((message, senderId) => {
            if (senderId != employer?.id) {
                onMessageSent(message)
            }
        });
        chatHubService.registerMessageSent((message) => {
            onMessageSent(message);
        });

        loadConversationInfo();
    }, [conversationId, candidateId, jobId]);

    async function loadConversationInfo() {
        try {
            setLoading(true);
            if (jobId && candidateId) {
                const retrievedConversation = await conversationService
                    .getCandidatePotentialConversation(parseInt(candidateId), parseInt(jobId));
                setConversation(retrievedConversation);
            } else if (conversationId) {
                const retrievedConversation = await conversationService.getConversationById(parseInt(conversationId));
                setConversation(retrievedConversation);
            }

        } catch (err) {
            logErrorInfo(err);
        } finally {
            setLoading(false);
        }
    }

    function onMessageSent(message: MessageDTO) {
        setConversation(prev => {
            return prev ?
                {
                    ...prev,
                    messages: [...prev.messages, message],
                    lastModified: message.sentAt
                }
                :
                {
                    ...message.conversation,
                    messages: [message],
                    lastModified: message.sentAt
                }
        })
    }

    async function sendMessage() {
        if (!messageInput.trim()) return;
        const conversationId = conversation?.id || null;
        setMessageInput("");
        await chatHubService.sendMessageToJobSeeker(conversation!.jobSeekerId, messageInput, conversation!.jobId, conversationId);
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
        <div className={"emp-conversation-fb"}>
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
                <div className={"content-separation-line"}>

                </div>
                <div
                    ref={messagesWindowRef}
                    className={"messages-window"}>
                    {loading ? <LoadingPage/> :
                        conversation?.messages &&
                        Object.entries(groupMessagesByDate(conversation!.messages)).map(([date, messages]) => (
                            <div key={date}>
                                <div className={"messages-group-date-container"}>
                                    <div className="messages-group-date-line"/>
                                    <span className={"messages-group-date"}>{getConversationMessagesGroupFormattedTime(date)}</span>
                                    <div className={"messages-group-date-line"}/>
                                </div>
                                {messages.map((message, index) => (
                                    <Message
                                        message={message}
                                        senderName={employer!.fullName}
                                        isMyMessage={message.employerId == employer?.id}
                                        key={index}
                                        messageRef={index === conversation!.messages.length - 1 ? lastMessageRef : null}
                                    />
                                ))}

                            </div>
                        ))
                    }
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
    )
}

export default EmployerConversation;
