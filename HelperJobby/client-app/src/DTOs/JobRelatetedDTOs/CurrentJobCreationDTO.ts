import {EmployerAccountDTO} from "../AccountDTOs/EmployerAccountDTO";
import EmployeeBenefits from "../../Enums/EmployeeBenefits";
import Schedules from "../../Enums/Schedules";
import JobTypes from "../../Enums/JobTypes";

export interface CurrentJobCreationDTO {
    id: number;
    jobTitle: string;
    numberOfOpenings: number;
    language: string;
    location: string;
    jobType: JobTypes[];
    salary: number;
    schedule: Schedules[];
    benefits: EmployeeBenefits[];
    contactEmail: string;
    resumeRequired: boolean;
    description: string;
    employerAccountId: number;
    employerAccount: EmployerAccountDTO;
}