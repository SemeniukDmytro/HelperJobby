import {JobApplyStatuses} from "../../enums/modelDataEnums/JobApplyStatuses";

export interface UpdateJobApplyDTO{
    jobApplyStatus : JobApplyStatuses;
}