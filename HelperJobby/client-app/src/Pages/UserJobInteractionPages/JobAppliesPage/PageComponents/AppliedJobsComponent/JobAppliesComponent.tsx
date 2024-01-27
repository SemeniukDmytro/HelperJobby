import React, { FC } from 'react';
import './JobAppliesComponent.scss';
import {UserJobInteractionsTypes} from "../../../../../enums/UserJobInteractionsTypes";
import UserJobInteractionPagesHeader
    from "../../../SharedComponents/UserJobInteractionPagesHeader/UserJobInteractionPagesHeader";

interface JobAppliesComponentProps {}

const JobAppliesComponent: FC<JobAppliesComponentProps> = () => (
    <UserJobInteractionPagesHeader userJobInteractionType={UserJobInteractionsTypes.applied}>
        <div>

        </div>
    </UserJobInteractionPagesHeader>
);

export default JobAppliesComponent;
