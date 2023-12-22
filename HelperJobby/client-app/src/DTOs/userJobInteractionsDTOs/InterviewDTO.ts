import {JobSeekerAccountDTO} from "../accountDTOs/JobSeekerAccountDTO";
import {JobDTO} from "../jobRelatetedDTOs/JobDTO";

export interface InterviewDTO {
    jobId: number;
    jobSeekerAccountId: number;
    job: JobDTO;
    jobSeekerAccount: JobSeekerAccountDTO;
    dateTime: Date;
}