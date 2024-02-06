import CustomFetchService from "./customFetchService";
import {IncompleteJobDTO} from "../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import {CreateIncompleteJobDTO} from "../DTOs/jobRelatetedDTOs/CreateIncompleteJobDTO";
import {UpdatedIncompleteJobDTO} from "../DTOs/jobRelatetedDTOs/UpdatedIncompleteJobDTO";

export class IncompleteJobService {
    private readonly baseURI: string = "api/IncompleteJob";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getEmployerIncompleteJobs(employerId: number): Promise<IncompleteJobDTO[]> {
        return await this.customFetchService.get<IncompleteJobDTO[]>(
            `${this.baseURI}/${employerId}/incomplete-jobs`
        );
    }

    public async startJobCreation(incompleteJoCreateDTO: CreateIncompleteJobDTO): Promise<IncompleteJobDTO> {
        return await this.customFetchService.post<IncompleteJobDTO>(this.baseURI, incompleteJoCreateDTO);
    }

    public async updateJobCreation(currentJobId: number, updatedIncompleteJobDTO: UpdatedIncompleteJobDTO): Promise<IncompleteJobDTO> {
        return await this.customFetchService.put<IncompleteJobDTO>(
            `${this.baseURI}/${currentJobId}`,
            updatedIncompleteJobDTO
        );
    }

    public async deleteJobCreation(incompleteJobId: number): Promise<void> {
        await this.customFetchService.delete<void>(`${this.baseURI}/${incompleteJobId}`);
    }
}