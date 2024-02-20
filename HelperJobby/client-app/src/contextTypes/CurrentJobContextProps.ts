import {IncompleteJobDTO} from "../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import {Dispatch, SetStateAction} from "react";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";
import {JobCreationStates} from "../enums/utilityEnums/JobCreationStates";

export interface CurrentJobContextProps {
    currentJob : IncompleteJobDTO | JobDTO | null;
    setCurrentJob : Dispatch<SetStateAction<IncompleteJobDTO | JobDTO | null>>;
    jobCreationState : JobCreationStates | null;
    setJobCreationState : Dispatch<SetStateAction<JobCreationStates | null>>;
}