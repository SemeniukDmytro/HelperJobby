import {ShowPayByOptions} from "../../enums/modelDataEnums/ShowPayByOptions";
import {JobDTO} from "./JobDTO";

export interface JobSalaryDTO {
    id: number;
    showPayByOption: ShowPayByOptions;
    minimalAmount: number;
    maximalAmount?: number | null;
    salaryRate: string;
    meetsMinSalaryRequirement : boolean;
    jobId: number;
    job: JobDTO;
}