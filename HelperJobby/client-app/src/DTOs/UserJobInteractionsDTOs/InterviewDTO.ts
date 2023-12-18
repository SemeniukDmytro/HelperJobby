import {JobDTO} from "../JobRelatetedDTOs/JobDTO";
import {JobSeekerAccountDTO} from "../AccountDTOs/JobSeekerAccountDTO";

export interface InterviewDTO {
    jobId: number;
    jobSeekerAccountId: number;
    job: JobDTO;
    jobSeekerAccount: JobSeekerAccountDTO;
    dateTime: Date;
}