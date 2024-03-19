import CustomFetchService from "./customFetchService";
import {JobSeekerDTO} from "../DTOs/accountDTOs/JobSeekerDTO";
import {UpdateJobSeekerDTO} from "../DTOs/accountDTOs/UpdateJobSeekerDTO";
import {SavedJobDTO} from "../DTOs/userJobInteractionsDTOs/SavedJobDTO";

export class JobSeekerService {
    private readonly baseURI: string = "api/JobSeeker";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getCurrentJobSeeker(): Promise<JobSeekerDTO> {
        return await this.customFetchService.get<JobSeekerDTO>(`${this.baseURI}/current-job-seeker`);
    }

    public async getCurrentJobSeekerJobInteractions(): Promise<JobSeekerDTO> {
        return await this.customFetchService.get<JobSeekerDTO>(`${this.baseURI}/job-seeker-with-job-interactions`);
    }

    public async getSavedJobsOfCurrentJobSeeker(): Promise<SavedJobDTO[]> {
        return await this.customFetchService.get<SavedJobDTO[]>(`${this.baseURI}/my-saved-jobs`);
    }

    public async putJobSeekerAccount(jobSeekerId: number, updatedAccountDTO: UpdateJobSeekerDTO): Promise<JobSeekerDTO> {
        return await this.customFetchService.put<JobSeekerDTO>(`${this.baseURI}/${jobSeekerId}`, updatedAccountDTO);
    }

    public async saveJob(jobId: number): Promise<SavedJobDTO> {
        return await this.customFetchService.post<SavedJobDTO>(`${this.baseURI}/save-job/${jobId}`, {});
    }

    public async deleteSavedJob(jobId: number): Promise<void> {
        return await this.customFetchService.delete<void>(`${this.baseURI}/delete-saved-job/${jobId}`);
    }
}
