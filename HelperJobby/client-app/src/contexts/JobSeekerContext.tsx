import {createContext, ReactNode, useState} from "react";
import {JobSeekerContextProps} from "../contextTypes/JobSeekerContextProps";
import {JobSeekerAccountDTO} from "../DTOs/accountDTOs/JobSeekerAccountDTO";
import {ServerError} from "../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../utils/logErrorInfo";
import {JobSeekerAccountService} from "../services/jobSeekerAccountService";
import {useAuth} from "../hooks/useAuth";
import {SavedJobDTO} from "../DTOs/userJobInteractionsDTOs/SavedJobDTO";
import {JobApplyDTO} from "../DTOs/userJobInteractionsDTOs/JobApplyDTO";

const JobSeekerContext = createContext<JobSeekerContextProps>({
    jobSeeker : null,
    setJobSeeker : () => {}, 
    jobSeekerSavedJobs : [],
    setJobSeekerSavedJobs: () => {},
    jobSeekerJobApplies : [],
    setJobSeekerJobApplies : () => {},
    fetchJobSeeker : () => {}
});

export function JobSeekerProvider({children} : {children : ReactNode}){
    const [jobSeeker, setJobSeeker] = useState<JobSeekerAccountDTO | null>(null);
    const [jobSeekerSavedJobs, setJobSeekerSavedJobs] = useState<SavedJobDTO[]>([]);
    const [jobSeekerJobApplies, setJobSeekerJobApplies] = useState<JobApplyDTO[]>([]);
    const {authUser} = useAuth();
    
    const jobSeekerService = new JobSeekerAccountService();
    const fetchJobSeeker = async  () => {
        try {  
            if (jobSeeker === null && authUser){
                const retrievedJobSeeker = await jobSeekerService.getCurrentJobSeekerAllInfo();
                setJobSeeker(retrievedJobSeeker);
            }
        }
        catch (error){
            if (error instanceof ServerError){
                logErrorInfo(error);
            }
        }
    }
    
    return (
        <JobSeekerContext.Provider value={{
            jobSeeker,
            setJobSeeker,
            jobSeekerSavedJobs,
            setJobSeekerSavedJobs,
            jobSeekerJobApplies,
            setJobSeekerJobApplies,
            fetchJobSeeker}
        }>
            {children}
        </JobSeekerContext.Provider>
    )
}

export default JobSeekerContext;