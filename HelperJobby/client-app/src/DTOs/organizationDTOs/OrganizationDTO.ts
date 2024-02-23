import {EmployerDTO} from "../accountDTOs/EmployerDTO";
import {CreateOrganizationEmployeeEmailDTO} from "./CreateOrganizationEmployeeEmailDTO";

export interface OrganizationDTO {
    id: number;
    name: string;
    phoneNumber: string;
    numberOfEmployees?: number;
    organizationOwnerId: number;
    employeeAccounts: EmployerDTO[];
    employeeEmails: CreateOrganizationEmployeeEmailDTO[];
}