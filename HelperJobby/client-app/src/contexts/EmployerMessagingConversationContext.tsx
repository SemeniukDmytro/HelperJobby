import {createContext, ReactNode, useState} from "react";
import {ConversationDTO} from "../DTOs/MessagingDTOs/ConversationDTO";
import {MessagingConversationProps} from "../contextTypes/MessagingConversationProps";

const EmployerMessagingConversationContext = createContext<MessagingConversationProps>({
    conversation: null,
    setConversation: () => {
    }
});


export function EmployerMessagingConversationProvider({children}: { children: ReactNode }) {
    const [conversation, setConversation] = useState<ConversationDTO | null>(null);

    return (
        <EmployerMessagingConversationContext.Provider value={{conversation, setConversation}}>
            {children}
        </EmployerMessagingConversationContext.Provider>
    )
}

export default EmployerMessagingConversationContext;