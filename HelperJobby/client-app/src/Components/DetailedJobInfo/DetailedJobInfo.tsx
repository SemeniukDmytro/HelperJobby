import React, {FC, useEffect, useState} from 'react';
import './DetailedJobInfo.scss';
import {JobDTO} from "../../DTOs/jobRelatetedDTOs/JobDTO";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoneyBillAlt} from "@fortawesome/free-regular-svg-icons";
import {thousandsDisplayHelper} from "../../utils/thousandsDisplayHelper";
import {faBriefcase, faChevronDown, faChevronUp, faClock} from "@fortawesome/free-solid-svg-icons";
import {
    benefitsEnumToStringMap,
    jobTypesEnumToStringMap,
    schedulesEnumToStringMap
} from "../../utils/convertLogic/enumToStringConverter";
import JobDetailsFeatureBox
    from "../../JobSeekerSidePages/HomePage/PageComponents/JobDetailsFeatureBox/JobDetailsFeatureBox";
import {formatJobSalaryDisplay} from "../../utils/convertLogic/formatJobSalaryDisplay";

interface DetailedJobInfoProps {
    job: JobDTO
}

const DetailedJobInfo: FC<DetailedJobInfoProps> = ({job}) => {
    const [benefitsButtonText, setBenefitsButtonText] = useState("Show more");
    const [displayedBenefits, setDisplayedBenefits] = useState<string[]>([]);
    const [showAllBenefits, setShowAllBenefits] = useState(false);

    useEffect(() => {
        if (job.benefits.length < 6) {
            setDisplayedBenefits(job.benefits);
        } else {
            setDisplayedBenefits(job.benefits.slice(0, 6));
            setShowAllBenefits(false);
            setBenefitsButtonText("Show more")
        }
    }, [job]);

    function displayAllBenefits() {
        if (!showAllBenefits) {
            setBenefitsButtonText("Show less")
            setDisplayedBenefits(job.benefits);
            setShowAllBenefits(true);
        } else {
            setBenefitsButtonText("Show more")
            setDisplayedBenefits(job.benefits.slice(0, 6));
            setShowAllBenefits(false);
        }
    }


    return (
        <div>
            <div className={"job-details-header"}>
                <div className={"small-title"}>
                    <span>Job details</span>
                </div>
                <div className={"short-main-info"}>
                    <div className={"job-details-icon-box"}>
                        <FontAwesomeIcon className={"svg125rem"} icon={faMoneyBillAlt}/>
                    </div>
                    <div className={"job-details-header-info-box"}>
                        <div className={"job-details-info"}>
                            <span>Pay</span>
                        </div>
                        <div className={"detailed-job-features"}>
                            <JobDetailsFeatureBox
                                featureText={formatJobSalaryDisplay(job)}
                            />
                        </div>
                    </div>
                </div>
                {job.jobType.length > 0 && <div className={"short-main-info"}>
                    <div className={"job-details-icon-box"}>
                        <FontAwesomeIcon className={"svg125rem"} icon={faBriefcase}/>
                    </div>
                    <div className={"job-details-header-info-box"}>
                        <div className={"job-details-info"}>
                            <span>Job types</span>
                        </div>
                        <div className={"detailed-job-features"}>
                            {job.jobType.map((jobType, index) => (
                                <JobDetailsFeatureBox
                                    key={index}
                                    featureText={jobTypesEnumToStringMap(jobType)}
                                ></JobDetailsFeatureBox>
                            ))}
                        </div>
                    </div>
                </div>}
                {job.schedule.length > 0 && <div className={"short-main-info"}>
                    <div className={"job-details-icon-box"}>
                        <FontAwesomeIcon className={"svg1rem"} icon={faClock}/>
                    </div>
                    <div className={"job-details-header-info-box"}>
                        <div className={"job-details-info"}>
                            <span>Schedule</span>
                        </div>
                        <div className={"detailed-job-features"}>
                            {job.schedule.map((schedule, index) => (
                                <JobDetailsFeatureBox
                                    key={index}
                                    featureText={schedulesEnumToStringMap(schedule)}
                                ></JobDetailsFeatureBox>
                            ))}
                        </div>
                    </div>
                </div>}
            </div>
            {job.benefits.length > 0 && <div className={"job-details-header"}>
                <div className={"small-title title-additional-spacing"}>
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
                    {(!showAllBenefits && job.benefits.length > 6) &&
                        <div className={"background-fade"}></div>}
                </div>
                {job.benefits.length > 6 &&
                    <button className={"show-more-benefits-button"} onClick={displayAllBenefits}>
                        <span>{benefitsButtonText}</span>
                        {!showAllBenefits &&
                            <FontAwesomeIcon className={"show-more-arrow svg1rem"} icon={faChevronDown}/>}
                        {showAllBenefits && <FontAwesomeIcon className={"show-more-arrow svg1rem"} icon={faChevronUp}/>}
                    </button>}
            </div>}
            <div className={"full-description-box"}>
                <div style={{whiteSpace: "pre-wrap"}}>
                    {job.description}
                </div>
            </div>
        </div>
    )
}

export default DetailedJobInfo;
