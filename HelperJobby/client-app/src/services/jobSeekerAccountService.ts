import CustomFetchService from "./customFetchService";
import { JobSeekerAccountDTO } from "../DTOs/accountDTOs/JobSeekerAccountDTO";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";
import {UpdateJobSeekerAccountDTO} from "../DTOs/accountDTOs/UpdateJobSeekerAccountDTO";
import {SavedJobDTO} from "../DTOs/userJobInteractionsDTOs/SavedJobDTO";

export class JobSeekerAccountService {
    private readonly baseURI: string = "api/JobSeekerAccount";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getCurrentJobSeeker(): Promise<JobSeekerAccountDTO> {
        return await this.customFetchService.get<JobSeekerAccountDTO>(`${this.baseURI}/current-job-seeker`);
    }
    
    public async getCurrentJobSeekerAllInfo() : Promise<JobSeekerAccountDTO>{
        return await this.customFetchService.get<JobSeekerAccountDTO>(`${this.baseURI}/current-job-seeker-all-info`);
    }
    
    public async getCurrentJobSeekerJobInteractions() : Promise<JobSeekerAccountDTO>{
        return await this.customFetchService.get<JobSeekerAccountDTO>(`${this.baseURI}/job-seeker-with-job-interactions`);
    }
    public async getSavedJobsOfCurrentJobSeeker(): Promise<SavedJobDTO[]> {
        return await this.customFetchService.get<SavedJobDTO[]>(`${this.baseURI}/my-saved-jobs`);
    }

    public async putJobSeekerAccount(userId: number, updatedAccountDTO: UpdateJobSeekerAccountDTO): Promise<JobSeekerAccountDTO> {
        return await this.customFetchService.put<JobSeekerAccountDTO>(`${this.baseURI}/${userId}`, updatedAccountDTO);
    }

    public async saveJob(jobId: number): Promise<SavedJobDTO> {
        return await this.customFetchService.post<SavedJobDTO>(`${this.baseURI}/save-job/${jobId}`, {});
    }

    public async deleteSavedJob(jobId: number): Promise<void> {
        return await this.customFetchService.delete<void>(`${this.baseURI}/delete-saved-job/${jobId}`);
    }
}
