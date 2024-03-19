import {ShowPayByOptions} from "../../enums/modelDataEnums/ShowPayByOptions";
import {SalaryRates} from "../../enums/modelDataEnums/SalaryRates";

export interface CreateUpdateSalaryDTO {
    showPayByOption: ShowPayByOptions;
    minimalAmount: number;
    maximalAmount?: number;
    meetsMinSalaryRequirement: boolean;
    salaryRate: SalaryRates;
}