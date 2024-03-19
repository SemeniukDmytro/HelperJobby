import {useContext} from "react";
import EmployerMessagingConversationContext from "../../contexts/EmployerMessagingConversationContext";

export function useEmployerMessagingConversation() {
    return useContext(EmployerMessagingConversationContext);
}