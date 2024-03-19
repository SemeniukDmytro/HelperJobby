import {createContext, ReactNode, useState} from "react";
import {MessagingConversationProps} from "../contextTypes/MessagingConversationProps";
import {ConversationDTO} from "../DTOs/MessagingDTOs/ConversationDTO";

const JobSeekerMessagingConversationContext = createContext<MessagingConversationProps>({
    conversation: null,
    setConversation: () => {
    }
});


export function JobSeekerMessagingConversationProvider({children}: { children: ReactNode }) {
    const [conversation, setConversation] = useState<ConversationDTO | null>(null);

    return (
        <JobSeekerMessagingConversationContext.Provider value={{conversation, setConversation}}>
            {children}
        </JobSeekerMessagingConversationContext.Provider>
    )
}

export default JobSeekerMessagingConversationContext;