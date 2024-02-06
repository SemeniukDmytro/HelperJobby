import {JobDTO} from "../../DTOs/jobRelatetedDTOs/JobDTO";
import {thousandsDisplayHelper} from "../thousandsDisplayHelper";
import {ShowPayByOptions} from "../../enums/modelDataEnums/ShowPayByOptions";

export function formatJobSalaryDisplay(job : JobDTO){
    if (!job.salary){
        return "";
    }
    return `$${thousandsDisplayHelper(job.salary.minimalAmount)}${job.salary.showPayByOption == ShowPayByOptions.Range ?
    `–$${thousandsDisplayHelper(job.salary.maximalAmount!)}` : ""} ${job.salary.salaryRate}`
}