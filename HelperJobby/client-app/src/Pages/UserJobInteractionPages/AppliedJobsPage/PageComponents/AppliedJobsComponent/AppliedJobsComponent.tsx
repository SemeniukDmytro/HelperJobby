import React, { FC } from 'react';
import './AppliedJobsComponent.scss';
import {UserJobInteractionsTypes} from "../../../../../enums/UserJobInteractionsTypes";
import UserJobInteractionPagesHeader
    from "../../../SharedComponents/UserJobInteractionPagesHeader/UserJobInteractionPagesHeader";

interface AppliedJobsComponentProps {}

const AppliedJobsComponent: FC<AppliedJobsComponentProps> = () => (
    <UserJobInteractionPagesHeader userJobInteractionType={UserJobInteractionsTypes.applied}>
        <div>

        </div>
    </UserJobInteractionPagesHeader>
);

export default AppliedJobsComponent;
