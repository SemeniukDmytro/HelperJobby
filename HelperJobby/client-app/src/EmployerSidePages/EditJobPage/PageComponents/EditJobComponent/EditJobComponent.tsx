import React, {FC, useEffect, useState} from 'react';
import './EditJobComponent.scss';
import {useNavigate, useParams} from "react-router-dom";
import {JobService} from "../../../../services/jobService";
import employerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import EmployerJobFullInfo from "../../../../EmployersSideComponents/EmployerJobFullInfo/EmployerJobFullInfo";
import {JobCreationStates} from "../../../../enums/utilityEnums/JobCreationStates";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {UpdatedJobDTO} from "../../../../DTOs/jobRelatetedDTOs/UpdatedJobDTO";
import useCurrentEmployerJob from "../../../../hooks/contextHooks/useCurrentEmployerJob";
import {useJobLoaderToSetCurrentJob} from "../../../../hooks/comnonentSharedHooks/useJobLoaderToSetCurrentJob";

interface EditJobComponentProps {
}

const EditJobComponent: FC<EditJobComponentProps> = () => {
    const {currentJob, setCurrentJob, setJobCreationState} = useCurrentEmployerJob();
    const {employerJobId} = useParams<{ employerJobId: string }>();
    const [loading, setLoading] = useState(true);
    const {fetchJobAndSetJobCreation} = useJobLoaderToSetCurrentJob(employerJobId ? parseInt(employerJobId) : 0, currentJob, setCurrentJob,
        JobCreationStates.completeJob);
    const navigate = useNavigate();
    const [requestInProgress, setRequestInProgress] = useState(false);
    const jobService = new JobService();

    useEffect(() => {
        fetchInitialPageData()
        setJobCreationState(JobCreationStates.completeJob);
    }, []);

    useEffect(() => {
        if (currentJob) {
            setLoading(false);
        }
    }, [currentJob]);

    async function fetchInitialPageData() {
        await fetchJobAndSetJobCreation();
    }

    function goToPreviousPage() {
        navigate(employerPagesPaths.JOBS);
    }

    async function confirmJobUpdate() {
        try {
            setRequestInProgress(true);
            if (currentJob) {
                const updatedJob: UpdatedJobDTO = {
                    ...currentJob as JobDTO
                }
                await jobService.putJob(currentJob!.id, updatedJob);
            }
            navigate(employerPagesPaths.JOBS);
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
                onConfirmButtonClick={confirmJobUpdate}
                backButtonLabel={"Exit"}
                confirmButtonLabel={"Save changes"}
            />
    )
}

export default EditJobComponent;
