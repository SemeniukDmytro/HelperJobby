import {HubConnection, HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import {getAuthToken} from "../utils/authTokenInteraction";
import {logErrorInfo} from "../utils/logErrorInfo";
import {MessageDTO} from "../DTOs/MessagingDTOs/MessageDTO";

export class ChatHubService {
    private hubConnection: HubConnection | null = null;

    public async startConnection(): Promise<void>{
        const accessToken = getAuthToken(); 
        if (!accessToken){
            return ;
        }
        this.hubConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:7214/Chat", { accessTokenFactory: () => accessToken })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
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
                console.log(this.hubConnection)
                await this.hubConnection.invoke('SendMessageToJobSeeker', jobSeekerId, message, jobId, conversationId);
            } catch (err) {
                logErrorInfo(err)
            }
        }
    };

    public async sendMessageToEmployer(employerId: number, message: string, jobId : number,
                                        conversationId : number | null): Promise<void>{
        if (this.hubConnection) {
            try {
                await this.hubConnection.invoke('SendMessageToEmployer', employerId, message, jobId, conversationId);
            } catch (err) {
                logErrorInfo(err)
            }
        }
    };

    public registerMessageReceivedHandler(onMessageReceived: (message: MessageDTO, senderId : number, conversationId : number) => void){
        this.hubConnection?.on('ReceiveMessage', onMessageReceived);
    };
    
    public registerMessageSent(onMessageSent : (message : MessageDTO, conversationId : number) => void){
        this.hubConnection?.on("MessageSent", onMessageSent);
    }
    

    public async disconnect() {
        if (this.hubConnection) {
            try {
                await this.hubConnection.stop();
            } catch (err) {
                logErrorInfo(err)
            }
        }
    };
}