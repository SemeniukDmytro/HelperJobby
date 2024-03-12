import {JobSeekerDTO} from "../accountDTOs/JobSeekerDTO";
import {EmployerDTO} from "../accountDTOs/EmployerDTO";
import {JobDTO} from "../jobRelatetedDTOs/JobDTO";

export interface ConversationWithoutMessagesDTO {
    id : number;
    lastModified : string;
    employersUnreadMessagesCount : number;
    jobSeekersUnreadMessagesCount : number;
    jobSeekerId : number;
    jobSeeker : JobSeekerDTO;
    employerId : number;
    employer : EmployerDTO;
    jobId : number;
    job : JobDTO;
}