import {createContext, MutableRefObject, ReactNode, useEffect, useState} from "react";
import {HomePageContextProps} from "../contextTypes/HomePageContextProps";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";
import {RecommendationService} from "../services/recommendationService";
import {RecentUserSearchDTO} from "../DTOs/userRelatedDTOs/RecentUserSearchDTO";
import {UserService} from "../services/userService";
import PageWrapWithHeader from "../Components/Header/PageWrapWithHeader/PageWrapWithHeader";
import LoadingPage from "../Components/LoadingPage/LoadingPage";
import {logErrorInfo} from "../utils/logErrorInfo";
import {useAuth} from "../hooks/contextHooks/useAuth";

const HomePageContext = createContext<HomePageContextProps>(
    {
        mainContentReferenceForHome: null,
        setMainContentReferenceForHome: () => {
        },
        isFullHeaderGridTemplate: null,
        setIsFullHeaderGridTemplate: () => {
        },
        isShortHeaderGridTemplate: null,
        setIsShortHeaderGridTemplate: () => {
        },
        selectedJob: null,
        setSelectedJob: () => {
        },
        recommendedJobs: [],
        setRecommendedJobs: () => {
        },
        recentUserSearches: [],
        setRecentUserSearches: () => {
        }
    });

export function HomePageContextProvider({children}: { children: ReactNode }) {
    const [mainContentRef, setMainContentRef] = useState<MutableRefObject<HTMLDivElement | null> | null>(null);
    const [fullHeaderGridTemplate, setFullHeaderGridTemplate] = useState<number | null>(null);
    const [shortHeaderGridTemplate, setShortHeaderGridTemplate] = useState<number | null>(null);
    const [selectedJob, setSelectedJob] = useState<JobDTO | null>(null);
    const [recommendedJobs, setRecommendedJobs] = useState<JobDTO[]>([]);
    const [recentUserSearches, setRecentUserSearches] = useState<RecentUserSearchDTO[]>([]);
    const [requestInProgress, setRequestInProgress] = useState(false);

    const {authUser} = useAuth();

    const recommendationService = new RecommendationService();
    const [loading, setLoading] = useState(true);
    const [recommendedJobsLoading, setRecommendedJobsLoading] = useState(false);

    const userService = new UserService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (requestInProgress) {
                    return;
                }
                setLoading(true);
                setRequestInProgress(true);
                await loadRecommendationJobs();
                if (authUser) {
                    await loadRecentUserSearches();
                }
                setRequestInProgress(false);
            } catch (error) {
                logErrorInfo(error)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    async function loadRecommendationJobs() {
        try {
            if (recommendedJobsLoading) {
                return;
            }
            setRecommendedJobsLoading(true);
            const retrievedJobs = await recommendationService.getRecommendedJobs();
            setSelectedJob(retrievedJobs[0]);
            setRecommendedJobs(retrievedJobs);
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setRecommendedJobsLoading(false);
        }

    }

    async function loadRecentUserSearches() {
        if (recentUserSearches.length == 0) {
            const response = await userService.getUserRecentSearches();
            setRecentUserSearches(response);
        }
    }

    return (
        <PageWrapWithHeader onHomeClick={() => loadRecommendationJobs()}>
            {(loading || recommendedJobsLoading) ? <LoadingPage></LoadingPage> :
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
                    }}
                >
                    {children}
                </HomePageContext.Provider>}
        </PageWrapWithHeader>

    )
}

export default HomePageContext;