import React, {FC, useEffect, useRef, useState} from 'react';
import PublicHomePageHeader from "../PublicHomePageHeader/PublicHomePageHeader";
import "./HomeComponent.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faHeart
} from "@fortawesome/free-regular-svg-icons";
import JobSearchBar from "../JobSearchBar/JobSearchBar";
import JobSearchPromoContainer from "../JobSearchPromoContainer/JobSearchPromoContainer";
import ShortJobDescriptionBlock from "../ShortJobDescriptionBlock/ShortJobDescriptionBlock";
import {useHomePage} from "../../hooks/useHomePage";
import JobDescriptionHeader from "../JobDescriptionHeader/JobDescriptionHeader";
import JobDetailsScrollWindow from "../JobDetailsScrollWindow/JobDetailsScrollWindow";


interface HomeComponentProps {}

const HomeComponent: FC<HomeComponentProps> = () => {

    const [stickyHeight, setStickyHeight] = useState(361.2);
    const mainContentRef = useRef<HTMLDivElement | null>(null);
    const {setMainContentRef} = useHomePage();
    const updateStickyHeight = () => {
        let newHeight = 361.2 + window.scrollY;
        if (newHeight > 698){
            setStickyHeight(698)
        }
        else{
            setStickyHeight(newHeight);
        }
    };
    
    useEffect(() => {
        updateStickyHeight();
        const handleScroll = () => {
            updateStickyHeight();
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [stickyHeight]);

    useEffect(() => {
        handleMainContentRef();
    }, []);
    const handleMainContentRef = () => {
        setMainContentRef(mainContentRef);
    };


    return (
        <div className={"job-search-layout"}>
            <PublicHomePageHeader></PublicHomePageHeader>
            <div className={"header-and-main-content-separator"}></div>
            <div className={"main-content"}  ref={mainContentRef}>
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
                            <div style={{height : `${stickyHeight}px`}} className={"detailed-description-sticky"}>
                                <div className={"detailed-description-content-box"}>    
                                    <JobDescriptionHeader></JobDescriptionHeader>
                                    <JobDetailsScrollWindow></JobDetailsScrollWindow>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
};

export default HomeComponent;
