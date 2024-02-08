import JobTypes from "../../enums/modelDataEnums/JobTypes";
import Schedules from "../../enums/modelDataEnums/Schedules";
import EmployeeBenefits from "../../enums/modelDataEnums/EmployeeBenefits";
import {CreateUpdateSalaryDTO} from "./CreateUpdateSalaryDTO";
import {JobLocationTypes} from "../../enums/modelDataEnums/JobLocationTypes";
import {ResumeRequirementOptions} from "../../enums/modelDataEnums/ResumeRequirementOptions";

export interface CreateIncompleteJobDTO {
    jobTitle: string;
    numberOfOpenings: number;
    language: string;
    location: string;
    locationCountry : string;
    jobLocationType : JobLocationTypes;
    jobType?: JobTypes[];
    salary? : CreateUpdateSalaryDTO;
    schedule?: Schedules[];
    benefits?: EmployeeBenefits[];
    contactEmail?: string;
    contactPhoneNumber? : string;
    resumeRequired?: ResumeRequirementOptions;
    description?: string;
}