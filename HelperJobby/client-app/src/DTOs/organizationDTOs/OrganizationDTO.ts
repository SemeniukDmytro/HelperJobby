import {EmployerAccountDTO} from "../accountDTOs/EmployerAccountDTO";
import {CreateOrganizationEmployeeEmailDTO} from "./CreateOrganizationEmployeeEmailDTO";

export interface OrganizationDTO {
    id: number;
    name: string;
    phoneNumber: string;
    numberOfEmployees: number | null;
    organizationOwnerId: number;
    employeeAccounts: EmployerAccountDTO[];
    employeeEmails: CreateOrganizationEmployeeEmailDTO[];
}