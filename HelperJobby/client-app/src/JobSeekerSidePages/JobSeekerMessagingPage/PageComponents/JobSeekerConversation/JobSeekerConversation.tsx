import React, {ChangeEvent, FC, useEffect, useMemo, useRef, useState} from 'react';
import './JobSeekerConversation.scss';
import {useEmployer} from "../../../../hooks/contextHooks/useEmployer";
import {ChatHubService} from "../../../../services/chatHubService";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ConversationService} from "../../../../services/conversationService";
import {useEmployerMessagingConversation} from "../../../../hooks/contextHooks/useEmployerMessagingConversation";
import {isNanAfterIntParse} from "../../../../utils/validationLogic/numbersValidators";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {MessageDTO} from "../../../../DTOs/MessagingDTOs/MessageDTO";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import Message from "../../../../Components/Message/Message";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import {useJobSeeker} from "../../../../hooks/contextHooks/useJobSeeker";
import JobSeekerPagesPaths from "../../../../AppRoutes/Paths/JobSeekerPagesPaths";
import {useJobSeekerMessagingConversation} from "../../../../hooks/contextHooks/useJobSeekerMessagingConversation";

interface JobSeekerConversationProps {}

const JobSeekerConversation: FC<JobSeekerConversationProps> = () => {
    const {jobSeeker} = useJobSeeker();
    const chatHubService = ChatHubService.getInstance();
    const [searchParams] = useSearchParams();
    const conversationId = searchParams.get("conversationId");
    const [messageInput, setMessageInput] = useState("");
    const navigate = useNavigate();
    const conversationService = new ConversationService();
    const [loading, setLoading] = useState(true);
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const messagesWindowRef = useRef<HTMLDivElement>(null);
    const {conversation, setConversation} = useJobSeekerMessagingConversation();

    useEffect(() => {
        const messagesWindow = messagesWindowRef.current;

        if (messagesWindow) {
            let scrollTimeout: ReturnType<typeof setTimeout>;

            const handleScroll = () => {
                messagesWindow.classList.add('message-window-scroll');

                clearTimeout(scrollTimeout);

                scrollTimeout = setTimeout(() => {
                    messagesWindow.classList.remove('message-window-scroll');
                }, 500);
            };

            messagesWindow.addEventListener('scroll', handleScroll);
            return () => {
                messagesWindow.removeEventListener('scroll', handleScroll);
                clearTimeout(scrollTimeout);
            };
        }
    }, []);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ block: "end" });
        }
    }, [conversation?.messages]);

    useEffect(() => {
        if (!conversationId || isNanAfterIntParse(conversationId))
        {
            navigate(JobSeekerPagesPaths.CONVERSATIONS);
            return;

        }
        chatHubService.startConnection().catch(err => console.error('Connection failed:', err));

        chatHubService.registerMessageReceivedHandler((message, senderId, conversationId) => {
            if (senderId != jobSeeker?.id){
                onMessageSent(message)
            }
        });
        chatHubService.registerMessageSent((message) => {
            onMessageSent(message);
        });

        loadConversationInfo();
    }, [conversationId]);
    

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
        await chatHubService.sendMessageToEmployer(conversation!.employerId, messageInput, conversation!.jobId, conversationId);
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
                            conversation?.messages.map((message, index) => (
                                <Message
                                    message={message}
                                    senderName={`${jobSeeker?.firstName} ${jobSeeker?.lastName}`}
                                    isMyMessage={message.employerId == jobSeeker?.id}
                                    key={index}
                                    messageRef={index === conversation.messages.length - 1 ? lastMessageRef : null}
                                />
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
        </div>
    )
}

export default JobSeekerConversation;
