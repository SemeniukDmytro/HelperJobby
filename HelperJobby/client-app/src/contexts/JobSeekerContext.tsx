import {createContext, ReactNode, useState} from "react";
import {JobSeekerContextProps} from "../contextTypes/JobSeekerContextProps";
import {JobSeekerAccountDTO} from "../DTOs/accountDTOs/JobSeekerAccountDTO";
import {ServerError} from "../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../utils/logErrorInfo";
import {JobSeekerAccountService} from "../services/jobSeekerAccountService";
import {useAuth} from "../hooks/useAuth";
import {SavedJobDTO} from "../DTOs/userJobInteractionsDTOs/SavedJobDTO";
import {JobApplyDTO} from "../DTOs/userJobInteractionsDTOs/JobApplyDTO";
import {JobApplyService} from "../services/jobApplyService";

const JobSeekerContext = createContext<JobSeekerContextProps>({
    jobSeeker : null,
    setJobSeeker : () => {}, 
    jobSeekerSavedJobs : null,
    setJobSeekerSavedJobs: () => {},
    jobSeekerJobApplies : null,
    setJobSeekerJobApplies : () => {},
    fetchJobSeeker : () => {},
    fetchJobSeekerSavedJobs : () => {},
    fetchJobSeekerJobApplies : () => {}
});

export function JobSeekerProvider({children} : {children : ReactNode}){
    const [jobSeeker, setJobSeeker] = useState<JobSeekerAccountDTO | null>(null);
    const [jobSeekerSavedJobs, setJobSeekerSavedJobs] = useState<SavedJobDTO[] | null>(null);
    const [jobSeekerJobApplies, setJobSeekerJobApplies] = useState<JobApplyDTO[] | null>(null);
    const {authUser} = useAuth();
    
    const jobSeekerService = new JobSeekerAccountService();
    const jobApplyService = new JobApplyService();
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
    
    const fetchJobSeekerSavedJobs = async () => {
        try {
            if (jobSeekerSavedJobs !== null || !authUser){
                return;
            }
            const retrievedSavedJobs = await jobSeekerService.getSavedJobsOfCurrentJobSeeker();
            setJobSeekerSavedJobs(retrievedSavedJobs);
        }
        catch (err){
            logErrorInfo(err)
        }
    }

    const fetchJobSeekerJobApplies = async () => {
        try {
            if (jobSeekerJobApplies !== null || !authUser){
                return;
            }
            const retrievedJobApplies = await jobApplyService.getUserJobApplies();
            setJobSeekerJobApplies(retrievedJobApplies);
        }
        catch (err){
            logErrorInfo(err)
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
            fetchJobSeeker,
            fetchJobSeekerSavedJobs,
            fetchJobSeekerJobApplies}
        }>
            {children}
        </JobSeekerContext.Provider>
    )
}

export default JobSeekerContext;