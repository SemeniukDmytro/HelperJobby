import {createContext, ReactNode, useState} from "react";
import {CurrentJobApplicationContextProps} from "../contextTypes/CurrentJobApplicationContextProps";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";

const CurrentJobApplicationContext = createContext<CurrentJobApplicationContextProps>({
    job : null,
    setJob : () => {}
});

export function CurrentJobApplicationProvider({children} : {children : ReactNode}){
    const [job, setJob] = useState<JobDTO | null>(null);
    console.log(job)
    
    return (
        <CurrentJobApplicationContext.Provider value={{
            job,
            setJob
        }}>
            {children}
        </CurrentJobApplicationContext.Provider>
    )
}

export default CurrentJobApplicationContext;