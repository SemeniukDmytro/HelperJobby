import CustomFetchService from "./customFetchService";
import { OrganizationDTO } from "../DTOs/organizationDTOs/OrganizationDTO";
import { UpdateOrganizationDTO } from "../DTOs/organizationDTOs/UpdateOrganizationDTO";
import { OrganizationEmployeeEmailDTO } from "../DTOs/organizationDTOs/OrganizationEmployeeEmailDTO";
import { CreateOrganizationEmployeeEmailDTO } from "../DTOs/organizationDTOs/CreateOrganizationEmployeeEmailDTO";

export class OrganizationService {
    private readonly baseURI: string = "api/Organization";
    private readonly customFetchService: CustomFetchService;

    constructor() {
        this.customFetchService = new CustomFetchService();
    }

    public async getOrganizationById(id: number): Promise<OrganizationDTO> {
        return await this.customFetchService.get<OrganizationDTO>(`${this.baseURI}/${id}`);
    }

    public async updateOrganization(id: number, updatedOrganizationDTO: UpdateOrganizationDTO): Promise<OrganizationDTO> {
        return await this.customFetchService.put<OrganizationDTO>(`${this.baseURI}/${id}`, updatedOrganizationDTO);
    }

    public async addEmployeeEmail(organizationId: number, employeeEmailDTO: CreateOrganizationEmployeeEmailDTO): Promise<OrganizationEmployeeEmailDTO> {
        return await this.customFetchService.post<OrganizationEmployeeEmailDTO>(`${this.baseURI}/${organizationId}/add-employee`, employeeEmailDTO);
    }

    public async removeEmployeeEmail(employeeEmailId: number): Promise<void> {
        return await this.customFetchService.delete<void>(`${this.baseURI}/${employeeEmailId}/remove-employee`);
    }
}
