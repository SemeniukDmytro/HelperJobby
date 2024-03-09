import {HubConnection, HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import {getAuthToken} from "../utils/authTokenInteraction";
import {logErrorInfo} from "../utils/logErrorInfo";
import {MessageDTO} from "../DTOs/MessagingDTOs/MessageDTO";

export class ChatHubService {
    private hubConnection: HubConnection | null = null;

    private static instance: ChatHubService;

    private messageReceivedHandler?: (...args: any[]) => void;
    private conversationUpdateHandler?: (...args: any[]) => void;
    private messageSentHandler?: (...args: any[]) => void;
    private messageReadHandler?: (...args: any[]) => void;

    private constructor() {
    }

    public static getInstance(): ChatHubService {
        if (!ChatHubService.instance) {
            ChatHubService.instance = new ChatHubService();
        }
        return ChatHubService.instance;
    }

    public async startConnection(): Promise<void>{
        const accessToken = getAuthToken(); 
        if (!accessToken){
            return ;
        }
        this.hubConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:7214/Chat", { accessTokenFactory: () => accessToken })
            .withAutomaticReconnect()
            .build();

        this.hubConnection.onclose(error => console.error('SignalR Connection Closed', error));

        try {
            await this.hubConnection.start();
        } catch (err) {
            logErrorInfo(err)
        }
    };
    public async sendMessageToJobSeeker(jobSeekerId: number, message: string, jobId : number,
                                        conversationId : number | null): Promise<void>{
        if (this.hubConnection) {
            try {
                await this.hubConnection.invoke('SendMessageToJobSeeker', jobSeekerId, message, jobId, conversationId);
            }
            catch (err){
                throw err;
            }
        }
    };  

    public async sendMessageToEmployer(employerId: number, message: string, jobId : number,
                                        conversationId : number | null): Promise<void>{
        if (this.hubConnection) {
            try {
                await this.hubConnection.invoke('SendMessageToEmployer', employerId, message, jobId, conversationId);
            }
            catch (err){
                throw err;
            }
        }
    };

    public async readMessageFromJobSeeker(messageId: number, jobSeekerId : number): Promise<void>{
        if (this.hubConnection) {
            try {
                await this.hubConnection.invoke('ReadMessageFromJobSeeker', messageId, jobSeekerId);
            }
            catch (err){
                throw err;
            }
        }
    };

    public async readMessageFromEmployer(messageId: number, employerId : number): Promise<void>{
        if (this.hubConnection) {
            try {
                await this.hubConnection.invoke('ReadMessageFromEmployer', messageId, employerId);
            }
            catch (err){
                throw err;
            }
        }
    };

    public registerMessageReceivedHandler(onMessageReceived: (message: MessageDTO, senderId : number) => void){
        this.messageReceivedHandler = onMessageReceived;
        this.hubConnection?.on('ReceiveMessage', onMessageReceived);
    };
    
    public registerMessageSent(onMessageSent : (message : MessageDTO) => void){
        this.messageSentHandler = onMessageSent;
        this.hubConnection?.on("MessageSent", onMessageSent);
    };

    public registerConversationsUpdateHandler(onConversationUpdate: (message: MessageDTO) => void){
        this.conversationUpdateHandler = onConversationUpdate;
        this.hubConnection?.on('UpdateConversations', onConversationUpdate);
    };
    
    public registerMessageRead(onMessageRead : (message : MessageDTO) => void){
        this.messageReadHandler = onMessageRead;
        this.hubConnection?.on("MessageRead", onMessageRead);
    };

    public unregisterMessageReceivedHandler() {
        if (this.hubConnection && this.messageReceivedHandler) {
            this.hubConnection.off('ReceiveMessage', this.messageReceivedHandler);
            this.messageReceivedHandler = undefined;
        }
    }

    public unregisterMessageSentHandler() {
        if (this.hubConnection && this.messageSentHandler) {
            this.hubConnection.off("MessageSent", this.messageSentHandler);
            this.messageSentHandler = undefined;
        }
    }

    public unregisterConversationsUpdateHandler() {
        if (this.hubConnection && this.conversationUpdateHandler) {
            this.hubConnection.off('UpdateConversations', this.conversationUpdateHandler);
            this.conversationUpdateHandler = undefined;
        }
    }

    public unregisterMessageReadHandler() {
        if (this.hubConnection && this.messageReadHandler) {
            this.hubConnection.off("MessageRead", this.messageReadHandler);
            this.messageReadHandler = undefined;
        }
    }



    public async disconnect() {
        this.unregisterEventHandlers();
        if (this.hubConnection) {
            try {
                await this.hubConnection.stop();
            } catch (err) {
                logErrorInfo(err)
            }
        }
    };

    private unregisterEventHandlers() {
        if (this.hubConnection) {
            if (this.messageReceivedHandler) {
                this.hubConnection.off('ReceiveMessage', this.messageReceivedHandler);
            }
            if (this.conversationUpdateHandler) {
                this.hubConnection.off('UpdateConversations', this.conversationUpdateHandler);
            }
            if (this.messageSentHandler) {
                this.hubConnection.off("MessageSent", this.messageSentHandler);
            }
            if (this.messageReadHandler) {
                this.hubConnection.off("MessageRead", this.messageReadHandler);
            }
        }
    }
}