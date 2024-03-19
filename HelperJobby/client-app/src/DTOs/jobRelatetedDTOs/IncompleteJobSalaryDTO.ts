import {ShowPayByOptions} from "../../enums/modelDataEnums/ShowPayByOptions";
import {IncompleteJobDTO} from "./IncompleteJobDTO";
import {SalaryRates} from "../../enums/modelDataEnums/SalaryRates";

export interface IncompleteJobSalaryDTO {
    id: number;
    showPayByOption: ShowPayByOptions;
    minimalAmount: number;
    maximalAmount?: number;
    salaryRate: SalaryRates;
    meetsMinSalaryRequirement: boolean;
    incompleteJobId: number;
    incompleteJob: IncompleteJobDTO;
}