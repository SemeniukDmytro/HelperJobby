import {JobSeekerAccountDTO} from "../accountDTOs/JobSeekerAccountDTO";
import {JobDTO} from "../jobRelatetedDTOs/JobDTO";

export interface JobApplyDTO {
    jobId: number;
    jobSeekerAccountId: number;
    job: JobDTO;
    jobSeekerAccount: JobSeekerAccountDTO;
    dateApplied: Date;
}