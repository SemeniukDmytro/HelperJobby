import {JobSeekerAccountDTO} from "../DTOs/accountDTOs/JobSeekerAccountDTO";
import {Dispatch, SetStateAction} from "react";

export interface JobSeekerContextProps {
    jobSeeker: JobSeekerAccountDTO | null;
    setJobSeeker: Dispatch<SetStateAction<JobSeekerAccountDTO | null>>;
    savedJobsWereLoaded: boolean;
    setSavedJobsWereLoaded: Dispatch<SetStateAction<boolean>>;
    jobAppliesWereLoaded: boolean;
    setJobAppliesWereLoaded: Dispatch<SetStateAction<boolean>>;
    fetchJobSeeker: () => void;
    fetchJobSeekerSavedJobs: () => void;
    fetchJobSeekerJobApplies: () => void;
    fetchJobSeekerJobInteractions: () => void;

}