import CustomFetchService from "./customFetchService";
import {ResumeDTO} from "../DTOs/resumeRelatedDTOs/ResumeDTO";
import {CreateResumeDTO} from "../DTOs/resumeRelatedDTOs/CreateResumeDTO";

export class ResumeService {
    private readonly baseURI: string = "api/Resume"; // Adjust the base URI as needed
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getResume(id: number): Promise<ResumeDTO> {
        return await this.customFetchService.get<ResumeDTO>(`${this.baseURI}/${id}`);
    }
    
    public async getResumeByJobSeekerId(jobSeekerId : number){
        return await this.customFetchService.get<ResumeDTO>(`${this.baseURI}/job-seeker/${jobSeekerId}`);
    }

    public async postResume(createdResume: CreateResumeDTO): Promise<ResumeDTO> {
        return await this.customFetchService.post<ResumeDTO>(this.baseURI, createdResume);
    }

    public async deleteResume(resumeId: number): Promise<void> {
        return await this.customFetchService.delete<void>(`${this.baseURI}/${resumeId}`);
    }
}
