import CustomFetchService from "./customFetchService";
import {CurrentJobCreationDTO} from "../DTOs/jobRelatetedDTOs/CurrentJobCreationDTO";
import {CurrentJobCreateDTO} from "../DTOs/jobRelatetedDTOs/CurrentJobCreateDTO";

export class CurrentJobCreationService {
    private readonly baseURI: string = "api/CurrentJob";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getCurrentJob(employerAccountId: number): Promise<CurrentJobCreationDTO> {
        return await this.customFetchService.get<CurrentJobCreationDTO>(
            `${this.baseURI}/${employerAccountId}/current-job-creation`
        );
    }

    public async startJobCreation(currentJobCreateDTO: CurrentJobCreateDTO): Promise<CurrentJobCreationDTO> {
        return await this.customFetchService.post<CurrentJobCreationDTO>(this.baseURI, currentJobCreateDTO);
    }

    public async updateJobCreation(currentJobId: number, currentJobCreateDTO: CurrentJobCreateDTO): Promise<CurrentJobCreationDTO> {
        return await this.customFetchService.put<CurrentJobCreationDTO>(
            `${this.baseURI}/${currentJobId}`,
            currentJobCreateDTO
        );
    }

    public async deleteJobCreation(jobId: number): Promise<void> {
        await this.customFetchService.delete<void>(`${this.baseURI}/${jobId}`);
    }
}