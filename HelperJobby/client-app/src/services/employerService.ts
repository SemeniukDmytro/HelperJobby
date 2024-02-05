import CustomFetchService from "./customFetchService";
import {EmployerDTO} from "../DTOs/accountDTOs/EmployerDTO";
import {CreateEmployerDTO} from "../DTOs/accountDTOs/CreateEmployerDTO";
import {UpdateEmployerDTO} from "../DTOs/accountDTOs/UpdateEmployerDTO";

export class EmployerService {
    private readonly baseURI: string = "api/Employer";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getCurrentUserAccount(): Promise<EmployerDTO> {
        return await this.customFetchService.get<EmployerDTO>(`${this.baseURI}/my-employer-account`);
    }

    public async getUserEmployerAccount(userId: number): Promise<EmployerDTO> {
        return await this.customFetchService.get<EmployerDTO>(`${this.baseURI}/${userId}`);
    }

    public async createEmployerAccount(createdEmployerDTO: CreateEmployerDTO): Promise<EmployerDTO> {
        return await this.customFetchService.post<EmployerDTO>(this.baseURI, createdEmployerDTO);
    }

    public async updateEmployerAccount(userId: number, updatedEmployer: UpdateEmployerDTO): Promise<EmployerDTO> {
        return await this.customFetchService.put<EmployerDTO>(`${this.baseURI}/${userId}`, updatedEmployer);
    }
}