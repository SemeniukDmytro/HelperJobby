import React, {FC, ReactNode, useEffect, useState} from 'react';
import './UserJobInteractionPagesHeader.scss';
import PageWrapWithHeader from "../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import {JobSeekerAccountService} from "../../../../services/jobSeekerAccountService";
import {JobApplyService} from "../../../../services/jobApplyService";
import {InterviewService} from "../../../../services/interviewService";
import {useJobSeekerJobInteractions} from "../../../../hooks/useJobSeekerJobInteractions";
import {UserJobInteractionsTypes} from "../../../../enums/UserJobInteractionsTypes";
import {useNavigate} from "react-router-dom";
import {useJobSeeker} from "../../../../hooks/useJobSeeker";

interface UserJobInteractionPagesHeaderProps {
    children: ReactNode;
    userJobInteractionType : UserJobInteractionsTypes
}

const UserJobInteractionPagesHeader: FC<UserJobInteractionPagesHeaderProps> = ({children,
                                                                                   userJobInteractionType}) => {
    const [loading, setLoading] = useState(true);
    const {savedJobs, jobApplies, interviews, fetchJobSeekerJobInteractions} = useJobSeekerJobInteractions();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            await fetchJobSeekerJobInteractions();
            setLoading(false);
        };

        fetchData();
    }, []);


    function navigateToSavedJobsPage() {
        navigate("/saved")
    }
    
    function navigateToAppliedPage(){
        navigate("/applied")
    }
    
    function navigateToInterviewsPage() {
        navigate("/interviews")
    }

    return (
        <PageWrapWithHeader>
            {loading ? <LoadingPage/> :
                <div className={"my-jobs-container"}>
                    <div>
                        <h1 className={"my-jobs-header"}>My jobs</h1>
                    </div>
                    <div className={"job-interaction-types-tablist"}>
                        <button className={"job-interaction-tab"} onClick={navigateToSavedJobsPage}>
                            <span className={`job-interaction-info ${userJobInteractionType == UserJobInteractionsTypes.saved ? "selected-job-interaction-tab" : ""}`}>
                                <div className={"small-text"}>
                                    <span>{savedJobs.length}</span>
                                </div>
                                <div className={"job-interaction-tab-name"}>
                                    <span>Saved</span>
                                </div>
                            </span>
                        </button>
                        <button className={"job-interaction-tab"} onClick={navigateToAppliedPage}>
                            <span className={`job-interaction-info
                             ${userJobInteractionType == UserJobInteractionsTypes.applied ? "selected-job-interaction-tab" : ""}`}>
                                <div className={"small-text"}>
                                    <span>{jobApplies.length}</span>
                                </div>
                                <div className={"job-interaction-tab-name"}>
                                    <span>Applied</span>
                                </div>
                            </span>
                        </button>
                        <button className={"job-interaction-tab"} onClick={navigateToInterviewsPage}>
                            <span className={`job-interaction-info
                             ${userJobInteractionType == UserJobInteractionsTypes.interviewing ? "selected-job-interaction-tab" : ""}`}>
                                <div className={"small-text"}>
                                    <span>{interviews.length}</span>
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
            }
        </PageWrapWithHeader>
    )

}

export default UserJobInteractionPagesHeader;
