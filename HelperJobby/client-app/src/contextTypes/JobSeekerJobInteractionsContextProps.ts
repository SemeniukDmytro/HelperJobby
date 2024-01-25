import {SavedJobDTO} from "../DTOs/userJobInteractionsDTOs/SavedJobDTO";
import {Dispatch, SetStateAction} from "react";
import {JobApplyDTO} from "../DTOs/userJobInteractionsDTOs/JobApplyDTO";
import {InterviewDTO} from "../DTOs/userJobInteractionsDTOs/InterviewDTO";

export interface JobSeekerJobInteractionsContextProps {
    savedJobs : SavedJobDTO[];
    setSavedJobs : Dispatch<SetStateAction<SavedJobDTO[]>>;
    jobApplies : JobApplyDTO[];
    setJobApplies : Dispatch<SetStateAction<JobApplyDTO[]>>;
    interviews : InterviewDTO[];
    setInterviews : Dispatch<SetStateAction<InterviewDTO[]>>;
    fetchJobSeekerJobInteractions : () => void
}