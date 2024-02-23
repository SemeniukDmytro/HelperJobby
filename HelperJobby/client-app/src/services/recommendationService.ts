import CustomFetchService from "./customFetchService";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";

export class RecommendationService {
    private readonly baseURI: string = "api/Recommendation";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService()
    }

    public async getRecommendedJobs(): Promise<JobDTO[]> {
        return await this.customFetchService.get<JobDTO[]>(`${this.baseURI}/recommended-jobs`);
    }

    public async getRandomJobs(): Promise<JobDTO[]> {
        return await this.customFetchService.get<JobDTO[]>(`${this.baseURI}/random-jobs`);
    }

}