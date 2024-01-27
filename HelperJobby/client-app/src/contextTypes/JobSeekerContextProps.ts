import {JobSeekerAccountDTO} from "../DTOs/accountDTOs/JobSeekerAccountDTO";
import {Dispatch, SetStateAction} from "react";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";
import {SavedJobDTO} from "../DTOs/userJobInteractionsDTOs/SavedJobDTO";
import {JobApplyDTO} from "../DTOs/userJobInteractionsDTOs/JobApplyDTO";

export interface JobSeekerContextProps{
    jobSeeker: JobSeekerAccountDTO | null;
    setJobSeeker : Dispatch<SetStateAction<JobSeekerAccountDTO | null>>;
    jobSeekerSavedJobs: SavedJobDTO[];
    setJobSeekerSavedJobs: Dispatch<SetStateAction<SavedJobDTO[]>>;
    jobSeekerJobApplies: JobApplyDTO[];
    setJobSeekerJobApplies: Dispatch<SetStateAction<JobApplyDTO[]>>;
    fetchJobSeeker: () => void;
    
}