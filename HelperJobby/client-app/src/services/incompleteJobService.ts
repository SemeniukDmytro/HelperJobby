import CustomFetchService from "./customFetchService";
import {IncompleteJobDTO} from "../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import {IncompleteJobDTOCreate} from "../DTOs/jobRelatetedDTOs/IncompleteJobDTOCreate";

export class IncompleteJobService {
    private readonly baseURI: string = "api/IncompleteJob";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getCurrentJob(employerAccountId: number): Promise<IncompleteJobDTO> {
        return await this.customFetchService.get<IncompleteJobDTO>(
            `${this.baseURI}/${employerAccountId}/incomplete-job`
        );
    }

    public async startJobCreation(incompleteJoCreateDTO: IncompleteJobDTOCreate): Promise<IncompleteJobDTO> {
        return await this.customFetchService.post<IncompleteJobDTO>(this.baseURI, incompleteJoCreateDTO);
    }

    public async updateJobCreation(currentJobId: number, updatedIncompleteJobDTO: IncompleteJobDTOCreate): Promise<IncompleteJobDTO> {
        return await this.customFetchService.put<IncompleteJobDTO>(
            `${this.baseURI}/${currentJobId}`,
            updatedIncompleteJobDTO
        );
    }

    public async deleteJobCreation(incompleteJobId: number): Promise<void> {
        await this.customFetchService.delete<void>(`${this.baseURI}/${incompleteJobId}`);
    }
}