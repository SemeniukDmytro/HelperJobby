import {ShowPayByOptions} from "../../enums/modelDataEnums/ShowPayByOptions";
import {JobDTO} from "./JobDTO";
import {SalaryRates} from "../../enums/modelDataEnums/SalaryRates";

export interface JobSalaryDTO {
    id: number;
    showPayByOption: ShowPayByOptions;
    minimalAmount: number;
    maximalAmount?: number | null;
    salaryRate: SalaryRates;
    meetsMinSalaryRequirement : boolean;
    jobId: number;
    job: JobDTO;
}