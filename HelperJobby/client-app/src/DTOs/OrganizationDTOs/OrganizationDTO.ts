import {EmployerAccountDTO} from "../AccountDTOs/EmployerAccountDTO";
import {CreateOrganizationEmployeeEmailDTO} from "./CreateOrganizationEmployeeEmailDTO";

export interface OrganizationDTO {
    id: number;
    name: string;
    phoneNumber: string;
    numberOfEmployees: number;
    organizationOwnerId: number;
    employeeAccounts: EmployerAccountDTO[];
    employeeEmails: CreateOrganizationEmployeeEmailDTO[];
}