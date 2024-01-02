import React, {FC, useEffect, useRef, useState} from 'react';
import {useHomePage} from "../../hooks/useHomePage";
import "./JobDetailScrollWindow.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoneyBillAlt} from "@fortawesome/free-regular-svg-icons";
import {faBriefcase, faChevronDown, faChevronUp, faClock} from "@fortawesome/free-solid-svg-icons";

interface JobDetailsScrollWindowProps {}

const JobDetailsScrollWindow: FC<JobDetailsScrollWindowProps> = () => {
    
    const [showAllBenefits, setShowAllBenefits] = useState(false);
    const [benefitsButtonText, setBenefitsButtonText] = useState("Show more");
    
    const {
        mainContentReference,
        setFullHeaderGridTemplate,
        setShortHeaderGridTemplate} = useHomePage();
    
    const jobDetailsScrollWindowRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if(mainContentReference){
                const mainContentY = mainContentReference.current!.getBoundingClientRect().top + window.scrollY;
                if (mainContentY > window.scrollY && jobDetailsScrollWindowRef.current!.scrollTop <= 10) {
                    window.scrollTo(0, mainContentY);
                }
                focusOnInnerContent()
            }
        };
        
        if (jobDetailsScrollWindowRef.current) {
            jobDetailsScrollWindowRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (jobDetailsScrollWindowRef.current) {
                jobDetailsScrollWindowRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [mainContentReference]);
    
    function focusOnInnerContent() {

        const scrollTop = jobDetailsScrollWindowRef.current?.scrollTop;
        if (scrollTop! !== 0){
            setFullHeaderGridTemplate(0);
            setShortHeaderGridTemplate(1);
        }
        else {
            setFullHeaderGridTemplate(1);
            setShortHeaderGridTemplate(0);
        }
    }

   async function displayAllBenefits() {
        if (!showAllBenefits){
            setBenefitsButtonText("Show less")
            setShowAllBenefits(true);
        }
        else {
            setBenefitsButtonText("Show more")
            setShowAllBenefits(false);
        }
    }

    return (
        <div className={"job-details-scroll-window"} ref={jobDetailsScrollWindowRef}>
            <div className={"job-details-container"}>
                <div className={"job-details-header"}>  
                    <div className={"job-title-info"}>
                        <span>Job details</span>
                    </div>
                    <div className={"short-main-info"}>
                        <div className={"job-details-icon-box"}>
                            <FontAwesomeIcon icon={faMoneyBillAlt} />
                        </div>
                        <div className={"job-details-header-info-box"}>
                            <div className={"job-details-info"}>
                                <span>Pay</span>
                            </div>
                            <div className={"job-details-info-value"}>
                                <span>$60,000–$100,000 a year</span>
                            </div>
                        </div>
                    </div>
                    <div className={"short-main-info"}>
                        <div className={"job-details-icon-box"}>
                            <FontAwesomeIcon icon={faBriefcase} />
                        </div>
                        <div className={"job-details-header-info-box"}>
                            <div className={"job-details-info"}>
                                <span>Job type</span>
                            </div>
                            <div className={"job-details-info-value"}>
                                <span>Permanent</span>
                            </div>
                        </div>
                    </div>
                    <div className={"short-main-info"}>
                        <div className={"job-details-icon-box"}>
                            <FontAwesomeIcon icon={faClock} />
                        </div>
                        <div className={"job-details-header-info-box"}>
                            <div className={"job-details-info"}>
                                <span>Schedule</span>
                            </div>
                            <div className={"job-details-info-value"}>
                                <span>Monday to Friday</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"job-details-header"}>
                    <div className={"job-title-info title-additional-spacing"}>
                        <span>Benefits</span>
                        <div className={"job-details-subtitle"}>
                            Pulled from the full job description
                        </div>
                    </div>
                    <div className={"benefits-box"}>
                        <ul className={"benefits"}>
                            <li>Dental Care</li>
                            <li>Dental Care</li>
                            <li>Dental Care</li>
                            <li>Dental Care</li>
                            <li>Dental Care</li>
                            <li>Dental Care</li>
                            <li>Dental Care</li>
                            <li>Dental Care</li>
                            <li>Dental Care</li>
                            <li>Dental Care</li>
                            <li>Dental Care</li>
                        </ul>
                        { !showAllBenefits && <div className={"background-fade"}></div> }
                    </div>
                    <button className={"show-more-benefits-button"} onClick={displayAllBenefits}>
                        <span>{benefitsButtonText}</span>
                        {!showAllBenefits &&<FontAwesomeIcon className={"show-more-arrow"} icon={faChevronDown} />}
                        {showAllBenefits &&<FontAwesomeIcon className={"show-more-arrow"} icon={faChevronUp} />}
                    </button>
                </div>
                <div className={"full-description-box"}>
                    What is Lorem Ipsum?
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                
            </div>
        </div>
    )
};

export default JobDetailsScrollWindow;
