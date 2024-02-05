import {EmployerDTO} from "../accountDTOs/EmployerDTO";
import JobTypes from "../../enums/modelDataEnums/JobTypes";
import Schedules from "../../enums/modelDataEnums/Schedules";
import EmployeeBenefits from "../../enums/modelDataEnums/EmployeeBenefits";
import {IncompleteJobSalaryDTO} from "./IncompleteJobSalaryDTO";

export interface IncompleteJobDTO {
    id: number;
    jobTitle: string;
    numberOfOpenings: number;
    language: string;
    location: string;
    jobType: JobTypes[];
    salary : IncompleteJobSalaryDTO;
    schedule: Schedules[];
    benefits: EmployeeBenefits[];
    contactEmail: string;
    resumeRequired: boolean;
    description: string;
    employerId: number;
    employer: EmployerDTO;
}