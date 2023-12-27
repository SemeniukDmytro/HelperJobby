import React, { FC } from 'react';
import "./JobSearchPromoContainer.scss";

interface JobSearchPromoContainerProps {}

const JobSearchPromoContainer: FC<JobSearchPromoContainerProps> = () => {
    
    return (
        <div className={"job-search-promo-container"}>
            <div className={"promo-container"}>
                <a className={"promo-link"}>Upload your resume</a>
                <span className={"promo-default-text"}>&nbsp;- It only takes few seconds</span>
            </div>
            <div className={"promo-lower-container"}>
                <a className={"promo-link"}>Post a job on indeed</a>
            </div>
        </div>
    )
};

export default JobSearchPromoContainer;
