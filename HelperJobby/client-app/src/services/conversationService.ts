import CustomFetchService from "./customFetchService";
import {ConversationDTO} from "../DTOs/MessagingDTOs/ConversationDTO";

export class ConversationService{
    private readonly baseURI: string = "api/Conversation";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getEmployerConversationByJobId(jobId: number): Promise<ConversationDTO[]> {
        return (await this.customFetchService.get<ConversationDTO[]>(`${this.baseURI}/employer-job-conversations/${jobId}`));
    }

    public async getCurrentEmployerConversations(): Promise<ConversationDTO[]> {
        return (await this.customFetchService.get<ConversationDTO[]>(`${this.baseURI}/employer/my-conversations`));
    }

    public async getCurrentJobSeekerConversations(): Promise<ConversationDTO[]> {
        return (await this.customFetchService.get<ConversationDTO[]>(`${this.baseURI}/jobSeeker/my-conversations`));
    }

    public async getConversationById(conversationId : number): Promise<ConversationDTO> {
        return (await this.customFetchService.get<ConversationDTO>(`${this.baseURI}/${conversationId}`));
    }

    public async getCandidatePotentialConversation(candidateId : number, jobId : number): Promise<ConversationDTO> {
        return (await this.customFetchService.get<ConversationDTO>(`${this.baseURI}/candidate-conversation/${candidateId}/${jobId}`));
    }
    
}