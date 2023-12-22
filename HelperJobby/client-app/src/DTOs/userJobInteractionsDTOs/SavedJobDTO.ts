import {JobSeekerAccountDTO} from "../accountDTOs/JobSeekerAccountDTO";
import {JobDTO} from "../jobRelatetedDTOs/JobDTO";

export interface SavedJobDTO {
    jobId: number;
    jobSeekerAccountId: number;
    job: JobDTO;
    jobSeekerAccount: JobSeekerAccountDTO;
}