import {createContext, MutableRefObject, ReactNode, useEffect, useState} from "react";
import {HomePageContextProps} from "../contextTypes/HomePageContextProps";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";
import {JobSeekerAccountService} from "../services/jobSeekerAccountService";
import {RecommendationService} from "../services/recommendationService";
import {RecentUserSearchDTO} from "../DTOs/userRelatedDTOs/RecentUserSearchDTO";
import {UserService} from "../services/userService";
import {useAuth} from "../hooks/useAuth";

const HomePageContext = createContext<HomePageContextProps>(
    {
        mainContentReferenceForHome : null,
        setMainContentReferenceForHome : () => {},
        isFullHeaderGridTemplate : null,
        setIsFullHeaderGridTemplate : () => {},
        isShortHeaderGridTemplate : null,
        setIsShortHeaderGridTemplate : () => {},
        selectedJob : null,
        setSelectedJob : () => {},
        recommendedJobs : [],
        setRecommendedJobs : () => {},
        recentUserSearches : [],
        setRecentUserSearches : () => {}
    }); 

export function HomePageContextProvider({ children } : {children: ReactNode}){
    const [mainContentRef, setMainContentRef] = useState<MutableRefObject<HTMLDivElement | null> | null>(null);
    const [fullHeaderGridTemplate, setFullHeaderGridTemplate] = useState<number | null>(null);
    const [shortHeaderGridTemplate, setShortHeaderGridTemplate] = useState<number | null>(null);
    const [selectedJob, setSelectedJob] = useState<JobDTO | null>(null);
    const [recommendedJobs, setRecommendedJobs] = useState<JobDTO[]>([]);
    const [recentUserSearches, setRecentUserSearches] = useState<RecentUserSearchDTO[]>([]);
    
    const {authUser} = useAuth();
    
    const recommendationService = new RecommendationService();
    const [loading, setLoading] = useState(true);
    
    const jobSeekerService : JobSeekerAccountService = new JobSeekerAccountService();
    const userService = new UserService();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await loadRecommendationJobs();
                if (authUser){
                    await loadRecentUserSearches();
                }
            }
            catch (error){
                console.log(error)
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    async function loadRecommendationJobs(){
        const retrievedJobs = await recommendationService.getRandomJobs();
        setSelectedJob(retrievedJobs[0]);
        setRecommendedJobs(retrievedJobs);
    }
    
    async function loadRecentUserSearches(){
        if (recentUserSearches.length == 0){
            const response = await userService.getUserRecentSearches();
            setRecentUserSearches(response);
        }
    }
    
    return(
        loading ? <>Loading...</> :
        <HomePageContext.Provider
            value={{
                mainContentReferenceForHome: mainContentRef,
                setMainContentReferenceForHome: setMainContentRef,
                isFullHeaderGridTemplate: fullHeaderGridTemplate,
                setIsFullHeaderGridTemplate: setFullHeaderGridTemplate,
                isShortHeaderGridTemplate: shortHeaderGridTemplate,
                setIsShortHeaderGridTemplate: setShortHeaderGridTemplate,
                selectedJob,
                setSelectedJob,
                recommendedJobs,
                setRecommendedJobs,
                recentUserSearches,
                setRecentUserSearches
            }}>
            {children}
        </HomePageContext.Provider>
    )
}

export default HomePageContext;