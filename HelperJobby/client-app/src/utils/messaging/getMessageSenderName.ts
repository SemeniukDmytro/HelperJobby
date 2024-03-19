import {MessageDTO} from "../../DTOs/MessagingDTOs/MessageDTO";
import {ConversationDTO} from "../../DTOs/MessagingDTOs/ConversationDTO";

export function getMessageSenderName(message: MessageDTO, conversation: ConversationDTO): string {
    if (message.employerId) {
        return conversation.employer?.fullName || "Anonymous employer";
    } else if (message.jobSeekerId) {
        return `${conversation.jobSeeker.firstName} ${conversation.jobSeeker.lastName}`;
    } else {
        return "Anonymous job seeker";
    }
}