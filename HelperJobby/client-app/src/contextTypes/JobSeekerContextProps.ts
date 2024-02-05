import {JobSeekerDTO} from "../DTOs/accountDTOs/JobSeekerDTO";
import {Dispatch, SetStateAction} from "react";

export interface JobSeekerContextProps {
    jobSeeker: JobSeekerDTO | null;
    setJobSeeker: Dispatch<SetStateAction<JobSeekerDTO | null>>;
    savedJobsWereLoaded: boolean;
    setSavedJobsWereLoaded: Dispatch<SetStateAction<boolean>>;
    jobAppliesWereLoaded: boolean;
    setJobAppliesWereLoaded: Dispatch<SetStateAction<boolean>>;
    fetchJobSeeker: () => void;
    fetchJobSeekerSavedJobs: () => void;
    fetchJobSeekerJobApplies: () => void;
    fetchJobSeekerJobInteractions: () => void;

}