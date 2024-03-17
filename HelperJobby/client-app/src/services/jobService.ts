import CustomFetchService from "./customFetchService";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";
import {UpdatedJobDTO} from "../DTOs/jobRelatetedDTOs/UpdatedJobDTO";
import {CreateUpdateSalaryDTO} from "../DTOs/jobRelatetedDTOs/CreateUpdateSalaryDTO";

export class JobService {
    private readonly baseURI: string = "api/Job";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getJobForEmployerById(jobId: number): Promise<JobDTO> {
        return this.customFetchService.get<JobDTO>(`${this.baseURI}/employer-job/${jobId}`);
    }

    public async getJobsByEmployerId(employerId: number): Promise<JobDTO[]> {
        return this.customFetchService.get<JobDTO[]>(`${this.baseURI}/employer-jobs/${employerId}`);
    }

    public async getEmployerJobTitles(employerId: number): Promise<JobDTO[]> {
        return this.customFetchService.get<JobDTO[]>(`${this.baseURI}/employer-job-titles/${employerId}`);
    } 

    public async getJobsByOrganizationId(organizationId: number): Promise<JobDTO[]> {
        return this.customFetchService.get<JobDTO[]>(`${this.baseURI}/organization-jobs/${organizationId}`);
    }

    public async getJobForJobSeekersById(jobId: number): Promise<JobDTO> {
        return await this.customFetchService.get<JobDTO>(`${this.baseURI}/${jobId}`);
    }

    public async createJob(incompleteJobId: number): Promise<JobDTO> {
        return await this.customFetchService.post<JobDTO>(`${this.baseURI}/${incompleteJobId}`, {});
    }

    public async putJob(jobId: number, updatedJob: UpdatedJobDTO): Promise<JobDTO> {
        return await this.customFetchService.put<JobDTO>(`${this.baseURI}/${jobId}`, updatedJob);
    }
    
    public async putJobSalary(jobId : number, updatedSalary : CreateUpdateSalaryDTO | null) : Promise<JobDTO>{
        return await this.customFetchService.put<JobDTO>(`${this.baseURI}/${jobId}/salary-update`, updatedSalary);
    }

    public async deleteJob(jobId: number): Promise<void> {
        return await this.customFetchService.delete<void>(`${this.baseURI}/${jobId}`);
    }
    
    public async deleteJobRange(jobIds : number[]) : Promise<void>{
        return await this.customFetchService.delete<void>(`${this.baseURI}/delete-job-range`, jobIds);
    }
}