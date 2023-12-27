import React, {FC, useState} from 'react';
import PublicHomePageHeader from "../PublicHomePageHeader/PublicHomePageHeader";
import "./HomePage.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faHeart
} from "@fortawesome/free-regular-svg-icons";
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
                            <ShortJobDescriptionBlock></ShortJobDescriptionBlock>
                            <ShortJobDescriptionBlock></ShortJobDescriptionBlock>
                        </div>
                        <div className={"detailed-description-column"}>
                            <div className={"detailed-description-sticky"}>
                                <div className={"detailed-description-content-box"}>
                                    <div className={"job-header-container"}>
                                        <div className={"job-header-title"}>
                                            <span className={"title-text"}>Job title</span>
                                        </div>
                                        <a className={"header-company-name"}>
                                            <span>DataAnnotations</span>
                                        </a>
                                        <div className={"header-job-location"}>
                                            <span>Remote</span>
                                        </div>
                                        <div className={"header-job-salary"}>
                                            <span>$27–$34 an hour</span>
                                        </div>
                                        <div className={"header-job-interactions-box"}>
                                            <button className={"apply-button"}>
                                                Apply now
                                            </button>
                                            <button className={"save-job-button"}>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </button>
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
};

export default HomePage;
