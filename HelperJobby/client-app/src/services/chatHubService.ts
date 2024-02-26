import {HubConnection, HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import {getAuthToken} from "../utils/authTokenInteraction";
import {logErrorInfo} from "../utils/logErrorInfo";

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
    public async sendMessage(recipientId: number, message: string, conversationId : number | null): Promise<void>{
        if (this.hubConnection) {
            try {
                await this.hubConnection.invoke('SendMessage', recipientId, message, conversationId);
            } catch (err) {
                logErrorInfo(err)
            }
        }
    };

    public registerMessageReceivedHandler(onMessageReceived: (message: string, senderId : string | null, conversationId : number) => void){
        this.hubConnection?.on('ReceiveMessage', onMessageReceived);
    };
    
    

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