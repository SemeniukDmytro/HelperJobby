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
import {ResumeDTO} from "../DTOs/resumeRelatedDTOs/ResumeDTO";

const JobSeekerContext = createContext<JobSeekerContextProps>({
    jobSeeker : null,
    setJobSeeker : () => {},
    savedJobsWereLoaded : false,
    setSavedJobsWereLoaded : () => {},
    jobAppliesWereLoaded : false,
    setJobAppliesWereLoaded : () => {},
    fetchJobSeeker : () => {},
    fetchJobSeekerSavedJobs : () => {},
    fetchJobSeekerJobApplies : () => {},
    fetchJobSeekerJobInteractions : () => {}
});

export function JobSeekerProvider({children} : {children : ReactNode}){
    const [jobSeeker, setJobSeeker] = useState<JobSeekerAccountDTO | null>(null);
    const {authUser} = useAuth();
    const [savedJobsWereLoaded, setSavedJobsWereLoaded] = useState(false);
    const [jobAppliesWereLoaded, setJobAppliesWereLoaded] = useState(false);
    const [jobSeekerWasLoaded, setJobSeekerWasLoaded] = useState(false);
    const jobSeekerService = new JobSeekerAccountService();
    const jobApplyService = new JobApplyService();
    const fetchJobSeeker = async  () => {
        try {  
            if (jobSeekerWasLoaded || !authUser){
                return;
            }
            const retrievedJobSeeker = await jobSeekerService.getCurrentJobSeekerAllInfo();
            setJobSeeker(prev => {
                if (!prev){
                    return retrievedJobSeeker;
                }
                
                return {
                    ...prev,
                    firstName : retrievedJobSeeker.firstName,
                    lastName : retrievedJobSeeker.lastName,
                    phoneNumber : retrievedJobSeeker.phoneNumber,
                    address : retrievedJobSeeker.address,
                    addressId : retrievedJobSeeker.addressId,
                    resume : retrievedJobSeeker.resume,
                    userId : retrievedJobSeeker.userId
                }
            });
            setJobSeekerWasLoaded(true);
            
        }
        catch (error){
            if (error instanceof ServerError){
                logErrorInfo(error);
            }
        }
    }
    
    const fetchJobSeekerSavedJobs = async () => {
        try {
            if (savedJobsWereLoaded || !authUser){
                return;
            }
            const retrievedSavedJobs = await jobSeekerService.getSavedJobsOfCurrentJobSeeker();
            setJobSeeker((prev) => {
                return prev ? {
                    ...prev,
                    savedJobs : retrievedSavedJobs
                }
                : 
                null;
            });
            setSavedJobsWereLoaded(true);
        }
        catch (err){
            logErrorInfo(err)
        }
    }

    const fetchJobSeekerJobApplies = async () => {
        try {
            if (savedJobsWereLoaded || !authUser){
                return;
            }
            const retrievedJobApplies = await jobApplyService.getUserJobApplies();
            setJobSeeker((prev) => {
                return prev && {
                        ...prev,
                        jobApplies : retrievedJobApplies
                    }
            })
            setJobAppliesWereLoaded(true);
        }
        catch (err){
            logErrorInfo(err)
        }
    }
    
    const fetchJobSeekerJobInteractions = async () =>{
        try {
            if ((savedJobsWereLoaded && jobAppliesWereLoaded) || !authUser){
                return;
            }
            const retrievedJobSeeker = await jobSeekerService.getCurrentJobSeekerJobInteractions();
            setJobSeeker(prev => {
                if (!prev) {
                    return retrievedJobSeeker;
                }

                let updatedResume : ResumeDTO | null = prev.resume;
                if (!prev.resume){
                    updatedResume = retrievedJobSeeker.resume;
                }

                return {
                    ...prev,
                    id: retrievedJobSeeker.id,
                    resume: updatedResume,
                    jobApplies : retrievedJobSeeker.jobApplies,
                    savedJobs : retrievedJobSeeker.savedJobs
                };
            });
            setJobAppliesWereLoaded(true);
            setSavedJobsWereLoaded(true);
        }
        catch (err){
            logErrorInfo(err)
        }
    }
    
    return (
        <JobSeekerContext.Provider value={{
            jobSeeker,
            setJobSeeker,
            savedJobsWereLoaded,
            setSavedJobsWereLoaded,
            jobAppliesWereLoaded,
            setJobAppliesWereLoaded,
            fetchJobSeeker,
            fetchJobSeekerSavedJobs,
            fetchJobSeekerJobApplies,
            fetchJobSeekerJobInteractions}
        }>
            {children}
        </JobSeekerContext.Provider>
    )
}

export default JobSeekerContext;