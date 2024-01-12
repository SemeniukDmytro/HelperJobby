import {JobSeekerAccountDTO} from "../DTOs/accountDTOs/JobSeekerAccountDTO";
import {Dispatch, SetStateAction} from "react";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";

export interface JobSeekerContextProps{
    jobSeeker: JobSeekerAccountDTO | null;
    setJobSeeker : Dispatch<SetStateAction<JobSeekerAccountDTO | null>>;
    jobSeekerSavedJobs: JobDTO[];
    setJobSeekerSavedJobs: Dispatch<SetStateAction<JobDTO[]>>;
}