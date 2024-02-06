import {IncompleteJobDTO} from "../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import {Dispatch, SetStateAction} from "react";

export interface JobCreationContextProps {
    incompleteJob : IncompleteJobDTO | null;
    setIncompleteJob : Dispatch<SetStateAction<IncompleteJobDTO | null>>;
}