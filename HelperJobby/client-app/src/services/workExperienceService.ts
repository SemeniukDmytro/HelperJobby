import CustomFetchService from './customFetchService';
import {WorkExperienceDTO} from "../DTOs/resumeRelatedDTOs/WorkExperienceDTO";
import {CreateUpdateWorkExperienceDTO} from "../DTOs/resumeRelatedDTOs/CreateUpdateWorkExperienceDTO";

export class WorkExperienceService {
    private readonly baseURI: string = 'api/WorkExperience';
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getWorkExperienceById(workExperienceId: number): Promise<WorkExperienceDTO> {
        return await this.customFetchService.get<WorkExperienceDTO>(`${this.baseURI}/${workExperienceId}`);
    }

    public async addWorkExperience(resumeId: number, createUpdateWorkExperienceDto: CreateUpdateWorkExperienceDTO): Promise<WorkExperienceDTO> {
        return await this.customFetchService.post<WorkExperienceDTO>(`${this.baseURI}/${resumeId}`, createUpdateWorkExperienceDto);
    }

    public async updateWorkExperience(workExperienceId: number, updateUpdateWorkExperienceDto: CreateUpdateWorkExperienceDTO): Promise<WorkExperienceDTO> {
        return await this.customFetchService.put<WorkExperienceDTO>(`${this.baseURI}/${workExperienceId}`, updateUpdateWorkExperienceDto);
    }

    public async deleteWorkExperience(workExperienceId: number): Promise<void> {
        return await this.customFetchService.delete<void>(`${this.baseURI}/${workExperienceId}`);
    }
}
