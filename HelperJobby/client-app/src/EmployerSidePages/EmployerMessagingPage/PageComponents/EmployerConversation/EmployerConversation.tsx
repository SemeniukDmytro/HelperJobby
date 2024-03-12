import React, {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './EmployerConversation.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding} from "@fortawesome/free-solid-svg-icons";
import {ChatHubService} from "../../../../services/chatHubService";
import {useNavigate, useSearchParams} from "react-router-dom";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import {ConversationService} from "../../../../services/conversationService";
import {isNanAfterIntParse} from "../../../../utils/validationLogic/numbersValidators";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import Message from "../../../../Components/Message/Message";
import {useEmployer} from "../../../../hooks/contextHooks/useEmployer";
import {useEmployerMessagingConversation} from "../../../../hooks/contextHooks/useEmployerMessagingConversation";
import {formatDate, getConversationMessagesGroupFormattedTime} from "../../../../utils/convertLogic/formatDate";
import OutgoingMessage from "../../../../Components/OutgoingMessage/OutgoingMessage";
import {groupMessagesByDate} from "../../../../utils/messaging/groupMessagesByDate";
import {onConversationsUpdate, onMessageSent} from "../../../../utils/messaging/messagingEventsHandlers";
import {ConversationDTO} from "../../../../DTOs/MessagingDTOs/ConversationDTO";
import {getOldestMessageInteractedWith} from "../../../../utils/messaging/getOldestMessageInteractedWith";
import {jobTypesEnumToStringMap, schedulesEnumToStringMap} from "../../../../utils/convertLogic/enumToStringConverter";
import {formatJobSalaryDisplay} from "../../../../utils/convertLogic/formatJobSalaryDisplay";
import {JobApplyDTO} from "../../../../DTOs/userJobInteractionsDTOs/JobApplyDTO";
import Messaging from "../../../../Components/Icons/Messaging";

interface EmployerJobChatComponentProps {
    setConversationsToShow: Dispatch<SetStateAction<ConversationDTO[]>>;
    conversationsLoading: boolean;
}

const EmployerConversation: FC<EmployerJobChatComponentProps> = ({
                                                                     setConversationsToShow,
                                                                     conversationsLoading
                                                                 }) => {
    const {employer} = useEmployer();
    const chatHubService = ChatHubService.getInstance();
    const [searchParams] = useSearchParams();
    const candidateId = searchParams.get("jobSeekerId");
    const jobId = searchParams.get("jobId");
    const conversationId = searchParams.get("conversationId");
    const [messageInput, setMessageInput] = useState("");
    const navigate = useNavigate();
    const conversationService = new ConversationService();
    const [loading, setLoading] = useState(true);
    const messagesWindowRef = useRef<HTMLDivElement>(null);
    const {conversation, setConversation} = useEmployerMessagingConversation();
    const [sendingMessages, setSendingMessages] = useState<string[]>([]);
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const [oldestUnreadMessageId, setOldestUnreadMessageId] = useState<number | null>(null);
    const [jobApply, setJobApply] = useState<JobApplyDTO | null>(null);

    useEffect(() => {
        if (!loading && lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView();
        }
    }, [loading]);

    useEffect(() => {

        chatHubService.startConnection().catch(err => console.error('Connection failed:', err));

    }, []);

    useEffect(() => {
        chatHubService.registerMessageSent((message) => {
            onMessageSent(message, conversation, setConversation, setConversationsToShow);
        });

        chatHubService.registerMessageReceivedHandler((message, senderId) => {
            if (senderId != employer?.id) {
                onMessageSent(message, conversation, setConversation, setConversationsToShow);
                onConversationsUpdate(message, setConversationsToShow);

            }
        });
    }, [conversation]);

    useEffect(() => {
        if ((!jobId || !candidateId || isNanAfterIntParse(jobId) || isNanAfterIntParse(candidateId)) && (!conversationId || isNanAfterIntParse(conversationId))) {
            navigate(EmployerPagesPaths.MESSAGES);
            return;

        }
        if (conversationId && (jobId || candidateId)) {
            navigate(EmployerPagesPaths.MESSAGES);
            return;
        }
        loadConversationInfo();

    }, [conversationId, candidateId, jobId]);

    async function loadConversationInfo() {
        try {
            setLoading(true);
            if (jobId && candidateId) {
                try {
                    const retrievedConversation = await conversationService
                        .getCandidatePotentialConversation(parseInt(candidateId), parseInt(jobId));
                    setConversation(retrievedConversation);
                } catch (err) {
                    const retrievedJobApply = await conversationService.getJobApplyForConversation(parseInt(candidateId), parseInt(jobId));
                    setJobApply(retrievedJobApply);
                }

            } else if (conversationId) {
                const retrievedConversation = await conversationService.getConversationById(parseInt(conversationId));
                setConversation(retrievedConversation);
                setOldestUnreadMessageId(getOldestMessageInteractedWith(retrievedConversation));
            }

        } catch (err) {
            logErrorInfo(err);
            setConversation(null);
        } finally {
            setLoading(false);
        }
    }

    async function sendMessage() {
        if (!messageInput.trim()) return;
        setMessageInput("");
        setSendingMessages(prev => [...prev, messageInput]);
        try {
            await chatHubService.sendMessageToJobSeeker(conversation?.jobSeekerId || parseInt(candidateId!)
                , messageInput, conversation?.jobId || parseInt(jobId!), conversation?.id || null);
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
        navigate(EmployerPagesPaths.JOBS);
    }

    return (
        <div className={"emp-conversation-fb"}>
            {conversationsLoading ? <LoadingPage/> :
                (!conversation && !jobApply) ?
                    <div className={"messages-recommendation-container"}>
                        <Messaging/>
                        <div className={"message-recommendation-container-header"}>
                            Welcome to Messages
                        </div>
                        {
                            employer?.conversations && employer?.conversations.length > 0 ?
                                <div className={"dark-default-text"}>
                                    Select conversation to start messaging
                                </div>
                                :
                                <>
                                    <div className={"dark-default-text"}>
                                        When you contact a candidate, it will appear here.
                                    </div>
                                    <button className={"blue-button mt1rem"} onClick={navigateToJobsPage}>
                                        View Jobs
                                    </button>
                                </>
                        }
                    </div>
                    :
                    loading ? <LoadingPage/> :
                        <>
                            <div className={"chat-window"}>
                                <div className={"chat-window-header"}>
                                    <div className={"dark-small-text bold-text"}>
                                        {conversation?.job.jobTitle || jobApply?.job.jobTitle}
                                    </div>
                                    <div className={"grey-small-text"}>
                                        {conversation?.employer.organization?.name || jobApply?.job.employer.organization.name}
                                    </div>
                                </div>
                                <div className={"content-separation-line"}/>
                                {(conversation?.job.jobApplies[0] || conversation?.jobSeeker.jobApplies[0]) ?
                                    <div className={"apply-date-container"}>
                                        {conversation.job.jobApplies[0] ?
                                            <span className={"semi-dark-small-text"}>
                                        Candidate applied to this position on&nbsp;
                                                <b>{formatDate(conversation.job.jobApplies[0].dateApplied)}</b>
                                    </span>
                                            :
                                            <span className={"semi-dark-small-text"}>
                                        Candidate applied to this position on&nbsp;
                                                <b>{formatDate(conversation?.jobSeeker.jobApplies[0].dateApplied)}</b>
                                    </span>
                                        }
                                    </div>
                                    :
                                    <div className={"apply-date-container"}>
                                <span className={"semi-dark-small-text"}>
                                    Candidate applied to this position on&nbsp;
                                    <b>{jobApply?.dateApplied ? formatDate(jobApply!.dateApplied) : "Information not provided"}</b>
                                </span>
                                    </div>
                                }
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
                                                    <span
                                                        className={"messages-group-date"}>{getConversationMessagesGroupFormattedTime(date)}</span>
                                                    <div className={"messages-group-date-line"}/>
                                                </div>
                                                {messages.map((message, index) => (
                                                    <Message
                                                        message={message}
                                                        isMyMessage={message.employerId == employer?.id}
                                                        conversation={conversation}
                                                        setConversation={setConversation}
                                                        setConversationsToShow={setConversationsToShow}
                                                        lastMessageRef={message.id === oldestUnreadMessageId ? lastMessageRef : undefined}
                                                        messagesWindowRef={messagesWindowRef}
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
                                            {conversation?.job.jobTitle || jobApply?.job.jobTitle}
                                        </div>
                                        <div className={"semi-dark-small-text"}>
                                            {conversation?.employer.organization?.name || jobApply?.job.employer.organization.name}
                                        </div>
                                        <div className={"semi-dark-small-text"}>
                                            {conversation?.job.location || jobApply?.job.location}
                                        </div>
                                    </div>
                                </div>
                                <div className={"content-separation-line"}></div>
                                <div className={"conversation-job-full-info-container"}>
                                    <div className={"dark-small-text bold-text"}>
                                        Job type
                                    </div>
                                    <div className={"semi-dark-small-text"}>
                                        {conversation?.job.jobType ?
                                            conversation.job.jobType.map((jt, index) => (
                                                `${jobTypesEnumToStringMap(jt)}${index !== conversation.job.jobType.length - 1 ? ", " : ""}`
                                            ))
                                            : jobApply?.job.jobType.map((jt, index) => (
                                                `${jobTypesEnumToStringMap(jt)}${index !== jobApply?.job.jobType.length - 1 ? ", " : ""}`
                                            ))
                                        }
                                    </div>
                                    <div className={"dark-small-text bold-text"}>
                                        Job salary
                                    </div>
                                    <div className={"semi-dark-small-text"}>
                                        {conversation?.job.salary ?
                                            conversation?.job.salary ? formatJobSalaryDisplay(conversation.job) : "Salary not specified"
                                            :
                                            jobApply?.job.salary ? formatJobSalaryDisplay(jobApply.job) : "Salary not specified"
                                        }
                                    </div>
                                    <div className={"dark-small-text bold-text"}>
                                        Job shift
                                    </div>
                                    <div className={"semi-dark-small-text mb05rem"}>
                                        {conversation?.job.schedule ?
                                            conversation.job.schedule.length > 0 ?
                                                conversation?.job.schedule.map((sch, index) => (
                                                    `${schedulesEnumToStringMap(sch)}${index !== conversation?.job.schedule.length - 1 ? ", " : ""}`))
                                                :
                                                <div>Info not provided</div>
                                            :
                                            jobApply?.job.schedule && jobApply.job.schedule.length > 0 ?
                                                jobApply?.job.schedule.map((sch, index) => (
                                                    `${schedulesEnumToStringMap(sch)}${index !== jobApply?.job.schedule.length - 1 ? ", " : ""}`))
                                                :
                                                <div>Info not provided</div>
                                        }

                                    </div>
                                    <div>
                                        <a href={`/viewjob/${conversation?.job.id ? conversation.job.id : jobApply?.jobId}`}
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
    )
}

export default EmployerConversation;
