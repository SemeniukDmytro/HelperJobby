import React, {FC, useEffect} from 'react';
import './SavedJobsComponent.scss';
import UserJobInteractionPagesHeader
    from "../../../SharedComponents/UserJobInteractionPagesHeader/UserJobInteractionPagesHeader";
import {UserJobInteractionsTypes} from "../../../../../enums/UserJobInteractionsTypes";
import {useJobSeekerJobInteractions} from "../../../../../hooks/useJobSeekerJobInteractions";
import SavedJobComponent from "../SavedJobComponent/SavedJobComponent";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";

interface SavedJobsComponentProps {
}

const SavedJobsComponent: FC<SavedJobsComponentProps> = () => {
    const {savedJobs, fetchJobSeekerJobInteractions, requestInProgress} = useJobSeekerJobInteractions();

    useEffect(() => {
        if (!savedJobs) {
            fetchJobSeekerJobInteractions();
        }
    }, [savedJobs]);

    return (
        requestInProgress ? <LoadingPage/> :
            (<UserJobInteractionPagesHeader userJobInteractionType={UserJobInteractionsTypes.saved}>
                {savedJobs!.map((savedJob, index) => (
                    <SavedJobComponent job={savedJob.job} key={index} interactionTime={savedJob.dateSaved}/>))
                }
            </UserJobInteractionPagesHeader>)
    );
}

export default SavedJobsComponent;
