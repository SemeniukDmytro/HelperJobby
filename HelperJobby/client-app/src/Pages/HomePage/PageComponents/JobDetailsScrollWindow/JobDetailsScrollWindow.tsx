import React, {FC, useEffect, useRef, useState} from 'react';
import "./JobDetailScrollWindow.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoneyBillAlt} from "@fortawesome/free-regular-svg-icons";
import {faBriefcase, faChevronDown, faChevronUp, faClock} from "@fortawesome/free-solid-svg-icons";
import JobDetailsFeatureBox from "../JobDetailsFeatureBox/JobDetailsFeatureBox";
import {useHomePage} from "../../../../hooks/useHomePage";
import {thousandsDisplayHelper} from "../../../../utils/thousandsDisplayHelper";
import {
    benefitsEnumToStringMap, jobTypesEnumToStringMap,
    schedulesEnumToStringMap
} from "../../../../utils/enumToStringConverter";

interface JobDetailsScrollWindowProps {
}

const JobDetailsScrollWindow: FC<JobDetailsScrollWindowProps> = () => {

    const {selectedJob} = useHomePage();
    
    const {mainContentReference,
        setFullHeaderGridTemplate,
        setShortHeaderGridTemplate} = useHomePage();
    
    const [showAllBenefits, setShowAllBenefits] = useState(false);
    const [benefitsButtonText, setBenefitsButtonText] = useState("Show more");
    const [displayedBenefits, setDisplayedBenefits] = useState<string[]>([]);
    
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

    useEffect(() => {
        if (selectedJob!.benefits.length < 6){
            setDisplayedBenefits(selectedJob!.benefits);
        }
        else {
            setDisplayedBenefits(selectedJob!.benefits.slice(0, 6));    
            setShowAllBenefits(false);
            setBenefitsButtonText("Show more")
        }
    }, [selectedJob]);
    
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
            setDisplayedBenefits(selectedJob!.benefits);    
            setShowAllBenefits(true);
        }
        else {
            setBenefitsButtonText("Show more")
            setDisplayedBenefits(selectedJob!.benefits.slice(0, 6));
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
                            <div className={"detailed-job-features"}>
                                <JobDetailsFeatureBox featureText={`$${thousandsDisplayHelper(selectedJob!.salary)} ${selectedJob?.salaryRate}`}/>
                            </div>
                        </div>
                    </div>
                    {selectedJob!.jobType.length > 0 && <div className={"short-main-info"}>
                        <div className={"job-details-icon-box"}>
                            <FontAwesomeIcon icon={faBriefcase} />
                        </div>
                        <div className={"job-details-header-info-box"}>
                            <div className={"job-details-info"}>
                                <span>Job types</span>
                            </div>
                            <div className={"detailed-job-features"}>
                                {selectedJob?.jobType.map((jobType, index) => (
                                    <JobDetailsFeatureBox  key={index} featureText={jobTypesEnumToStringMap(jobType)}></JobDetailsFeatureBox>
                                ))}
                            </div>
                        </div>
                    </div>}
                    {selectedJob!.schedule.length > 0 && <div className={"short-main-info"}>
                        <div className={"job-details-icon-box"}>
                            <FontAwesomeIcon icon={faClock} />
                        </div>
                        <div className={"job-details-header-info-box"}>
                            <div className={"job-details-info"}>
                                <span>Schedule</span>
                            </div>
                            <div className={"detailed-job-features"}>
                                {selectedJob?.schedule.map((schedule, index) => (
                                    <JobDetailsFeatureBox  key={index} featureText={schedulesEnumToStringMap(schedule)}></JobDetailsFeatureBox>
                                ))}
                            </div>
                        </div>
                    </div>}
                </div>
                {selectedJob!.benefits.length > 0 && <div className={"job-details-header"}>
                    <div className={"job-title-info title-additional-spacing"}>
                        <span>Benefits</span>
                        <div className={"job-details-subtitle"}>
                            Pulled from the full job description
                        </div>
                    </div>
                    <div className={"benefits-box"}>
                        <ul className={"benefits"}>
                            {displayedBenefits.map((benefit, index) => (
                                <li key={index}>{benefitsEnumToStringMap(benefit)}</li>
                            ))}
                        </ul>
                        { (!showAllBenefits && selectedJob!.benefits.length > 6)&& <div className={"background-fade"}></div> }
                    </div>
                    {selectedJob!.benefits.length > 6 && <button className={"show-more-benefits-button"} onClick={displayAllBenefits}>
                        <span>{benefitsButtonText}</span>
                        {!showAllBenefits &&<FontAwesomeIcon className={"show-more-arrow"} icon={faChevronDown} />}
                        {showAllBenefits &&<FontAwesomeIcon className={"show-more-arrow"} icon={faChevronUp} />}
                    </button>}
                </div>}
                <div className={"full-description-box"}>
                    <div style={{whiteSpace: "pre-wrap"}}>
                        {selectedJob?.description}
                    </div>
                </div>
                
            </div>
        </div>
    )
};

export default JobDetailsScrollWindow;
