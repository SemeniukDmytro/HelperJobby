import {createContext, ReactNode, useState} from "react";
import {EmployerMessagingConversationProps} from "../contextTypes/EmployerMessagingConversationProps";
import {ConversationDTO} from "../DTOs/MessagingDTOs/ConversationDTO";

const EmployerMessagingConversationContext = createContext<EmployerMessagingConversationProps>({
    conversation : null,
    setConversation : () => {}
});


export function EmployerMessagingConversationProvider({children} : {children : ReactNode}){
    const [conversation, setConversation] = useState<ConversationDTO | null>(null);
    
    return (
        <EmployerMessagingConversationContext.Provider value={{conversation, setConversation}}>
            {children}
        </EmployerMessagingConversationContext.Provider>
    )
}

export default EmployerMessagingConversationContext;