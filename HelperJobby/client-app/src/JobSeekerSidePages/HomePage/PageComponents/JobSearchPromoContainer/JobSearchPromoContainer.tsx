import React, {FC} from 'react';
import "./JobSearchPromoContainer.scss";
import {useAuth} from "../../../../hooks/useAuth";
import {useJobSeeker} from "../../../../hooks/useJobSeeker";
import {useNavigate} from "react-router-dom";

interface JobSearchPromoContainerProps {
}

const JobSearchPromoContainer: FC<JobSearchPromoContainerProps> = () => {
    const {authUser} = useAuth();
    const {jobSeeker} = useJobSeeker();
    const navigate = useNavigate();

    function navigateToBuildResumePage() {
        if (!authUser) {
            navigate("/auth-page");
            return;
        }
        navigate("/build/name")
    }


    return (
        <div className={"job-search-promo-container"}>
            {!jobSeeker?.resume && <div className={"promo-container"}>
                <a className={"promo-link"} onClick={navigateToBuildResumePage}>Upload your resume</a>
                <span className={"promo-default-text"}>&nbsp;- It only takes few seconds</span>
            </div>}
            <div className={"promo-lower-container"}>
                <a className={"promo-link"}>Post a job on indeed</a>
            </div>
        </div>
    )
};

export default JobSearchPromoContainer;
