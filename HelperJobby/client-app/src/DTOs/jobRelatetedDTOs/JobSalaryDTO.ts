import {ShowPayByOptions} from "../../enums/modelDataEnums/ShowPayByOptions";
import {JobDTO} from "./JobDTO";

export interface JobSalaryDTO {
    id: number;
    showPayByOption: ShowPayByOptions;
    minimalAmount: number;
    maximalAmount?: number | null;
    salaryRate: string;
    jobId: number;
    job: JobDTO;
}