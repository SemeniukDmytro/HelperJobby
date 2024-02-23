import {createContext, ReactNode, useState} from "react";
import {CurrentJobContextProps} from "../contextTypes/CurrentJobContextProps";
import {IncompleteJobDTO} from "../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";
import {JobCreationStates} from "../enums/utilityEnums/JobCreationStates";

export const CurrentEmployerJobContext = createContext<CurrentJobContextProps>({
    currentJob: null,
    setCurrentJob: () => {
    },
    jobCreationState: null,
    setJobCreationState: () => {
    }
});

export function CurrentEmployerJobProvider({children}: { children: ReactNode }) {
    const [currentJob, setCurrentJob] = useState<IncompleteJobDTO | JobDTO | null>(null);
    const [jobCreationState, setJobCreationState] = useState<JobCreationStates | null>(null);

    return (
        <CurrentEmployerJobContext.Provider value={{
            currentJob, setCurrentJob,
            jobCreationState, setJobCreationState
        }}>
            {children}
        </CurrentEmployerJobContext.Provider>
    )
}