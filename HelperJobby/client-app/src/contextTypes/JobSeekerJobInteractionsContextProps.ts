import {SavedJobDTO} from "../DTOs/userJobInteractionsDTOs/SavedJobDTO";
import {Dispatch, SetStateAction} from "react";
import {JobApplyDTO} from "../DTOs/userJobInteractionsDTOs/JobApplyDTO";
import {InterviewDTO} from "../DTOs/userJobInteractionsDTOs/InterviewDTO";

export interface JobSeekerJobInteractionsContextProps {
    savedJobs: SavedJobDTO[] | null;
    setSavedJobs: Dispatch<SetStateAction<SavedJobDTO[] | null>>;
    jobApplies: JobApplyDTO[] | null;
    setJobApplies: Dispatch<SetStateAction<JobApplyDTO[] | null>>;
    interviews: InterviewDTO[] | null;
    setInterviews: Dispatch<SetStateAction<InterviewDTO[] | null>>;
    fetchJobSeekerJobInteractions: () => void;
    requestInProgress: boolean;
}