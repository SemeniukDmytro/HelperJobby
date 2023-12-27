import React, {FC, useState} from 'react';
import PublicHomePageHeader from "../PublicHomePageHeader/PublicHomePageHeader";
import "./HomePage.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisVertical, faLocationDot, faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import JobSearchBar from "../JobSearchBar/JobSearchBar";
import JobSearchPromoContainer from "../JobSearchPromoContainer/JobSearchPromoContainer";
import ShortJobDescriptionBlock from "../ShortJobDescriptionBlock/ShortJobDescriptionBlock";


interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {

    return (
        <div className={"job-search-layout"}>
            <PublicHomePageHeader></PublicHomePageHeader>
            <div className={"header-and-main-content-separator"}></div>
            <div className={"main-content"}>
                <JobSearchBar/>
                <JobSearchPromoContainer/>
                <div className={"search-results-container"}>
                    <nav className={"search-results-navbar"}>
                        <button className={"tab-container"}>
                            <span className={"tab-name"}>Job feed</span>
                            <div className={"search-underline"}></div>
                        </button>
                        <button className={"tab-container"}>
                            <span className={"tab-name"}>New results for recent searches</span>
                        </button>
                    </nav>
                    <div className={"jobs-container"}>
                        <div className={"short-job-descriptions-column"}>
                            <div className={"title-container"}>
                                <span>Jobs based on your activity on indeed</span>
                            </div>
                            <ShortJobDescriptionBlock></ShortJobDescriptionBlock>
                        </div>
                        <div className={"detailed-job-description-column"}>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
};

export default HomePage;
