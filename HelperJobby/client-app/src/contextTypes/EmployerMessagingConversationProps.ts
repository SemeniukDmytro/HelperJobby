import {ConversationDTO} from "../DTOs/MessagingDTOs/ConversationDTO";
import {Dispatch, SetStateAction} from "react";

export interface EmployerMessagingConversationProps{
    conversation : ConversationDTO | null;
    setConversation : Dispatch<SetStateAction<ConversationDTO | null>>
}