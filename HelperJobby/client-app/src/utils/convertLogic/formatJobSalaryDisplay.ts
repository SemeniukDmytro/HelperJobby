import {JobDTO} from "../../DTOs/jobRelatetedDTOs/JobDTO";
import {thousandsDisplayHelper} from "../thousandsDisplayHelper";
import {ShowPayByOptions} from "../../enums/modelDataEnums/ShowPayByOptions";
import {salaryRatesEnumToStringMap} from "./enumToStringConverter";
import {IncompleteJobDTO} from "../../DTOs/jobRelatetedDTOs/IncompleteJobDTO";

export function formatJobSalaryDisplay(job: JobDTO | IncompleteJobDTO) {
    if (!job.salary) {
        return "";
    }
    return `$${thousandsDisplayHelper(job.salary.minimalAmount)}${job.salary.showPayByOption == ShowPayByOptions.Range ?
        `–$${thousandsDisplayHelper(job.salary.maximalAmount!)}` : ""} ${salaryRatesEnumToStringMap(job.salary.salaryRate)}`
}