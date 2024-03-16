import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";
import {Dispatch, SetStateAction} from "react";

export interface CurrentJobApplicationContextProps{
    job : JobDTO | null;
    setJob : Dispatch<SetStateAction<JobDTO | null>>;
    showExitDialog : boolean;
    setShowExitDialog : Dispatch<SetStateAction<boolean>>;
}