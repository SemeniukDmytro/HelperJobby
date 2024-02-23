import {Dispatch, MutableRefObject, SetStateAction} from "react";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";
import {RecentUserSearchDTO} from "../DTOs/userRelatedDTOs/RecentUserSearchDTO";

export interface HomePageContextProps {
    mainContentReferenceForHome: MutableRefObject<HTMLDivElement | null> | null;
    setMainContentReferenceForHome: Dispatch<SetStateAction<MutableRefObject<HTMLDivElement | null> | null>>;
    isFullHeaderGridTemplate: number | null;
    setIsFullHeaderGridTemplate: Dispatch<SetStateAction<number | null>>;
    isShortHeaderGridTemplate: number | null;
    setIsShortHeaderGridTemplate: Dispatch<SetStateAction<number | null>>;
    selectedJob: JobDTO | null;
    setSelectedJob: Dispatch<SetStateAction<JobDTO | null>>;
    recommendedJobs: JobDTO[];
    setRecommendedJobs: Dispatch<SetStateAction<JobDTO[]>>;
    recentUserSearches: RecentUserSearchDTO[];
    setRecentUserSearches: Dispatch<SetStateAction<RecentUserSearchDTO[]>>
}