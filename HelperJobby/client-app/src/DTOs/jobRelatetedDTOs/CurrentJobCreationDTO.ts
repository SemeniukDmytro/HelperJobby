import {EmployerAccountDTO} from "../accountDTOs/EmployerAccountDTO";
import EmployeeBenefits from "../../enums/EmployeeBenefits";
import Schedules from "../../enums/Schedules";
import JobTypes from "../../enums/JobTypes";

export interface CurrentJobCreationDTO {
    id: number;
    jobTitle: string;
    numberOfOpenings: number;
    language: string;
    location: string;
    jobType: JobTypes[];
    salary: number;
    salaryRate: string;
    showPayBy: string;
    schedule: Schedules[];
    benefits: EmployeeBenefits[];
    contactEmail: string;
    resumeRequired: boolean;
    description: string;
    employerAccountId: number;
    employerAccount: EmployerAccountDTO;
}