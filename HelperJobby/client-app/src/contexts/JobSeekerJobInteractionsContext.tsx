import {createContext, ReactNode, useContext, useState} from "react";
import {JobSeekerJobInteractionsContextProps} from "../contextTypes/JobSeekerJobInteractionsContextProps";
import {SavedJobDTO} from "../DTOs/userJobInteractionsDTOs/SavedJobDTO";
import {JobApplyDTO} from "../DTOs/userJobInteractionsDTOs/JobApplyDTO";
import {InterviewDTO} from "../DTOs/userJobInteractionsDTOs/InterviewDTO";
import {JobSeekerAccountService} from "../services/jobSeekerAccountService";
import {JobApplyService} from "../services/jobApplyService";
import {InterviewService} from "../services/interviewService";
import {logErrorInfo} from "../utils/logErrorInfo";
import {useJobSeeker} from "../hooks/useJobSeeker";

const JobSeekerJobInteractionsContext = createContext<JobSeekerJobInteractionsContextProps>({
    savedJobs : null,
    setSavedJobs: () => {},
    jobApplies : null,
    setJobApplies : () => {},
    interviews : null,
    setInterviews : () => {},
    fetchJobSeekerJobInteractions : () => {},
    requestInProgress : true
});

export function JobSeekerJobInteractionsProvider({children} : {children : ReactNode}){
    const [savedJobs, setSavedJobs] = useState<SavedJobDTO[] | null>(null);
    const [jobApplies, setJobApplies] = useState<JobApplyDTO[] | null>(null);
    const [interviews, setInterviews] = useState<InterviewDTO[] | null>(null);
    const {setJobSeekerJobApplies, setJobSeekerSavedJobs} = useJobSeeker();
    const jobSeekerService = new JobSeekerAccountService();
    const jobAppliesService = new JobApplyService();
    const interviewsService = new InterviewService();
    const [requestInProgress, setRequestInProgress] = useState(true);
    const {jobSeekerSavedJobs,
        jobSeekerJobApplies} = useJobSeeker();
    
    const fetchJobSeekerJobInteractions = async () => {
        try {
            if (jobSeekerSavedJobs){
                setSavedJobs(jobSeekerSavedJobs);
            }
            else {
                console.log("2")
                const retrievedSavedJobs = await jobSeekerService.getSavedJobsOfCurrentJobSeeker();
                setSavedJobs(retrievedSavedJobs);
                setJobSeekerSavedJobs(retrievedSavedJobs);
            }
            
            if (jobSeekerJobApplies){
                setJobApplies(jobSeekerJobApplies)
            }
            else {
                const retrievedJobApplies = await jobAppliesService.getUserJobApplies();
                setJobApplies(retrievedJobApplies);
                setJobSeekerJobApplies(retrievedJobApplies);
            }
            
            const retrievedInterviews = await interviewsService.getCurrentJobSeekerInterviews();
            setInterviews(retrievedInterviews);
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
            setRequestInProgress(false);
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
             requestInProgress}
        }>
            {children}
        </JobSeekerJobInteractionsContext.Provider>
    )
}

export default JobSeekerJobInteractionsContext;