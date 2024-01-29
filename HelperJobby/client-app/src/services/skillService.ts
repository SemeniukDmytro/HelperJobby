import CustomFetchService from './customFetchService';
import {SkillDTO} from "../DTOs/resumeRelatedDTOs/SkillDTO";
import {CreateSkillDTO} from "../DTOs/resumeRelatedDTOs/CreateSkillDTO";

export class SkillService {
    private readonly baseURI: string = 'api/Skill';
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getSkillById(skillId: number): Promise<SkillDTO> {
        return await this.customFetchService.get<SkillDTO>(`${this.baseURI}/${skillId}`);
    }

    public async addSkill(resumeId: number, createdSkillDTO: CreateSkillDTO): Promise<SkillDTO> {
        return await this.customFetchService.post<SkillDTO>(`${this.baseURI}/${resumeId}`, createdSkillDTO);
    }

    public async deleteSkill(skillId: number): Promise<void> {
        return await this.customFetchService.delete<void>(`${this.baseURI}/${skillId}`);
    }

    public async addSkillsToResume(resumeId: number, skillsDTOs: CreateSkillDTO[]): Promise<SkillDTO[]> {
        const skills = await this.customFetchService.post<SkillDTO[]>(`${this.baseURI}/${resumeId}/add-skills`, skillsDTOs);
        return skills;
    }

    public async removeSkillsFromResume(resumeId: number): Promise<void> {
        await this.customFetchService.delete<void>(`${this.baseURI}/${resumeId}/remove-skills`);
    }
}