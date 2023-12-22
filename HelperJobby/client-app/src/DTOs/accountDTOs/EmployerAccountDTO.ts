import {OrganizationDTO} from "../organizationDTOs/OrganizationDTO";
import {JobDTO} from "../jobRelatetedDTOs/JobDTO";
import {UserDTO} from "../userRelatedDTOs/UserDTO";

export interface EmployerAccountDTO {
    id: number;
    userId: number;
    email: string;
    contactNumber: string;
    fullName: string;
    user: UserDTO;
    organizationId: number;
    organization: OrganizationDTO;
    jobs: JobDTO[];
}