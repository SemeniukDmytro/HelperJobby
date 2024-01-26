import {createContext, ReactNode, useContext, useState} from "react";
import {JobSeekerJobInteractionsContextProps} from "../contextTypes/JobSeekerJobInteractionsContextProps";
import {SavedJobDTO} from "../DTOs/userJobInteractionsDTOs/SavedJobDTO";
import {JobApplyDTO} from "../DTOs/userJobInteractionsDTOs/JobApplyDTO";
import {InterviewDTO} from "../DTOs/userJobInteractionsDTOs/InterviewDTO";
import {JobSeekerAccountService} from "../services/jobSeekerAccountService";
import {JobApplyService} from "../services/jobApplyService";
import {InterviewService} from "../services/interviewService";
import {logErrorInfo} from "../utils/logErrorInfo";

const JobSeekerJobInteractionsContext = createContext<JobSeekerJobInteractionsContextProps>({
    savedJobs : [],
    setSavedJobs: () => {},
    jobApplies : [],
    setJobApplies : () => {},
    interviews : [],
    setInterviews : () => {},
    fetchJobSeekerJobInteractions : () => {},
    jobInteractionsLoaded : false,
    setJobInteractionsLoaded : () => {}
});

export function JobSeekerJobInteractionsProvider({children} : {children : ReactNode}){
    const [savedJobs, setSavedJobs] = useState<SavedJobDTO[]>([]);
    const [jobApplies, setJobApplies] = useState<JobApplyDTO[]>([]);
    const [interviews, setInterviews] = useState<InterviewDTO[]>([]);
    const jobSeekerService = new JobSeekerAccountService();
    const jobAppliesService = new JobApplyService();
    const interviewsService = new InterviewService();
    const [jobInteractionsLoaded, setJobInteractionsLoaded] = useState(false);
    const fetchJobSeekerJobInteractions = async () => {
        try {
            if (jobInteractionsLoaded){
                return;
            }
            const retrievedSavedJobs = await jobSeekerService.getSavedJobsOfCurrentJobSeeker();
            setSavedJobs(retrievedSavedJobs);
            const retrievedJobApplies = await jobAppliesService.getUserJobApplies();
            setJobApplies(retrievedJobApplies);
            const retrievedInterviews = await interviewsService.getCurrentJobSeekerInterviews();
            setInterviews(retrievedInterviews);
            setJobInteractionsLoaded(true)
        }
        catch (err){
            logErrorInfo(err)
        }
    }
    
    return (
        <JobSeekerJobInteractionsContext.Provider value={
            {savedJobs,
             setSavedJobs,
             jobApplies,
             setJobApplies,
             interviews,
             setInterviews,
             fetchJobSeekerJobInteractions,
             jobInteractionsLoaded, 
             setJobInteractionsLoaded}
        }>
            {children}
        </JobSeekerJobInteractionsContext.Provider>
    )
}

export default JobSeekerJobInteractionsContext;