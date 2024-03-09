import {MessageDTO} from "../../DTOs/MessagingDTOs/MessageDTO";
import {Dispatch, SetStateAction} from "react";
import {ConversationDTO} from "../../DTOs/MessagingDTOs/ConversationDTO";

export function onConversationsUpdate(message: MessageDTO, setConversationsToShow : Dispatch<SetStateAction<ConversationDTO[]>>){
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

export function onMessageSent(message: MessageDTO, setConversation : Dispatch<SetStateAction<ConversationDTO | null>>) {
    setConversation(prev => {
        return prev ?
            {
                ...prev,
                messages: [...prev.messages, message],
                lastModified: message.sentAt
            }
            :
            {
                ...message.conversation,
                messages: [message],
                lastModified: message.sentAt
            }
    })
}