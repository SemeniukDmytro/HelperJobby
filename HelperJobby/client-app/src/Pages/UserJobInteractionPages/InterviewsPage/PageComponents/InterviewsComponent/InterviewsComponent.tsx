import React, { FC } from 'react';
import './InterviewsComponent.scss';
import {UserJobInteractionsTypes} from "../../../../../enums/UserJobInteractionsTypes";
import UserJobInteractionPagesHeader
    from "../../../SharedComponents/UserJobInteractionPagesHeader/UserJobInteractionPagesHeader";
import JobApplyComponent from "../../../JobAppliesPage/PageComponents/JobApplyComponent/JobApplyComponent";
import {useJobSeekerJobInteractions} from "../../../../../hooks/useJobSeekerJobInteractions";
import InterviewComponent from "../InterviewComponent/InterviewComponent";

interface InterviewsComponentProps {}

const InterviewsComponent: FC<InterviewsComponentProps> = () => {
    const {interviews} = useJobSeekerJobInteractions();
    
    return (
    <UserJobInteractionPagesHeader userJobInteractionType={UserJobInteractionsTypes.interviewing}>
        {interviews.map((interview, index) => (
                <InterviewComponent interview={interview} key={index}/>
            )
        )}
    </UserJobInteractionPagesHeader>
)};

export default InterviewsComponent;
