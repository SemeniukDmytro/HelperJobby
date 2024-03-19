import {OrganizationDTO} from "../organizationDTOs/OrganizationDTO";
import {JobDTO} from "../jobRelatetedDTOs/JobDTO";
import {UserDTO} from "../userRelatedDTOs/UserDTO";
import {IncompleteJobDTO} from "../jobRelatetedDTOs/IncompleteJobDTO";
import {ConversationDTO} from "../MessagingDTOs/ConversationDTO";

export interface EmployerDTO {
    id: number;
    userId: number;
    email: string;
    contactNumber: string;
    hasPostedFirstJob: boolean;
    fullName: string;
    user: UserDTO;
    organizationId: number;
    organization: OrganizationDTO;
    jobs: JobDTO[];
    incompleteJobs: IncompleteJobDTO[];
    conversations: ConversationDTO[];
}