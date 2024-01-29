import React, {FC, useEffect, useState} from 'react';
import './InterviewsComponent.scss';
import {UserJobInteractionsTypes} from "../../../../../enums/UserJobInteractionsTypes";
import UserJobInteractionPagesHeader
    from "../../../SharedComponents/UserJobInteractionPagesHeader/UserJobInteractionPagesHeader";
import JobApplyComponent from "../../../JobAppliesPage/PageComponents/JobApplyComponent/JobApplyComponent";
import {useJobSeekerJobInteractions} from "../../../../../hooks/useJobSeekerJobInteractions";
import InterviewComponent from "../InterviewComponent/InterviewComponent";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";

interface InterviewsComponentProps {}

const InterviewsComponent: FC<InterviewsComponentProps> = () => {
    const {interviews,fetchJobSeekerJobInteractions, requestInProgress} = useJobSeekerJobInteractions();

    useEffect(() => {
        if (!interviews){
            fetchJobSeekerJobInteractions();
        }
    }, [interviews]);
    
    return (
    requestInProgress ? <LoadingPage/> : 
    <UserJobInteractionPagesHeader userJobInteractionType={UserJobInteractionsTypes.interviewing}>
        {interviews!.map((interview, index) => (
                <InterviewComponent interview={interview} key={index}/>
            )
        )}
    </UserJobInteractionPagesHeader>
)};

export default InterviewsComponent;
