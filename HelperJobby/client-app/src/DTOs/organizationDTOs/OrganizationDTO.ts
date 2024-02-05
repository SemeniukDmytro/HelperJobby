import {EmployerDTO} from "../accountDTOs/EmployerDTO";
import {CreateOrganizationEmployeeEmailDTO} from "./CreateOrganizationEmployeeEmailDTO";

export interface OrganizationDTO {
    id: number;
    name: string;
    phoneNumber: string;
    numberOfEmployees: number | null;
    organizationOwnerId: number;
    employeeAccounts: EmployerDTO[];
    employeeEmails: CreateOrganizationEmployeeEmailDTO[];
}