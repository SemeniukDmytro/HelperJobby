import React, {FC, useState} from 'react';
import "./HomeComponent.scss";
import JobSearchPromoContainer from "../JobSearchPromoContainer/JobSearchPromoContainer";
import RecommendedJobs from "../RecommendedJobs/RecommendedJobs";
import RecentSearches from "../RecentSearches/RecentSearches";
import {SelectedTabs} from "../../../../enums/SelectedTabs";
import HomePageMainContentWrap from "../HomePageMainContentWrap/HomePageMainContentWrap";
import JobSearchBar from "../../../../Components/JobSearchBar/JobSearchBar";


interface HomeComponentProps {
}

const HomeComponent: FC<HomeComponentProps> = () => {
    const [selectedTab, setSelectedTab] = useState<SelectedTabs>(1);
    function showJobFeed() {
        setSelectedTab(1);
    }

    function showRecentSearches() {
        setSelectedTab(2);
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
