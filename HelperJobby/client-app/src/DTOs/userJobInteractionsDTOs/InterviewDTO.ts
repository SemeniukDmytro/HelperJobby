import {JobSeekerDTO} from "../accountDTOs/JobSeekerDTO";
import {JobDTO} from "../jobRelatetedDTOs/JobDTO";

export interface InterviewDTO {
    jobId: number;
    jobSeekerId: number;
    job: JobDTO;
    jobSeeker: JobSeekerDTO;
    interviewStart: string;
    interviewEnd: string;
    interviewType: string;
    appointmentInfo: string;
}
