import {createContext, MutableRefObject, ReactNode, useEffect, useState} from "react";
import {HomePageContextProps} from "../contextTypes/HomePageContextProps";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";
import {JobSeekerAccountService} from "../services/jobSeekerAccountService";

const HomePageContext = createContext<HomePageContextProps>(
    {
        mainContentReference : null,
        setMainContentRef : () => {},
        fullHeaderGridTemplate : null,
        setFullHeaderGridTemplate : () => {},
        shortHeaderGridTemplate : null,
        setShortHeaderGridTemplate : () => {},
        userSavedJobs : [],
        setUserSavedJobs : () => {},
        selectedJob : null,
        setSelectedJob : () => {}
    }); 

export function HomePageContextProvider({ children } : {children: ReactNode}){
    const [mainContentRef, setMainContentRef] = useState<MutableRefObject<HTMLDivElement | null> | null>(null);
    const [fullHeaderGridTemplate, setFullHeaderGridTemplate] = useState<number | null>(null);
    const [shortHeaderGridTemplate, setShortHeaderGridTemplate] = useState<number | null>(null);
    const [userSavedJobs, setUserSavedJobs] = useState<JobDTO[]>([]);
    const [selectedJob, setSelectedJob] = useState<JobDTO | null>(null);
    
    const jobSeekerService : JobSeekerAccountService = new JobSeekerAccountService();

    useEffect(() => {
        const checkIsJobSaved = async () => {
            const response = await jobSeekerService.getSavedJobsOfCurrentJobSeeker();
            setUserSavedJobs(response);
        }
        
        checkIsJobSaved();
    }, []);
    
    return(
        <HomePageContext.Provider
            value={{
                mainContentReference: mainContentRef,
                setMainContentRef,
                fullHeaderGridTemplate,
                setFullHeaderGridTemplate,
                shortHeaderGridTemplate,
                setShortHeaderGridTemplate,
                userSavedJobs,
                setUserSavedJobs,
                selectedJob,
                setSelectedJob
            }}>
            {children}
        </HomePageContext.Provider>
    )
}

export default HomePageContext;