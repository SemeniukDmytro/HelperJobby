import {Dispatch, MutableRefObject, SetStateAction} from "react";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";
import {RecentUserSearchDTO} from "../DTOs/userRelatedDTOs/RecentUserSearchDTO";

export interface HomePageContextProps{
    mainContentReference : MutableRefObject<HTMLDivElement | null> | null;
    setMainContentRef : Dispatch<SetStateAction<MutableRefObject<HTMLDivElement | null> | null>>;
    fullHeaderGridTemplate: number | null;
    setFullHeaderGridTemplate : Dispatch<SetStateAction<number | null>>;
    shortHeaderGridTemplate : number | null;
    setShortHeaderGridTemplate : Dispatch<SetStateAction<number | null>>;
    userSavedJobs : JobDTO[];
    setUserSavedJobs : Dispatch<SetStateAction<JobDTO[]>>;
    selectedJob : JobDTO | null;
    setSelectedJob : Dispatch<SetStateAction<JobDTO | null>>;
    recommendedJobs : JobDTO[];
    setRecommendedJobs : Dispatch<SetStateAction<JobDTO[]>>;
    recentUserSearches : RecentUserSearchDTO[];
    setRecentUserSearches : Dispatch<SetStateAction<RecentUserSearchDTO[]>>
}