import React, {FC, useEffect, useRef, useState} from 'react';
import "./HomeComponent.scss";
import JobSearchBar from "../JobSearchBar/JobSearchBar";
import JobSearchPromoContainer from "../JobSearchPromoContainer/JobSearchPromoContainer";
import {useHomePage} from "../../hooks/useHomePage";
import RecommendedJobs from "../RecommendedJobs/RecommendedJobs";
import {SelectedTabs} from "../../enums/SelectedTabs";
import RecentSearches from "../RecentSearches/RecentSearches";
import HomePageHeader from "../HomePageHeader/HomePageHeader";


interface HomeComponentProps {}

const HomeComponent: FC<HomeComponentProps> = () => {
    const mainContentRef = useRef<HTMLDivElement | null>(null);
    const {setMainContentRef} = useHomePage();
    const [selectedTab, setSelectedTab] = useState<SelectedTabs>(1);

    useEffect(() => {
        setMainContentRef(mainContentRef);
    }, []);

    function showJobFeed() {
        setSelectedTab(1);
    }

    function showRecentSearches() {
        setSelectedTab(2);
    }

    return (
        <div className={"job-search-layout"}>
            <HomePageHeader></HomePageHeader>
            <div className={"header-and-main-content-separator"}></div>
            <div className={"main-content"}  ref={mainContentRef}>
                <JobSearchBar/>
                <JobSearchPromoContainer/>
                <div className={"search-results-container"}>
                    <nav className={"search-results-navbar"}>
                        <button className={"tab-container"} onClick={showJobFeed}>
                            <span className={`tab-name ${selectedTab=== 1 ? "selected-tab-font-weight" : ""}`}>Job feed</span>
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
            </div>
        </div>
    )
};

export default HomeComponent;
