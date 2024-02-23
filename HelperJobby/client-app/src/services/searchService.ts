import CustomFetchService from "./customFetchService";
import {ResumeSearchResultDTO} from "../DTOs/searchDTOs/ResumeSearchResultDTO";
import {JobSearchResultDTO} from "../DTOs/searchDTOs/JobSearchResultDTO";
import getJobSearchRequestURI from "../utils/getJobSearchRequestURI";
import JobTypes from "../enums/modelDataEnums/JobTypes";

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
        jobType: JobTypes = 0,
        language: string = ""
    ): Promise<JobSearchResultDTO> {
        const requestURI = getJobSearchRequestURI(query, location, start, isRemote, pay, jobType, language);
        return await this.customFetchService.get<JobSearchResultDTO>(`${this.baseURI}${requestURI}`);
    }

    public async searchResumes(query: string, start: number): Promise<ResumeSearchResultDTO> {
        const queryString = `q=${query}&start=${start}`;
        return await this.customFetchService.get<ResumeSearchResultDTO>(`${this.baseURI}/resumes?${queryString}`);
    }
}