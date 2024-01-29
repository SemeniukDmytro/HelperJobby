import CustomFetchService from "./customFetchService";
import {EducationDTO} from "../DTOs/resumeRelatedDTOs/EducationDTO";
import {CreateUpdateEducationDTO} from "../DTOs/resumeRelatedDTOs/CreateUpdateEducationDTO";

export class EducationService {
    private readonly baseURI: string = "api/Education";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getEducation(educationId: number): Promise<EducationDTO> {
        return await this.customFetchService.get<EducationDTO>(`${this.baseURI}/${educationId}`);
    }

    public async addEducation(resumeId: number, createEducationDTO: CreateUpdateEducationDTO): Promise<EducationDTO> {
        return await this.customFetchService.post<EducationDTO>(`${this.baseURI}/${resumeId}`, createEducationDTO);
    }

    public async updateEducation(educationId: number, updateEducationDTO: CreateUpdateEducationDTO): Promise<EducationDTO> {
        return await this.customFetchService.put<EducationDTO>(`${this.baseURI}/${educationId}`, updateEducationDTO);
    }

    public async deleteEducation(educationId: number): Promise<void> {
        await this.customFetchService.delete<void>(`${this.baseURI}/${educationId}`);
    }
}