import React, {FC, useEffect} from 'react';
import './InterviewsComponent.scss';
import UserJobInteractionPagesHeader
    from "../../../SharedComponents/UserJobInteractionPagesHeader/UserJobInteractionPagesHeader";
import {useJobSeekerJobInteractions} from "../../../../../hooks/useJobSeekerJobInteractions";
import InterviewComponent from "../InterviewComponent/InterviewComponent";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import {UserJobInteractionsTypes} from "../../../../../enums/utilityEnums/UserJobInteractionsTypes";

interface InterviewsComponentProps {
}

const InterviewsComponent: FC<InterviewsComponentProps> = () => {
    const {interviews, fetchJobSeekerJobInteractions, requestInProgress} = useJobSeekerJobInteractions();

    useEffect(() => {
        if (!interviews) {
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
    )
};

export default InterviewsComponent;
