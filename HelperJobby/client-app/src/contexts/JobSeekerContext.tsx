import {createContext, ReactNode, useState} from "react";
import {JobSeekerContextProps} from "../contextTypes/JobSeekerContextProps";
import {JobSeekerAccountDTO} from "../DTOs/accountDTOs/JobSeekerAccountDTO";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";

const JobSeekerContext = createContext<JobSeekerContextProps>({
    jobSeeker : null,
    setJobSeeker : () => {}, 
    jobSeekerSavedJobs : [],
    setJobSeekerSavedJobs: () => {}
});

export function JobSeekerProvider({children} : {children : ReactNode}){
    const [jobSeeker, setJobSeeker] = useState<JobSeekerAccountDTO | null>(null);
    const [jobSeekerSavedJobs, setJobSeekerSavedJobs] = useState<JobDTO[]>([]);
    
    return (
        <JobSeekerContext.Provider value={{
            jobSeeker,
            setJobSeeker,
            jobSeekerSavedJobs,
            setJobSeekerSavedJobs}
        }>
            {children}
        </JobSeekerContext.Provider>
    )
}

export default JobSeekerContext;