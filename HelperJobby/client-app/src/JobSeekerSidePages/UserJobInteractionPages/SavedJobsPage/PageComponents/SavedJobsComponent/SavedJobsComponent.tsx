import React, {FC, useEffect} from 'react';
import './SavedJobsComponent.scss';
import UserJobInteractionPagesHeader
    from "../../../SharedComponents/UserJobInteractionPagesHeader/UserJobInteractionPagesHeader";
import SavedJobComponent from "../SavedJobComponent/SavedJobComponent";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import {UserJobInteractionsTypes} from "../../../../../enums/utilityEnums/UserJobInteractionsTypes";
import {useJobSeekerJobInteractions} from "../../../../../hooks/contextHooks/useJobSeekerJobInteractions";
import NoSavedJobs from "../../../../../Components/Icons/NoSavedJobs";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

interface SavedJobsComponentProps {
}

const SavedJobsComponent: FC<SavedJobsComponentProps> = () => {
    const {savedJobs, fetchJobSeekerJobInteractions, requestInProgress} = useJobSeekerJobInteractions();
    const navigate = useNavigate();

    useEffect(() => {
        if (!savedJobs) {
            fetchJobSeekerJobInteractions();
        }
    }, [savedJobs]);

    function navigateToJobSearchPage() {
        navigate("/");
    }

    return (
        requestInProgress ? <LoadingPage/> :
            (<UserJobInteractionPagesHeader userJobInteractionType={UserJobInteractionsTypes.saved}>
                {savedJobs && savedJobs.length !== 0 ?
                    savedJobs.map((savedJob, index) => (
                        <SavedJobComponent job={savedJob.job} key={index} interactionTime={savedJob.dateSaved}/>))

                    :
                    <div className={"no-search-results-container"}>
                        <NoSavedJobs/>
                        <b className={"dark-default-text mb05rem mt1rem"}>
                            No jobs saved yet
                        </b>
                        <span className={"light-dark-small-text mb1rem"}>
                        Jobs you save appear here.
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
            </UserJobInteractionPagesHeader>)
    );
}

export default SavedJobsComponent;
