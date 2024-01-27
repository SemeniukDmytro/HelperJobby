import React, {FC} from 'react';
import './SavedJobsComponent.scss';
import UserJobInteractionPagesHeader
    from "../../../SharedComponents/UserJobInteractionPagesHeader/UserJobInteractionPagesHeader";
import {UserJobInteractionsTypes} from "../../../../../enums/UserJobInteractionsTypes";
import {useJobSeekerJobInteractions} from "../../../../../hooks/useJobSeekerJobInteractions";
import SavedJobComponent from "../SavedJobComponent/SavedJobComponent";

interface SavedJobsComponentProps {
}

const SavedJobsComponent: FC<SavedJobsComponentProps> = () => {
    const {savedJobs, setSavedJobs} = useJobSeekerJobInteractions();
    return (
        <UserJobInteractionPagesHeader userJobInteractionType={UserJobInteractionsTypes.saved}>
            {savedJobs.map((savedJob, index) => (
                    <SavedJobComponent job={savedJob.job} key={index} interactionTime={savedJob.dateSaved}/>
                )
            )}
        </UserJobInteractionPagesHeader>
    );
}

export default SavedJobsComponent;
