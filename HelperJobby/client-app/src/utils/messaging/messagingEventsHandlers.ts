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
    if (conversation?.id !== message.conversationId) {
        return;
    }
    let updatedConversation = {...conversation};
    if (updatedConversation){
        updatedConversation.lastModified = message.sentAt;
        updatedConversation.messages = [...updatedConversation.messages, message];
    }
    else {
        updatedConversation = {...message.conversation, messages : [message]};
    }
    if (message.employerId){
        updatedConversation.jobSeekersUnreadMessagesCount = conversation.jobSeekersUnreadMessagesCount + 1;
    }
    else {
        updatedConversation.employersUnreadMessagesCount = conversation.employersUnreadMessagesCount + 1;
    }
    setConversation(updatedConversation)
    setConversationsToShow(prevConversations => {
        const conversationIndex = prevConversations.findIndex(c => c.id === conversation.id);
        const updatedConversations = [...prevConversations];
        const conversationInfo = {...conversation};
        conversationInfo.messages.push(message);
        conversationInfo.lastModified = message.sentAt;
        if (conversationIndex !== -1) {
            updatedConversations[conversationIndex] = {...conversationInfo};
        }
        return updatedConversations;
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