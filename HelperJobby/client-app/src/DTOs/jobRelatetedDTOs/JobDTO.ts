import {EmployerDTO} from "../accountDTOs/EmployerDTO";
import {InterviewDTO} from "../userJobInteractionsDTOs/InterviewDTO";
import {JobApplyDTO} from "../userJobInteractionsDTOs/JobApplyDTO";
import {JobSalaryDTO} from "./JobSalaryDTO";

export interface JobDTO {
    id: number;
    jobTitle: string;
    numberOfOpenings: number;
    language: string;
    location: string;
    jobType: string[];
    salary : JobSalaryDTO;
    schedule: string[];
    benefits: string[];
    contactEmail: string;
    resumeRequired: boolean;
    description: string;
    datePosted: Date;
    employerId: number;
    employer: EmployerDTO;
    interviews: InterviewDTO[];
    jobApplies: JobApplyDTO[];
}