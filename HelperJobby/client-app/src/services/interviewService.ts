import {InterviewDTO} from "../DTOs/userJobInteractionsDTOs/InterviewDTO";
import CustomFetchService from "./customFetchService";
import {CreateInterviewDTO} from "../DTOs/userJobInteractionsDTOs/CreateInterviewDTO";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";

export class InterviewService {
    private readonly baseURI: string = "api/Interview";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getCurrentJobSeekerInterviews(): Promise<InterviewDTO[]> {
        return await this.customFetchService.get<InterviewDTO[]>(`${this.baseURI}/my-interviews`);
    }

    public async getInterviewsByJobId(jobId: number): Promise<JobDTO> {
        return await this.customFetchService.get<JobDTO>(`${this.baseURI}/${jobId}/interviews`);
    }

    public async getInterview(jobId: number, jobSeekerId: number): Promise<InterviewDTO> {
        return await this.customFetchService.get<InterviewDTO>(`${this.baseURI}/${jobId}/job-seeker/${jobSeekerId}`);
    }

    public async createInterview(jobId: number, jobSeekerId: number, createInterviewDTO: CreateInterviewDTO): Promise<InterviewDTO> {
        return await this.customFetchService.post<InterviewDTO>(`${this.baseURI}/${jobId}/job-seeker/${jobSeekerId}`, createInterviewDTO);
    }

    public async employerCancelInterview(jobId: number, jobSeekerId: number): Promise<void> {
        return await this.customFetchService.delete<void>(`${this.baseURI}/${jobId}/job-seeker/${jobSeekerId}`);
    }

    public async jobSeekerCancelInterview(jobId: number): Promise<void> {
        return await this.customFetchService.delete<void>(`${this.baseURI}/${jobId}`);
    }
}