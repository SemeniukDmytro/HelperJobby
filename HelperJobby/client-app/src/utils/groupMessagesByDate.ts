import {MessageDTO} from "../DTOs/MessagingDTOs/MessageDTO";

export function groupMessagesByDate(messages: MessageDTO[]): Record<string, MessageDTO[]> {
    const grouped: Record<string, MessageDTO[]> = {};

    messages.forEach(message => {
        const date = new Date(message.sentAt).toLocaleDateString();
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push(message);
    });

    return grouped;
}