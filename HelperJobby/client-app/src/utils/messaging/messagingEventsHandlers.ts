import {MessageDTO} from "../../DTOs/MessagingDTOs/MessageDTO";
import {Dispatch, SetStateAction} from "react";
import {ConversationDTO} from "../../DTOs/MessagingDTOs/ConversationDTO";

export function onConversationsUpdate(message: MessageDTO, setConversationsToShow: Dispatch<SetStateAction<ConversationDTO[]>>) {
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

export function onMessageSent(message: MessageDTO,
                              conversation: ConversationDTO | null,
                              setConversation: Dispatch<SetStateAction<ConversationDTO | null>>,
                              setConversationsToShow: Dispatch<SetStateAction<ConversationDTO[]>>) {
    if (conversation && conversation?.id !== message.conversationId) {
        return;
    }
    let updatedConversation = conversation ? {
        ...conversation,
        lastModified: message.sentAt,
        messages: [...conversation.messages, message],
        jobSeekersUnreadMessagesCount: message.employerId ? conversation.jobSeekersUnreadMessagesCount + 1 : conversation.jobSeekersUnreadMessagesCount,
        employersUnreadMessagesCount: message.jobSeekerId ? conversation.employersUnreadMessagesCount + 1 : conversation.employersUnreadMessagesCount
    } : {
        ...message.conversation,
        messages: [message],
        jobSeekersUnreadMessagesCount: message.employerId ? 1 : 0,
        employersUnreadMessagesCount: message.jobSeekerId ? 1 : 0
    };
    setConversation(updatedConversation);
    setConversationsToShow(prevConversations => {
        if (conversation) {
            const conversationIndex = prevConversations.findIndex(c => c.id === conversation.id);
            const updatedConversations = [...prevConversations];
            const conversationInfo = {...conversation};
            conversationInfo.messages.push(message);
            conversationInfo.lastModified = message.sentAt;
            if (conversationIndex !== -1) {
                updatedConversations[conversationIndex] = {...conversationInfo};
            }
            return updatedConversations;
        } else {
            return [...prevConversations, updatedConversation]
        }
    });
}

export function onShortConversationMessagesUpdate(message: MessageDTO, conversationInfo: ConversationDTO,
                                                  setConversationsToShow: Dispatch<SetStateAction<ConversationDTO[]>>,
                                                  setLastMessage: Dispatch<SetStateAction<MessageDTO>>) {
    console.log(conversationInfo)
    if (message.conversationId == conversationInfo.id) {
        conversationInfo.messages.push(message);
        conversationInfo.lastModified = message.conversation.lastModified;
        message.employerId ? conversationInfo.jobSeekersUnreadMessagesCount++ : conversationInfo.employersUnreadMessagesCount++;
        setConversationsToShow(prevConversations => {
            const conversationIndex = prevConversations.findIndex(conversation => conversation.id === conversationInfo.id);
            const updatedConversations = [...prevConversations];
            if (conversationIndex !== -1) {
                updatedConversations[conversationIndex] = {...conversationInfo};
            }
            return updatedConversations;
        });
        setLastMessage(message);
    }
}