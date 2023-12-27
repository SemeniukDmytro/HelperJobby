import {EmployerAccountDTO} from "../accountDTOs/EmployerAccountDTO";
import {InterviewDTO} from "../userJobInteractionsDTOs/InterviewDTO";
import {JobApplyDTO} from "../userJobInteractionsDTOs/JobApplyDTO";

export interface JobDTO {
    id: number;
    jobTitle: string;
    numberOfOpenings: number;
    language: string;
    location: string;
    jobType: string[];
    salary: number;
    schedule: string[];
    benefits: string[];
    contactEmail: string;
    resumeRequired: boolean;
    description: string;
    datePosted: Date;
    employerAccountId: number;
    employerAccount: EmployerAccountDTO;
    interviews: InterviewDTO[];
    jobApplies: JobApplyDTO[];
}