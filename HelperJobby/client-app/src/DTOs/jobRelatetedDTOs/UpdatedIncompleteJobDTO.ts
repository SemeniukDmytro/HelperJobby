import JobTypes from "../../enums/modelDataEnums/JobTypes";
import {CreateUpdateSalaryDTO} from "./CreateUpdateSalaryDTO";
import Schedules from "../../enums/modelDataEnums/Schedules";
import EmployeeBenefits from "../../enums/modelDataEnums/EmployeeBenefits";
import {JobLocationTypes} from "../../enums/modelDataEnums/JobLocationTypes";
import {ResumeRequirementOptions} from "../../enums/modelDataEnums/ResumeRequirementOptions";

export interface UpdatedIncompleteJobDTO {
    jobTitle?: string;
    numberOfOpenings?: number;
    language?: string;
    location?: string;
    locationCountry?: string;
    jobLocationType?: JobLocationTypes;
    jobType?: JobTypes[];
    salary?: CreateUpdateSalaryDTO;
    schedule?: Schedules[];
    benefits?: EmployeeBenefits[];
    contactEmail?: string;
    contactPhoneNumber?: string;
    resumeRequired?: ResumeRequirementOptions;
    description?: string;
}