import {InterviewDTO} from "../DTOs/userJobInteractionsDTOs/InterviewDTO";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";
import CustomFetchService from "./customFetchService";

export class InterviewService {
    private readonly baseURI: string = "api/Interview";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getCurrentJobSeekerInterviews(): Promise<InterviewDTO[]> {
        return await this.customFetchService.get<InterviewDTO[]>(`${this.baseURI}/my-interviews`);
    }

    public async getInterviewsByJobId(jobId: number): Promise<InterviewDTO[]> {
        return await this.customFetchService.get<InterviewDTO[]>(`${this.baseURI}/${jobId}/interviews`);
    }

    public async getInterview(jobId: number, jobSeekerId: number): Promise<InterviewDTO> {
        return await this.customFetchService.get<InterviewDTO>(`${this.baseURI}/${jobId}/job-seeker/${jobSeekerId}`);
    }

    public async createInterview(jobId: number, jobSeekerId: number): Promise<InterviewDTO> {
        return await this.customFetchService.post<InterviewDTO>(`${this.baseURI}/${jobId}/job-seeker/${jobSeekerId}`, {});
    }

    public async deleteInterview(jobId: number, jobSeekerId: number): Promise<void> {
        return await this.customFetchService.delete<void>(`${this.baseURI}/${jobId}/job-seeker/${jobSeekerId}`);
    }
}