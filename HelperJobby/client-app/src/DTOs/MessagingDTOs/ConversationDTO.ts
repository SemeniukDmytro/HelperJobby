import {MessageDTO} from "./MessageDTO";
import {JobSeekerDTO} from "../accountDTOs/JobSeekerDTO";
import {EmployerDTO} from "../accountDTOs/EmployerDTO";
import {JobDTO} from "../jobRelatetedDTOs/JobDTO";

export interface ConversationDTO{
    id : number;
    lastModified : string;
    messages : MessageDTO[];
    jobSeekerId : number;
    jobSeeker : JobSeekerDTO;
    employerId : number;
    employer : EmployerDTO;
    jobId : number;
    job : JobDTO;
}