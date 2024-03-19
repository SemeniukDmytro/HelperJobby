import React, {FC, useEffect} from 'react';
import './InterviewsComponent.scss';
import UserJobInteractionPagesHeader
    from "../../../SharedComponents/UserJobInteractionPagesHeader/UserJobInteractionPagesHeader";
import InterviewComponent from "../InterviewComponent/InterviewComponent";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import {UserJobInteractionsTypes} from "../../../../../enums/utilityEnums/UserJobInteractionsTypes";
import {useJobSeekerJobInteractions} from "../../../../../hooks/contextHooks/useJobSeekerJobInteractions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import NoInterviews from "../../../../../Components/Icons/NoInterviews";

interface InterviewsComponentProps {
}

const InterviewsComponent: FC<InterviewsComponentProps> = () => {
    const {interviews, fetchJobSeekerJobInteractions, requestInProgress} = useJobSeekerJobInteractions();
    const navigate = useNavigate();

    useEffect(() => {
        if (!interviews) {
            fetchJobSeekerJobInteractions();
        }
    }, [interviews]);

    function navigateToJobSearchPage() {
        navigate("/");
    }

    return (
        requestInProgress ? <LoadingPage/> :
            <UserJobInteractionPagesHeader userJobInteractionType={UserJobInteractionsTypes.interviewing}>
                {interviews && interviews.length !== 0 ?

                    interviews!.map((interview, index) => (
                            <InterviewComponent interview={interview} key={index}/>
                        )
                    )
                    :
                    <div className={"no-search-results-container"}>
                        <NoInterviews/>
                        <b className={"dark-default-text mb05rem mt1rem"}>
                            No interviews yet
                        </b>
                        <span className={"light-dark-small-text mb1rem"}>
                            Scheduled interviews appear here.
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

export default InterviewsComponent;
