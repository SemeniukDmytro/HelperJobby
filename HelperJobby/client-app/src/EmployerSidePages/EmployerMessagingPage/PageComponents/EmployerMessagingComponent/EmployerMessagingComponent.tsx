import React, {FC, useEffect, useState} from 'react';
import './EmployerMessagingComponent.scss';
import {useNavigate} from "react-router-dom";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import CustomSelectWindow from "../../../../EmployersSideComponents/CustomSelectWindow/CustomSelectWindow";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {JobService} from "../../../../services/jobService";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import EmployerJobChatComponent from "../EmployerConversation/EmployerConversation";
import {ConversationService} from "../../../../services/conversationService";
import {ConversationDTO} from "../../../../DTOs/MessagingDTOs/ConversationDTO";
import ShortConversationInfoForEmployer from "../ShortConversationInfoForEmployer/ShortConversationInfoForEmployer";
import {useEmployer} from "../../../../hooks/contextHooks/useEmployer";
import {ChatHubService} from "../../../../services/chatHubService";
import {MessageDTO} from "../../../../DTOs/MessagingDTOs/MessageDTO";

interface EmployerMessagesComponentProps {
}

const EmployerMessagingComponent: FC<EmployerMessagesComponentProps> = () => {
    const navigate = useNavigate();
    const {employer, setEmployer} = useEmployer();
    const [employerJobTitles, setEmployerJobTitles] = useState<string[]>(["All jobs"]);
    const [filterMessagesBy, setFilterMessagesBy] = useState(employerJobTitles[0]);
    const [loading, setLoading] = useState(true);
    const jobService = new JobService();
    const conversationService = new ConversationService();
    const [conversationsToShow, setConversationsToShow] = useState<ConversationDTO[]>([]);
    const chatHubService = ChatHubService.getInstance();

    useEffect(() => {
        loadPageInitialData();
        loadEmployerAllConversations();
    }, []);

    useEffect(() => {
        chatHubService.startConnection().catch(err => console.error('Connection failed:', err));

        chatHubService.registerConversationsUpdateHandler((message) => {
            onConversationNewMessage(message)
        });
        
    }, []);


    async function loadPageInitialData() {
        try {
            setLoading(true);
            const retrievedJobs = await jobService.getEmployerJobTitles(employer!.id);
            setEmployerJobTitles(prevState => [...prevState, ...retrievedJobs.map(j => j.jobTitle)]);
            if (!employer?.jobs || employer.jobs.length == 0) {
                setEmployer(prev => {
                    return prev && {
                        ...prev,
                        jobs: retrievedJobs
                    }
                })
            }
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setLoading(false)
        }
    }

    function onConversationNewMessage(message: MessageDTO) {
        setConversationsToShow(prevConversations => {
            const updatedConversations = [...prevConversations];
            const conversationIndex = updatedConversations.findIndex(conversation => conversation.id === message.conversationId);

            if (conversationIndex > -1) {
                const [updatedConversation] = updatedConversations.splice(conversationIndex, 1);
                updatedConversations.unshift(updatedConversation);
            }
            return updatedConversations;
        });
    }

    async function loadEmployerAllConversations() {
        try {
            setLoading(true);
            const retrievedConversations = await conversationService.getCurrentEmployerConversations();
            setEmployer(prev => {
                return prev && {
                    ...prev,
                    conversations: retrievedConversations
                }
            });
            setConversationsToShow(retrievedConversations);
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setLoading(false);
        }
    }

    function navigateToJobPostingPage() {
        navigate(EmployerPagesPaths.JOB_POSTING);
    }

    return (
        <div className={"light-grey-page-background page-without-scroll"}>
            <div className={"messages-page-layout"}>
                <div className={"emp-pages-layout"}>
                    <div className={"emp-pages-header mt1rem mb1rem"}>
                        <span className={"small-title mb0"}>Messages</span>
                        <button className={"blue-button"} onClick={navigateToJobPostingPage}>Post a job</button>
                    </div>
                </div>
                <div className={"messages-layout"}>
                    <div className={"conversation-layout"}>
                        <div className="conversations-header">
                            <span className={"small-title"}>Inbox</span>
                            {
                                loading ? <LoadingPage/> :

                                    <CustomSelectWindow fieldLabel={""}
                                                        selectedValue={filterMessagesBy}
                                                        setSelectedValue={setFilterMessagesBy}
                                                        optionsArr={employerJobTitles}
                                                        includeWindowScroll={true}
                                                        innerLabel={"Filter by job: "}/>
                            }
                        </div>
                        <div className={"content-separation-line"}></div>
                        {conversationsToShow.length != 0 &&
                            <div className={"conversations-container"}>
                                {
                                    conversationsToShow.map((conversation, index) => (
                                        <ShortConversationInfoForEmployer conversationInfo={conversation} key={index}/>
                                    ))
                                }
                            </div>
                        }
                    </div>
                    <EmployerJobChatComponent/>
                </div>
            </div>

        </div>
    )
}

export default EmployerMessagingComponent;
