import React, {FC, useEffect, useState} from 'react';
import './TemporaryChat.scss';
import {ChatHubService} from "../../services/chatHubService";
import {useAuth} from "../../hooks/useAuth";

interface TemporaryChatProps {}

const TemporaryChat: FC<TemporaryChatProps> = () => {
    const chatHubService = new ChatHubService();
    const [messages, setMessages] = useState<string[]>([]);
    const [conversationId, setConversationId] = useState<number | null>(null);
    const {authUser} = useAuth();

    useEffect(() => {
        
        chatHubService.startConnection();
        chatHubService.registerMessageReceivedHandler((message: string, senderId : string | null, conversationId) => 
            handleReceiveMessage(message, conversationId)
        );
    }, [chatHubService]);

    const sendMessage = async () => {
       await chatHubService.sendMessage(2, 'Hello, World!', conversationId);
    };
    
    function handleReceiveMessage(message : string, conversationId : number){
        console.log("ads")
        setConversationId(conversationId)
        setMessages(prev => [...prev, message])
    }
    
    console.log(messages)

    return (
        <div>
            <button onClick={sendMessage}>Send Message</button>
            {messages.map((msg, index) => (
                <p key={index}>{msg}</p>
            ))}
        </div>
    );
}

export default TemporaryChat;
