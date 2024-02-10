import {EmployerDTO} from "../accountDTOs/EmployerDTO";
import {InterviewDTO} from "../userJobInteractionsDTOs/InterviewDTO";
import {JobApplyDTO} from "../userJobInteractionsDTOs/JobApplyDTO";
import {JobSalaryDTO} from "./JobSalaryDTO";
import {JobLocationTypes} from "../../enums/modelDataEnums/JobLocationTypes";
import {ResumeRequirementOptions} from "../../enums/modelDataEnums/ResumeRequirementOptions";
import Schedules from "../../enums/modelDataEnums/Schedules";
import EmployeeBenefits from "../../enums/modelDataEnums/EmployeeBenefits";
import JobTypes from "../../enums/modelDataEnums/JobTypes";

export interface JobDTO {
    id: number;
    jobTitle: string;
    numberOfOpenings: number;
    language: string;
    location: string;
    jobType: JobTypes[];
    locationCountry : string;
    jobLocationType : JobLocationTypes;
    salary? : JobSalaryDTO;
    schedule: Schedules[];
    benefits: EmployeeBenefits[];
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