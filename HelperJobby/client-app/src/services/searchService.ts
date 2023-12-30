import CustomFetchService from "./customFetchService";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";
import {ResumeDTO} from "../DTOs/resumeRelatedDTOs/ResumeDTO";

export class SearchService {
    private readonly baseURI: string = "api/Search";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async searchJobs(
        query: string,
        location: string,
        start: number = 0,
        isRemote: boolean = false,
        pay: number = 0,
        jobType: number = 0,
        language: string = ""
    ): Promise<JobDTO[]> {
        const queryString = `query=${query}&location=${location}&start=${start}&isRemote=${isRemote}&pay=${pay}&jobType=${jobType}&language=${language}`;
        return await this.customFetchService.get<JobDTO[]>(`${this.baseURI}/jobs?${queryString}`);
    }

    public async searchResumes(query: string, start: number): Promise<ResumeDTO[]> {
        const queryString = `query=${query}&start=${start}`;
        return await this.customFetchService.get<ResumeDTO[]>(`${this.baseURI}/resumes?${queryString}`);
    }
}