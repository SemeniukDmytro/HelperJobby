import {ConversationDTO} from "../DTOs/MessagingDTOs/ConversationDTO";
import {Dispatch, SetStateAction} from "react";

export interface MessagingConversationProps {
    conversation : ConversationDTO | null;
    setConversation : Dispatch<SetStateAction<ConversationDTO | null>>
}