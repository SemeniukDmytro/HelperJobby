import React, {FC, useEffect, useState} from 'react';
import './ReviewJobComponent.scss';
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import employerPagesPaths from "../../../../../AppRoutes/Paths/EmployerPagesPaths";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {JobService} from "../../../../../services/jobService";
import EmployerJobFullInfo from "../../../../../EmployersSideComponents/EmployerJobFullInfo/EmployerJobFullInfo";
import {JobCreationStates} from "../../../../../enums/utilityEnums/JobCreationStates";
import useCurrentEmployerJob from "../../../../../hooks/contextHooks/useCurrentEmployerJob";
import {useNavigate, useParams} from "react-router-dom";
import {useJobLoaderToSetCurrentJob} from "../../../../../hooks/comnonentSharedHooks/useJobLoaderToSetCurrentJob";


interface ReviewJobComponentProps { 
}

const ReviewJobComponent: FC<ReviewJobComponentProps> = () => {
    const {currentJob, setCurrentJob} = useCurrentEmployerJob();
    const {jobId} = useParams<{ jobId: string }>();
    const [loading, setLoading] = useState(true);
    const {fetchJobAndSetJobCreation} = useJobLoaderToSetCurrentJob(jobId ? parseInt(jobId) : 0, currentJob, setCurrentJob, JobCreationStates.incompleteJob);
    const navigate = useNavigate();
    const [requestInProgress, setRequestInProgress] = useState(false);
    const jobService = new JobService();

    useEffect(() => {
        fetchInitialPageData()
    }, []);

    useEffect(() => {
        if (currentJob){
            setLoading(false);
        }
    }, [currentJob]);

    async function fetchInitialPageData() {
        await fetchJobAndSetJobCreation();
    }

    function goToPreviousPage() {
        navigate(`${employerPagesPaths.DESCRIPTION_AND_APPLICATION_DETAILS}/${jobId}`);
    }

    async function confirmJobCreation() {
        try {
            setRequestInProgress(true);
            await jobService.createJob(currentJob!.id);
            navigate(`${employerPagesPaths.JOB_POSTING}`)
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setRequestInProgress(false);
        }
    }

    
    
    return (
        loading ? <LoadingPage/>
            :
            <EmployerJobFullInfo
                job={currentJob!}
                initialLoading={loading}
                setInitialLoading={setLoading}
                requestInProgress={requestInProgress}
                onBackButtonClick={goToPreviousPage}
                onConfirmButtonClick={confirmJobCreation}
                backButtonLabel={"Back"}
                confirmButtonLabel={"Confirm"}
            />
    )
}

export default ReviewJobComponent;
