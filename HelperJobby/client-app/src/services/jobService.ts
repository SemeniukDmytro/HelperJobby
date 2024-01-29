import CustomFetchService from "./customFetchService";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";
import {UpdatedJobDTO} from "../DTOs/jobRelatetedDTOs/UpdatedJobDTO";

export class JobService {
    private readonly baseURI: string = "api/Job";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getJobsByUserId(userId: number): Promise<JobDTO[]> {
        return await this.customFetchService.get<JobDTO[]>(`${this.baseURI}/jobs/${userId}`);
    }

    public async getJobsByOrganizationId(organizationId: number): Promise<JobDTO[]> {
        return await this.customFetchService.get<JobDTO[]>(`${this.baseURI}/organization-jobs/${organizationId}`);
    }

    public async getJobById(jobId: number): Promise<JobDTO> {
        return await this.customFetchService.get<JobDTO>(`${this.baseURI}/${jobId}`);
    }

    public async createJob(jobCreationId: number): Promise<JobDTO> {
        return await this.customFetchService.post<JobDTO>(`${this.baseURI}/${jobCreationId}`, {});
    }

    public async putJob(jobId: number, updatedJob: UpdatedJobDTO): Promise<JobDTO> {
        return await this.customFetchService.put<JobDTO>(`${this.baseURI}/${jobId}`, updatedJob);
    }

    public async deleteJob(jobId: number): Promise<void> {
        return await this.customFetchService.delete<void>(`${this.baseURI}/${jobId}`);
    }
}