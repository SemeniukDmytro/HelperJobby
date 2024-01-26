import React, { FC } from 'react';
import './InterviewsComponent.scss';
import {UserJobInteractionsTypes} from "../../../../../enums/UserJobInteractionsTypes";
import UserJobInteractionPagesHeader
    from "../../../SharedComponents/UserJobInteractionPagesHeader/UserJobInteractionPagesHeader";

interface InterviewsComponentProps {}

const InterviewsComponent: FC<InterviewsComponentProps> = () => (
    <UserJobInteractionPagesHeader userJobInteractionType={UserJobInteractionsTypes.interviewing}>
        <div>

        </div>
    </UserJobInteractionPagesHeader>
);

export default InterviewsComponent;
