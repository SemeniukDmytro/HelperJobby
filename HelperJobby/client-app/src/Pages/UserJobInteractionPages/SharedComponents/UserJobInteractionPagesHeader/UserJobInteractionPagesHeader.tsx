import React, {FC, ReactNode, useEffect, useState} from 'react';
import './UserJobInteractionPagesHeader.scss';
import PageWrapWithHeader from "../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import {JobSeekerAccountService} from "../../../../services/jobSeekerAccountService";
import {JobApplyService} from "../../../../services/jobApplyService";
import {InterviewService} from "../../../../services/interviewService";
import {useJobSeekerJobInteractions} from "../../../../hooks/useJobSeekerJobInteractions";

interface UserJobInteractionPagesHeaderProps {
    children : ReactNode;
}

const UserJobInteractionPagesHeader: FC<UserJobInteractionPagesHeaderProps> = ({children}) => {
    const [loading, setLoading] = useState(true);
    const {savedJobs, fetchJobSeekerJobInteractions} = useJobSeekerJobInteractions();
    
    

    useEffect(() => {
        const fetchData = async () => {
            await fetchJobSeekerJobInteractions();
            setLoading(false);
        };

        fetchData();
    }, [fetchJobSeekerJobInteractions]);
    
    
    
    return (
        <PageWrapWithHeader>
            {loading ? <LoadingPage/> :
                <div className={"my-jobs-container"}>
                    <div>
                        <h1 className={"my-jobs-header"}>My jobs</h1>
                    </div>
                    <div className={"job-interaction-types-tablist"}>
                        {savedJobs.length} {savedJobs[0].job.jobTitle}
                    </div>
                </div>
            }
        </PageWrapWithHeader>
    )
    
}

export default UserJobInteractionPagesHeader;
