import React, {FC, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {useHomePage} from "../../hooks/useHomePage";
import "./JobDescriptionHeader.scss";

interface JobDescriptionHeaderProps {}

const JobDescriptionHeader: FC<JobDescriptionHeaderProps> = () => {
    const {fullHeaderGridTemplate,
        setFullHeaderGridTemplate,
        shortHeaderGridTemplate,
        setShortHeaderGridTemplate} = useHomePage();
    
    useEffect(() => {
        setFullHeaderGridTemplate(1);
        setShortHeaderGridTemplate(0);
    },[])
    
    return (
        <div className={"job-header-container"}>
            <div className={"job-header-title"}>
                <span className={"title-text"}>Job title</span>
            </div>
            <div className={"full-header-info"} style={{gridTemplateRows : `${fullHeaderGridTemplate}fr`}}>
                <div className={"inner-content-wrapper"}>
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
            </div>
            <div className={"short-header-info" } style={{gridTemplateRows : `${shortHeaderGridTemplate}fr`}}>
                <div className={"inner-content-wrapper"}>
                    <a className={"short-company-name"}>Company name |</a>
                </div>
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
)};

export default JobDescriptionHeader;
