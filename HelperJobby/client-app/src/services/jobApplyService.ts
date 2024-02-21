import {JobApplyDTO} from "../DTOs/userJobInteractionsDTOs/JobApplyDTO";
import CustomFetchService from "./customFetchService";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";
import {UpdateJobApplyDTO} from "../DTOs/userJobInteractionsDTOs/UpdateJobApplyDTO";

export class JobApplyService {
    private readonly baseURI: string = "api/JobApply";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getUserJobApplies(): Promise<JobApplyDTO[]> {
        return await this.customFetchService.get<JobApplyDTO[]>(`${this.baseURI}/my-job-applies`);
    }

    public async getJobAppliesByJobId(jobId: number): Promise<JobDTO> {
        return await this.customFetchService.get<JobDTO>(`${this.baseURI}/${jobId}/job-applies`);
    }

    public async getJobApplyByJobSeekerIdAndJobId(jobId: number, jobSeekerId: number): Promise<JobApplyDTO> {
        return await this.customFetchService.get<JobApplyDTO>(`${this.baseURI}/${jobId}/job-seeker/${jobSeekerId}`);
    }

    public async postJobApply(jobId: number): Promise<JobApplyDTO> {
        return await this.customFetchService.post<JobApplyDTO>(`${this.baseURI}/${jobId}`, {});
    }

    public async UpdateJobApply(jobId: number, jobSeekerId : number, updatedJobApply : UpdateJobApplyDTO): Promise<JobApplyDTO> {
        return await this.customFetchService.post<JobApplyDTO>(`${this.baseURI}/job-seeker/${jobSeekerId}/job-apply/${jobId}`, updatedJobApply);
    }

    public async deleteJobApply(jobId: number): Promise<void> {
        return await this.customFetchService.delete<void>(`${this.baseURI}/${jobId}`);
    }
}