import CustomFetchService from "./customFetchService";
import {EmployerAccountDTO} from "../DTOs/accountDTOs/EmployerAccountDTO";
import {CreateEmployerAccountDTO} from "../DTOs/accountDTOs/CreateEmployerAccountDTO";
import {UpdateEmployerAccountDTO} from "../DTOs/accountDTOs/UpdateEmployerAccountDTO";

export class EmployerAccountService {
    private readonly baseURI: string = "api/Employer";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getCurrentUserAccount(): Promise<EmployerAccountDTO> {
        return await this.customFetchService.get<EmployerAccountDTO>(`${this.baseURI}/my-employer-account`);
    }

    public async getUserEmployerAccount(userId: number): Promise<EmployerAccountDTO> {
        return await this.customFetchService.get<EmployerAccountDTO>(`${this.baseURI}/${userId}`);
    }

    public async createEmployerAccount(createdEmployerAccountDTO: CreateEmployerAccountDTO): Promise<EmployerAccountDTO> {
        return await this.customFetchService.post<EmployerAccountDTO>(this.baseURI, createdEmployerAccountDTO);
    }

    public async updateEmployerAccount(userId: number, updatedAccount: UpdateEmployerAccountDTO): Promise<EmployerAccountDTO> {
        return await this.customFetchService.put<EmployerAccountDTO>(`${this.baseURI}/${userId}`, updatedAccount);
    }
}