import {JobApplyDTO} from "../DTOs/userJobInteractionsDTOs/JobApplyDTO";
import CustomFetchService from "./customFetchService";

export class JobApplyService {
    private readonly baseURI: string = "api/JobApply";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getUserJobApplies(): Promise<JobApplyDTO[]> {
        return await this.customFetchService.get<JobApplyDTO[]>(`${this.baseURI}/my-job-applies`);
    }

    public async getJobAppliesByJobId(jobId: number): Promise<JobApplyDTO[]> {
        return await this.customFetchService.get<JobApplyDTO[]>(`${this.baseURI}/${jobId}/job-applies`);
    }

    public async getJobApplyByJobSeekerIdAndJobId(jobId: number, jobSeekerId: number): Promise<JobApplyDTO> {
        return await this.customFetchService.get<JobApplyDTO>(`${this.baseURI}/${jobId}/job-seeker/${jobSeekerId}`);
    }

    public async postJobApply(jobId: number): Promise<JobApplyDTO> {
        return await this.customFetchService.post<JobApplyDTO>(`${this.baseURI}/${jobId}`, {});
    }

    public async deleteJobApply(jobId: number): Promise<void> {
        return await this.customFetchService.delete<void>(`${this.baseURI}/${jobId}`);
    }
}