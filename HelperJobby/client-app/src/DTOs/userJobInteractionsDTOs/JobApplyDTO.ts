import {JobSeekerDTO} from "../accountDTOs/JobSeekerDTO";
import {JobDTO} from "../jobRelatetedDTOs/JobDTO";
import {JobApplyStatuses} from "../../enums/modelDataEnums/JobApplyStatuses";

export interface JobApplyDTO {
    jobId: number;
    jobSeekerId: number;
    job: JobDTO;
    jobSeeker: JobSeekerDTO;
    dateApplied: Date;
    jobApplyStatus : JobApplyStatuses;
}