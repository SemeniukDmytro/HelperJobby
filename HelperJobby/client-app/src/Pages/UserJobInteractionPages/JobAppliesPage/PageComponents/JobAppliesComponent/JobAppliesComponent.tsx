import React, { FC } from 'react';
import './JobAppliesComponent.scss';
import {UserJobInteractionsTypes} from "../../../../../enums/UserJobInteractionsTypes";
import UserJobInteractionPagesHeader
    from "../../../SharedComponents/UserJobInteractionPagesHeader/UserJobInteractionPagesHeader";
import SavedJobComponent from "../../../SavedJobsPage/PageComponents/SavedJobComponent/SavedJobComponent";
import {useJobSeekerJobInteractions} from "../../../../../hooks/useJobSeekerJobInteractions";
import JobApplyComponent from "../JobApplyComponent/JobApplyComponent";

interface JobAppliesComponentProps {}

const JobAppliesComponent: FC<JobAppliesComponentProps> = () => {
    const {jobApplies} = useJobSeekerJobInteractions();
    
    return (
    <UserJobInteractionPagesHeader userJobInteractionType={UserJobInteractionsTypes.applied}>
        {jobApplies.map((jobApply, index) => (
                <JobApplyComponent job={jobApply.job} key={index} dateApplied={jobApply.dateApplied}/>
            )
        )}
    </UserJobInteractionPagesHeader>
)};

export default JobAppliesComponent;
