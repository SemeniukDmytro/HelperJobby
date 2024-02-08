import {EmployerDTO} from "../accountDTOs/EmployerDTO";
import {InterviewDTO} from "../userJobInteractionsDTOs/InterviewDTO";
import {JobApplyDTO} from "../userJobInteractionsDTOs/JobApplyDTO";
import {JobSalaryDTO} from "./JobSalaryDTO";
import {JobLocationTypes} from "../../enums/modelDataEnums/JobLocationTypes";
import {ResumeRequirementOptions} from "../../enums/modelDataEnums/ResumeRequirementOptions";

export interface JobDTO {
    id: number;
    jobTitle: string;
    numberOfOpenings: number;
    language: string;
    location: string;
    jobType: string[];
    locationCountry : string;
    jobLocationType : JobLocationTypes;
    salary? : JobSalaryDTO;
    schedule: string[];
    benefits: string[];
    contactEmail: string;
    contactPhoneNumber? : string;
    resumeRequired: ResumeRequirementOptions;
    description: string;
    datePosted: Date;
    employerId: number;
    employer: EmployerDTO;
    interviews: InterviewDTO[];
    jobApplies: JobApplyDTO[];
}