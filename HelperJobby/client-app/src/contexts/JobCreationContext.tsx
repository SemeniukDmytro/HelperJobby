import {createContext, ReactNode, useState} from "react";
import {JobCreationContextProps} from "../contextTypes/JobCreationContextProps";
import {IncompleteJobDTO} from "../DTOs/jobRelatetedDTOs/IncompleteJobDTO";

export const JobCreationContext = createContext<JobCreationContextProps>({
    incompleteJob : null,
    setIncompleteJob : () => {}
});

export function JobCreationProvider({children} : {children : ReactNode}) {
    const [incompleteJob, setIncompleteJob] = useState<IncompleteJobDTO | null>(null);
    
    return (
        <JobCreationContext.Provider value={{incompleteJob, setIncompleteJob}}>
            {children}
        </JobCreationContext.Provider>
    )
}