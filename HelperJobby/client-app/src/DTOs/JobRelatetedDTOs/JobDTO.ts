import {EmployerAccountDTO} from "../AccountDTOs/EmployerAccountDTO";
import {InterviewDTO} from "../UserJobInteractionsDTOs/InterviewDTO";
import {JobApplyDTO} from "../UserJobInteractionsDTOs/JobApplyDTO";

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
    employerAccountId: number;
    employerAccount: EmployerAccountDTO;
    interviews: InterviewDTO[];
    jobApplies: JobApplyDTO[];
}