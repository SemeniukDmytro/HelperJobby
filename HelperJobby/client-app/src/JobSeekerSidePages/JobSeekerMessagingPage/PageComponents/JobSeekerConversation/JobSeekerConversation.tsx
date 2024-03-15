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
import {formatDate, getFormattedTimeWithWeekdays} from "../../../../utils/convertLogic/formatDate";
import OutgoingMessage from "../../../../Components/OutgoingMessage/OutgoingMessage";
import {groupMessagesByDate} from "../../../../utils/messaging/groupMessagesByDate";
import {onConversationsUpdate, onMessageSent} from "../../../../utils/messaging/messagingEventsHandlers";
import {ConversationDTO} from "../../../../DTOs/MessagingDTOs/ConversationDTO";
import {getOldestMessageInteractedWith} from "../../../../utils/messaging/getOldestMessageInteractedWith";
import {jobTypesEnumToStringMap, schedulesEnumToStringMap} from "../../../../utils/convertLogic/enumToStringConverter";
import {formatJobSalaryDisplay} from "../../../../utils/convertLogic/formatJobSalaryDisplay";
import Messaging from "../../../../Components/Icons/Messaging";

interface JobSeekerConversationProps {
    setConversationsToShow: Dispatch<SetStateAction<ConversationDTO[]>>;
    conversationsLoading: boolean
}

const JobSeekerConversation: FC<JobSeekerConversationProps> = ({
                                                                   setConversationsToShow,
                                                                   conversationsLoading
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
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const [oldestUnreadMessageId, setOldestUnreadMessageId] = useState<number | null>(null);

    useEffect(() => {
        if (!loading && lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView();
        }
    }, [loading]);

    useEffect(() => {
        fetchJobSeeker();
        chatHubService.startConnection().catch(err => console.error('Connection failed:', err));
    }, []);

    useEffect(() => {

        chatHubService.registerMessageSent((message) => {
            onMessageSent(message, conversation, setConversation, setConversationsToShow);
        });

        chatHubService.registerMessageReceivedHandler((message, senderId) => {
            if (senderId != jobSeeker?.id) {
                onMessageSent(message, conversation, setConversation, setConversationsToShow);
                onConversationsUpdate(message, setConversationsToShow);

            }
        });
    }, [conversation?.id]);


    useEffect(() => {
        if (!conversationId || isNanAfterIntParse(conversationId)) {
            navigate(JobSeekerPagesPaths.CONVERSATIONS);
            return;

        }

        loadConversationInfo();
    }, [conversationId]);


    async function loadConversationInfo() {
        try {
            setLoading(true);
            if (conversationId) {
                const retrievedConversation = await conversationService.getConversationById(parseInt(conversationId));
                setConversation(retrievedConversation);
                setOldestUnreadMessageId(getOldestMessageInteractedWith(retrievedConversation));
            }

        } catch (err) {
            logErrorInfo(err);
        } finally {
            setLoading(false);
        }
    }


    async function sendMessage() {
        if (!messageInput.trim()) return;
        setMessageInput("");
        setSendingMessages(prev => [...prev, messageInput]);
        try {
            await chatHubService.sendMessageToEmployer(conversation!.employerId, messageInput, conversation!.jobId, conversation?.id || null);
            setSendingMessages(prev => prev.slice(1));
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

    function navigateToJobsPage() {
        navigate("/")
    }

    function navigateToResumeBuild() {
        navigate("/build")
    }

    return (
        <div className={"js-conversation-fb"}>
            <div className={"conversation-details"}>
                {conversationsLoading ? <LoadingPage/> :
                    (!conversation) ?
                        <div className={"messages-recommendation-container"}>
                            <Messaging/>
                            <div className={"message-recommendation-container-header"}>
                                Welcome to Messages
                            </div>
                            {
                                jobSeeker?.conversations && jobSeeker?.conversations.length > 0 ?
                                    <div className={"dark-default-text"}>
                                        Select conversation to start messaging
                                    </div>
                                    :
                                    <>
                                        <div className={"dark-default-text"}>
                                            When an employer contacts you,
                                            you will see messages here.
                                        </div>
                                        <button className={"blue-button mt1rem"} onClick={navigateToJobsPage}>
                                            Find Jobs
                                        </button>
                                        {!jobSeeker?.resume?.id &&
                                            <button className={"light-button-with-margin mt1rem"} onClick={navigateToResumeBuild}>
                                                Upload resume
                                            </button>}
                                    </>
                            }
                        </div>
                        :
                        loading ? <LoadingPage/> :
                            <>
                                <div className={"chat-window"}>
                                    <div className={"chat-window-header"}>
                                        <div className={"dark-small-text bold-text"}>
                                            {conversation?.job.jobTitle}
                                        </div>
                                        <div className={"grey-small-text"}>
                                            {conversation?.employer.organization?.name}
                                        </div>
                                    </div>
                                    <div className={"content-separation-line"}/>
                                    <div className={"apply-date-container"}>
                    <span className={"semi-dark-small-text"}>
                        Candidate applied to this position on&nbsp;
                        <b>{conversation?.jobSeeker.jobApplies[0] ? formatDate(conversation?.jobSeeker.jobApplies[0].dateApplied) : "Info not provided"}</b>
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
                                                            className={"messages-group-date"}>{getFormattedTimeWithWeekdays(date)}</span>
                                                        <div className={"messages-group-date-line"}/>
                                                    </div>
                                                    {messages.map((message, index) => (
                                                        <Message
                                                            message={message}
                                                            isMyMessage={message.jobSeekerId == jobSeeker?.id}
                                                            conversation={conversation}
                                                            setConversation={setConversation}
                                                            setConversationsToShow={setConversationsToShow}
                                                            messagesWindowRef={messagesWindowRef}
                                                            lastMessageRef={message.id === oldestUnreadMessageId ? lastMessageRef : undefined}
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
                                                {conversation?.job.jobTitle}
                                            </div>
                                            <div className={"semi-dark-small-text"}>
                                                {conversation?.employer.organization?.name}
                                            </div>
                                            <div className={"semi-dark-small-text"}>
                                                {conversation?.job.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"content-separation-line"}></div>
                                    <div className={"conversation-job-full-info-container"}>
                                        <div className={"dark-small-text bold-text"}>
                                            Job type
                                        </div>
                                        <div className={"semi-dark-small-text"}>
                                            {conversation?.job.jobType &&
                                                conversation.job.jobType.map((jt, index) => (
                                                    `${jobTypesEnumToStringMap(jt)}${index !== conversation.job.jobType.length - 1 ? ", " : ""}`
                                                ))
                                            }
                                        </div>
                                        <div className={"dark-small-text bold-text"}>
                                            Job salary
                                        </div>
                                        <div className={"semi-dark-small-text"}>
                                            {conversation?.job.salary ? formatJobSalaryDisplay(conversation.job) : "Salary not specified"}
                                        </div>
                                        <div className={"dark-small-text bold-text"}>
                                            Job shift
                                        </div>
                                        <div className={"semi-dark-small-text mb05rem"}>
                                            {conversation?.job.schedule && conversation.job.schedule.length > 0 ?
                                                conversation?.job.schedule.map((sch, index) => (
                                                    `${schedulesEnumToStringMap(sch)}${index !== conversation?.job.schedule.length - 1 ? ", " : ""}`))
                                                :
                                                <div>Info not provided</div>
                                            }

                                        </div>
                                        <div>
                                            <a href={`/viewjob/${conversation?.job.id}`}
                                               target={"_blank"}
                                               rel="noopener noreferrer"
                                               className={"default-link"}>
                                                View full job description
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </>
                }
            </div>
        </div>
    )
}

export default JobSeekerConversation;
