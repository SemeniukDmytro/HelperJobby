import {JobSeekerDTO} from "../accountDTOs/JobSeekerDTO";
import {EmployerDTO} from "../accountDTOs/EmployerDTO";
import {ConversationDTO} from "./ConversationDTO";

export interface MessageDTO{
    id : number;
    content : string;
    sentAt : Date;
    isRead : boolean;
    jobSeekerId? : number;
    jobSeeker? : JobSeekerDTO;
    employerId? : number;
    employer? : EmployerDTO;
    conversationId : number;
    conversation : ConversationDTO;
}
