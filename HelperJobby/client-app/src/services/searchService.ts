import CustomFetchService from "./customFetchService";
import {ResumeSearchResultDTO} from "../DTOs/searchDTOs/ResumeSearchResultDTO";
import {JobSearchResultDTO} from "../DTOs/searchDTOs/JobSearchResultDTO";

export class SearchService {
    private readonly baseURI: string = "api/Search";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async searchJobs(
        query: string,
        location: string = "",
        start: number = 0,
        isRemote: boolean = false,
        pay: number = 0,
        jobType: number = 0,
        language: string = ""
    ): Promise<JobSearchResultDTO> {
        const queryString = `q=${query}&location=${location}&start=${start}&isRemote=${isRemote}&pay=${pay}&jobType=${jobType}&language=${language}`;
        return await this.customFetchService.get<JobSearchResultDTO>(`${this.baseURI}/jobs?${queryString}`);
    }

    public async searchResumes(query: string, start: number): Promise<ResumeSearchResultDTO> {
        const queryString = `q=${query}&start=${start}`;
        return await this.customFetchService.get<ResumeSearchResultDTO>(`${this.baseURI}/resumes?${queryString}`);
    }
}