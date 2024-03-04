import React, {FC, useEffect} from 'react';
import './JobAppliesComponent.scss';
import UserJobInteractionPagesHeader
    from "../../../SharedComponents/UserJobInteractionPagesHeader/UserJobInteractionPagesHeader";
import JobApplyComponent from "../JobApplyComponent/JobApplyComponent";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import {UserJobInteractionsTypes} from "../../../../../enums/utilityEnums/UserJobInteractionsTypes";
import {useJobSeekerJobInteractions} from "../../../../../hooks/contextHooks/useJobSeekerJobInteractions";

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
