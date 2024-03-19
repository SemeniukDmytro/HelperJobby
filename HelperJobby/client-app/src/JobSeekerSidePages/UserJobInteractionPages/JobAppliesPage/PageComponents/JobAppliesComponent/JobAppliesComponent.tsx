import React, {FC, useEffect} from 'react';
import './JobAppliesComponent.scss';
import UserJobInteractionPagesHeader
    from "../../../SharedComponents/UserJobInteractionPagesHeader/UserJobInteractionPagesHeader";
import JobApplyComponent from "../JobApplyComponent/JobApplyComponent";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import {UserJobInteractionsTypes} from "../../../../../enums/utilityEnums/UserJobInteractionsTypes";
import {useJobSeekerJobInteractions} from "../../../../../hooks/contextHooks/useJobSeekerJobInteractions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import NoApplications from "../../../../../Components/Icons/NoApplications";

interface JobAppliesComponentProps {
}

const JobAppliesComponent: FC<JobAppliesComponentProps> = () => {
    const {jobApplies, fetchJobSeekerJobInteractions, requestInProgress} = useJobSeekerJobInteractions();
    const navigate = useNavigate();

    useEffect(() => {
        if (!jobApplies) {
            fetchJobSeekerJobInteractions();
        }
    }, []);

    function navigateToJobSearchPage() {
        navigate("/");
    }

    return (
        requestInProgress ? <LoadingPage/> :
            <UserJobInteractionPagesHeader userJobInteractionType={UserJobInteractionsTypes.applied}>
                {jobApplies && jobApplies.length ?
                    jobApplies!.map((jobApply, index) => (
                            <JobApplyComponent job={jobApply.job} key={index} dateApplied={jobApply.dateApplied}/>
                        )
                    )
                    :
                    <div className={"no-search-results-container"}>
                        <NoApplications/>
                        <b className={"dark-default-text mb05rem mt1rem"}>
                            No applications yet
                        </b>
                        <span className={"light-dark-small-text mb1rem"}>
                            Keep track of job applications here.
                        </span>
                        <button
                            onClick={navigateToJobSearchPage}
                            className={"blue-button"}>
                            Find jobs
                            <FontAwesomeIcon
                                className={"svg1rem ml05rem"}
                                icon={faArrowRightLong}/>
                        </button>
                    </div>
                }
            </UserJobInteractionPagesHeader>
    )
};

export default JobAppliesComponent;
