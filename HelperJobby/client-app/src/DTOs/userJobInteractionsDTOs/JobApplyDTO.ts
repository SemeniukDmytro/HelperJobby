import {JobSeekerDTO} from "../accountDTOs/JobSeekerDTO";
import {JobDTO} from "../jobRelatetedDTOs/JobDTO";

export interface JobApplyDTO {
    jobId: number;
    jobSeekerId: number;
    job: JobDTO;
    jobSeeker: JobSeekerDTO;
    dateApplied: Date;
}