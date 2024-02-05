import JobTypes from "../../enums/modelDataEnums/JobTypes";
import Schedules from "../../enums/modelDataEnums/Schedules";
import EmployeeBenefits from "../../enums/modelDataEnums/EmployeeBenefits";
import {CreateUpdateSalaryDTO} from "./CreateUpdateSalaryDTO";

export interface UpdatedJobDTO {
    jobTitle: string;
    numberOfOpenings: number;
    language: string;
    location: string;
    jobType: JobTypes[];
    salary : CreateUpdateSalaryDTO;
    schedule: Schedules[];
    benefits: EmployeeBenefits[];
    contactEmail: string;
    resumeRequired: boolean;
    description: string;
}