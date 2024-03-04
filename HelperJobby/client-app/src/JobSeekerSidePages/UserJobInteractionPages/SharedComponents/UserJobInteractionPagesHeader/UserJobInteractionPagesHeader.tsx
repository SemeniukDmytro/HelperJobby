import React, {FC, ReactNode} from 'react';
import './UserJobInteractionPagesHeader.scss';
import PageWrapWithHeader from "../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";
import {useNavigate} from "react-router-dom";
import {UserJobInteractionsTypes} from "../../../../enums/utilityEnums/UserJobInteractionsTypes";
import {useJobSeekerJobInteractions} from "../../../../hooks/contextHooks/useJobSeekerJobInteractions";

interface UserJobInteractionPagesHeaderProps {
    children: ReactNode;
    userJobInteractionType: UserJobInteractionsTypes
}

const UserJobInteractionPagesHeader: FC<UserJobInteractionPagesHeaderProps> = ({
                                                                                   children,
                                                                                   userJobInteractionType
                                                                               }) => {
    const {savedJobs, jobApplies, interviews, fetchJobSeekerJobInteractions} = useJobSeekerJobInteractions();
    const navigate = useNavigate();

    function navigateToSavedJobsPage() {
        navigate("/saved")
    }

    function navigateToAppliedPage() {
        navigate("/applied")
    }

    function navigateToInterviewsPage() {
        navigate("/interviews")
    }

    return (
        <PageWrapWithHeader>
            <div className={"my-jobs-container"}>
                <div>
                    <h1 className={"my-jobs-header"}>My jobs</h1>
                </div>
                <div className={"job-interaction-types-tablist"}>
                    <button className={"job-interaction-tab"} onClick={navigateToSavedJobsPage}>
                            <span className={`job-interaction-info ${userJobInteractionType == UserJobInteractionsTypes.saved ? "selected-job-interaction-tab" : ""}`}>
                                <div className={"small-text"}>
                                    <span>{savedJobs?.length}</span>
                                </div>
                                <div className={"job-interaction-tab-name"}>
                                    <span>Saved</span>
                                </div>
                            </span>
                    </button>
                    <button className={"job-interaction-tab"} onClick={navigateToAppliedPage}>
                            <span
                                className={`job-interaction-info
                             ${userJobInteractionType == UserJobInteractionsTypes.applied ? "selected-job-interaction-tab" : ""}`}
                            >
                                <div className={"small-text"}>
                                    <span>{jobApplies?.length}</span>
                                </div>
                                <div className={"job-interaction-tab-name"}>
                                    <span>Applied</span>
                                </div>
                            </span>
                    </button>
                    <button className={"job-interaction-tab"} onClick={navigateToInterviewsPage}>
                            <span
                                className={`job-interaction-info
                             ${userJobInteractionType == UserJobInteractionsTypes.interviewing ? "selected-job-interaction-tab" : ""}`}
                            >
                                <div className={"small-text"}>
                                    <span>{interviews?.length}</span>
                                </div>
                                <div className={"job-interaction-tab-name"}>
                                    <span>Interviews</span>
                                </div>
                            </span>
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </PageWrapWithHeader>
    )

}

export default UserJobInteractionPagesHeader;
