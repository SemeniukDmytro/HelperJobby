import {EmployerDTO} from "../accountDTOs/EmployerDTO";
import JobTypes from "../../enums/modelDataEnums/JobTypes";
import Schedules from "../../enums/modelDataEnums/Schedules";
import EmployeeBenefits from "../../enums/modelDataEnums/EmployeeBenefits";
import {IncompleteJobSalaryDTO} from "./IncompleteJobSalaryDTO";
import {JobLocationTypes} from "../../enums/modelDataEnums/JobLocationTypes";
import {ResumeRequirementOptions} from "../../enums/modelDataEnums/ResumeRequirementOptions";

export interface IncompleteJobDTO {
    id: number;
    jobTitle: string;
    numberOfOpenings: number;
    language: string;
    location: string;
    locationCountry: string;
    jobLocationType: JobLocationTypes;
    jobType?: JobTypes[];
    salary?: IncompleteJobSalaryDTO;
    schedule?: Schedules[];
    benefits?: EmployeeBenefits[];
    contactEmail?: string;
    contactPhoneNumber?: string;
    resumeRequired?: ResumeRequirementOptions;
    description?: string;
    employerId: number;
    employer: EmployerDTO;
}