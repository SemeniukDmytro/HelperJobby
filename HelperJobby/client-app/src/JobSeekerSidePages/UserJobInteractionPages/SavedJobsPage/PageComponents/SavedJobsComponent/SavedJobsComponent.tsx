import React, {FC, useEffect} from 'react';
import './SavedJobsComponent.scss';
import UserJobInteractionPagesHeader
    from "../../../SharedComponents/UserJobInteractionPagesHeader/UserJobInteractionPagesHeader";
import SavedJobComponent from "../SavedJobComponent/SavedJobComponent";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import {UserJobInteractionsTypes} from "../../../../../enums/utilityEnums/UserJobInteractionsTypes";
import {useJobSeekerJobInteractions} from "../../../../../hooks/contextHooks/useJobSeekerJobInteractions";

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
