import {ConversationDTO} from "../../DTOs/MessagingDTOs/ConversationDTO";

export function getOldestMessageInteractedWith(conversation : ConversationDTO ) {
    if (!conversation?.messages) {
        return 0;
    }
    return conversation?.messages
            .filter(m => m.jobSeekerId && !m.isRead)[0]?.id ||
        conversation?.messages[conversation?.messages.length - 1]?.id;
}