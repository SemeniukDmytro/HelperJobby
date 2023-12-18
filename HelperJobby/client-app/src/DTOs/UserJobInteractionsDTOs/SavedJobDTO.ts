import {JobDTO} from "../JobRelatetedDTOs/JobDTO";
import {JobSeekerAccountDTO} from "../AccountDTOs/JobSeekerAccountDTO";

export interface SavedJobDTO {
    jobId: number;
    jobSeekerAccountId: number;
    job: JobDTO;
    jobSeekerAccount: JobSeekerAccountDTO;
}