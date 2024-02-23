import {JobSeekerDTO} from "../accountDTOs/JobSeekerDTO";
import {JobDTO} from "../jobRelatetedDTOs/JobDTO";
import {JobApplyStatuses} from "../../enums/modelDataEnums/JobApplyStatuses";
import {ResumeDTO} from "../resumeRelatedDTOs/ResumeDTO";

export interface JobApplyDTO {
    jobId: number;
    jobSeekerId: number;
    job: JobDTO;
    jobSeeker: JobSeekerDTO;
    resume : ResumeDTO;
    dateApplied: string;
    jobApplyStatus : JobApplyStatuses;
    isReviewed : boolean;
}