import React, {FC, useEffect, useRef, useState} from 'react';
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

    const [stickyHeight, setStickyHeight] = useState(361.2);
    const mainContentRef = useRef<HTMLDivElement | null>(null);
    const jobDetailsScrollWindowRef = useRef<HTMLDivElement | null>(null);
    const [fullHeaderInfoHeight, setFullHeaderInfoHeight] = useState("100%");
    const [shortHeaderInfoHeight, setShortHeaderInfoHeight] = useState("0");
    const [fullHeaderInfoOpacity, setFullHeaderInfoOpacity] = useState(1);
    const [shortHeaderInfoOpacity, setShortHeaderInfoOpacity] = useState(0);
    const updateStickyHeight = () => {
        const newHeight = 361.2 + window.scrollY;
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

    function focusOnInnerContent() {
        if (mainContentRef.current) {
            const mainContentY = mainContentRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo(0, mainContentY);
        }
        if (jobDetailsScrollWindowRef.current){
            const scrollTop = jobDetailsScrollWindowRef.current?.scrollTop;
            if (scrollTop !== 0){
                setFullHeaderInfoHeight("0");
                setFullHeaderInfoOpacity(0);
                setShortHeaderInfoHeight("100%");
                setShortHeaderInfoOpacity(1);
            }
            else {
                setFullHeaderInfoHeight("100%");
                setFullHeaderInfoOpacity(1);
                setShortHeaderInfoHeight("0");
                setShortHeaderInfoOpacity(0);
            }
            
        }
        
        
    }

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
                                    <div className={"job-header-container"}>
                                        <div className={"job-header-title"}>
                                            <span className={"title-text"}>Job title</span>
                                        </div>
                                            <div className={"full-header-info"} style={{height : fullHeaderInfoHeight,
                                            opacity : fullHeaderInfoOpacity}}>
                                                <a className={"header-company-name"}>
                                                    <span>DataAnnotations</span>
                                                </a>
                                                <div className={"header-job-location"}>
                                                    <span>Remote</span>
                                                </div>
                                                <div className={"header-job-salary"}>
                                                    <span>$27–$34 an hour</span>
                                                </div>
                                            </div>
                                            <div className={"short-header-info" } style={{height : shortHeaderInfoHeight,
                                            opacity : shortHeaderInfoOpacity}}>
                                                <a className={"short-company-name"}>Company name |</a>
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
                                    <div className={"job-details-scroll-window"} onScroll={focusOnInnerContent} ref={jobDetailsScrollWindowRef}>
                                        <div className={"job-details-container"}>
                                            <div className={"job-details-header"}>
                                            </div>
                                        </div>
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
