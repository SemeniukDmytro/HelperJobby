import React, {FC, useEffect} from 'react';
import './JobAppliesComponent.scss';
import {UserJobInteractionsTypes} from "../../../../../enums/UserJobInteractionsTypes";
import UserJobInteractionPagesHeader
    from "../../../SharedComponents/UserJobInteractionPagesHeader/UserJobInteractionPagesHeader";
import {useJobSeekerJobInteractions} from "../../../../../hooks/useJobSeekerJobInteractions";
import JobApplyComponent from "../JobApplyComponent/JobApplyComponent";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";

interface JobAppliesComponentProps {
}

const JobAppliesComponent: FC<JobAppliesComponentProps> = () => {
    const {jobApplies, fetchJobSeekerJobInteractions, requestInProgress} = useJobSeekerJobInteractions();

    useEffect(() => {
        if (!jobApplies) {
            fetchJobSeekerJobInteractions();
        }
    }, []);

    return (
        requestInProgress ? <LoadingPage/> :
            <UserJobInteractionPagesHeader userJobInteractionType={UserJobInteractionsTypes.applied}>
                {jobApplies!.map((jobApply, index) => (
                        <JobApplyComponent job={jobApply.job} key={index} dateApplied={jobApply.dateApplied}/>
                    )
                )}
            </UserJobInteractionPagesHeader>
    )
};

export default JobAppliesComponent;
