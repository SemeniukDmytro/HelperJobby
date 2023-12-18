import JobTypes from "../../Enums/JobTypes";
import EmployeeBenefits from "../../Enums/EmployeeBenefits";
import Schedules from "../../Enums/Schedules";

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