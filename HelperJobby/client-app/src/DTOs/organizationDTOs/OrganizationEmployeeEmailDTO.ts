import {OrganizationDTO} from "./OrganizationDTO";

export interface OrganizationEmployeeEmailDTO {
    id: number;
    email: string;
    organizationId: number;
    organization: OrganizationDTO;
}