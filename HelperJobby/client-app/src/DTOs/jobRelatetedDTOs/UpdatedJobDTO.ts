import JobTypes from "../../enums/JobTypes";
import EmployeeBenefits from "../../enums/EmployeeBenefits";
import Schedules from "../../enums/Schedules";

export interface UpdatedJobDTO {
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
}