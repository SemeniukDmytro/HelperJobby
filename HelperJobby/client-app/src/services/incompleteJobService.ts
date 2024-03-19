import CustomFetchService from "./customFetchService";
import {IncompleteJobDTO} from "../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import {CreateIncompleteJobDTO} from "../DTOs/jobRelatetedDTOs/CreateIncompleteJobDTO";
import {UpdatedIncompleteJobDTO} from "../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";
import {CreateUpdateSalaryDTO} from "../DTOs/jobRelatetedDTOs/CreateUpdateSalaryDTO";

export class IncompleteJobService {
    private readonly baseURI: string = "api/IncompleteJob";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getEmployerIncompleteJobs(employerId: number): Promise<IncompleteJobDTO[]> {
        return await this.customFetchService.get<IncompleteJobDTO[]>(
            `${this.baseURI}/${employerId}/incomplete-jobs`
        );
    }

    public async getEmployerIncompleteJobTitles(employerId: number): Promise<IncompleteJobDTO[]> {
        return this.customFetchService.get<IncompleteJobDTO[]>(`${this.baseURI}/employer-incomplete-job-titles/${employerId}`);
    }

    public async getIncompleteJobById(incompleteJobId: number): Promise<IncompleteJobDTO> {
        return await this.customFetchService.get<IncompleteJobDTO>(
            `${this.baseURI}/${incompleteJobId}`
        );
    }

    public async startJobCreation(incompleteJoCreateDTO: CreateIncompleteJobDTO): Promise<IncompleteJobDTO> {
        return await this.customFetchService.post<IncompleteJobDTO>(this.baseURI, incompleteJoCreateDTO);
    }

    public async updateJobCreation(currentJobId: number, updatedIncompleteJobDTO: UpdatedIncompleteJobDTO): Promise<IncompleteJobDTO> {
        return await this.customFetchService.put<IncompleteJobDTO>(
            `${this.baseURI}/${currentJobId}`,
            updatedIncompleteJobDTO
        );
    }

    public async updateIncompleteJobSalary(currentJobId: number, updatedSalaryDTO: CreateUpdateSalaryDTO | null): Promise<IncompleteJobDTO> {
        return await this.customFetchService.put<IncompleteJobDTO>(
            `${this.baseURI}/${currentJobId}/salary-update`,
            updatedSalaryDTO
        );
    }

    public async deleteIncompleteJob(incompleteJobId: number): Promise<void> {
        await this.customFetchService.delete<void>(`${this.baseURI}/${incompleteJobId}`);
    }

    public async deleteIncompleteJobRange(jobIds: number[]): Promise<void> {
        return await this.customFetchService.delete<void>(`${this.baseURI}/delete-incomplete-job-range`, jobIds);
    }
}