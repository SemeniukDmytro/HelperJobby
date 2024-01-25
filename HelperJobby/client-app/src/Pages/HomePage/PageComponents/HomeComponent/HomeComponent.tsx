import React, {FC, useEffect, useState} from 'react';
import "./HomeComponent.scss";
import JobSearchPromoContainer from "../JobSearchPromoContainer/JobSearchPromoContainer";
import RecommendedJobs from "../RecommendedJobs/RecommendedJobs";
import RecentSearches from "../RecentSearches/RecentSearches";
import {SelectedTabs} from "../../../../enums/SelectedTabs";
import HomePageMainContentWrap from "../HomePageMainContentWrap/HomePageMainContentWrap";
import JobSearchBar from "../../../../Components/JobSearchBar/JobSearchBar";
import {useJobSeeker} from "../../../../hooks/useJobSeeker";
import {ServerError} from "../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {JobSeekerAccountService} from "../../../../services/jobSeekerAccountService";
import {useAuth} from "../../../../hooks/useAuth";


interface HomeComponentProps {
}

const HomeComponent: FC<HomeComponentProps> = () => {
    const [selectedTab, setSelectedTab] = useState<SelectedTabs>(1);
    const {jobSeekerSavedJobs, setJobSeekerSavedJobs} = useJobSeeker();
    const {authUser} = useAuth();
    
    const jobSeekerService = new JobSeekerAccountService();
    
    useEffect(() => {
        loadJobSeekerSavedJobs();
    }, []);
    function showJobFeed() {
        setSelectedTab(1);
    }

    function showRecentSearches() {
        setSelectedTab(2);
    }
    
    async function loadJobSeekerSavedJobs(){
        if (jobSeekerSavedJobs.length > 0 || !authUser){
            return;
        }
        try {
            const response = await jobSeekerService.getSavedJobsOfCurrentJobSeeker();
            console.log(response);
            setJobSeekerSavedJobs(response);
        }
        catch (err){
            if (err instanceof ServerError){
                logErrorInfo(err);
            }
        }
    }

    return (
        <HomePageMainContentWrap>
            <JobSearchBar jobInitial={""} locationInitial={""}/>
            <JobSearchPromoContainer/>
            <div className={"search-results-container"}>
                <nav className={"search-results-navbar"}>
                    <button className={"tab-container"} onClick={showJobFeed}>
                        <span
                            className={`tab-name ${selectedTab === 1 ? "selected-tab-font-weight" : ""}`}>Job feed</span>
                        {selectedTab === 1 && <div className={"search-underline"}></div>}
                    </button>
                    <button className={"tab-container"} onClick={showRecentSearches}>
                        <span className={`tab-name ${selectedTab === 2 ? "selected-tab-font-weight" : ""}`}>New results for recent searches</span>
                        {selectedTab === 2 && <div className={"search-underline"}></div>}
                    </button>
                </nav>
                {selectedTab === 1 && <RecommendedJobs/>}
                {selectedTab === 2 && <RecentSearches/>}
            </div>
        </HomePageMainContentWrap>
    )
};

export default HomeComponent;
