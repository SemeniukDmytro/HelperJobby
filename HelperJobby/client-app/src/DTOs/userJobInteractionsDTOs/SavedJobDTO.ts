import {JobSeekerDTO} from "../accountDTOs/JobSeekerDTO";
import {JobDTO} from "../jobRelatetedDTOs/JobDTO";

export interface SavedJobDTO {
    jobId: number;
    jobSeekerId: number;
    job: JobDTO;
    jobSeeker: JobSeekerDTO;
    dateSaved: string;
}