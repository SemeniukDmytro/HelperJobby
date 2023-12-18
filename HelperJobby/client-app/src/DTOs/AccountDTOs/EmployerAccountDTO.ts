import {UserDTO} from "../UserDTOs/UserDTO";
import {JobDTO} from "../JobRelatetedDTOs/JobDTO";
import {OrganizationDTO} from "../OrganizationDTOs/OrganizationDTO";

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