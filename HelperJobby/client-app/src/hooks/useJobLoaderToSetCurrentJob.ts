import {Dispatch, SetStateAction, useCallback} from "react";
import {IncompleteJobService} from "../services/incompleteJobService";
import {logErrorInfo} from "../utils/logErrorInfo";
import {useNavigate} from "react-router-dom";
import EmployerPagesPaths from "../AppRoutes/Paths/EmployerPagesPaths";
import {JobService} from "../services/jobService";
import {JobCreationStates} from "../enums/utilityEnums/JobCreationStates";
import {IncompleteJobDTO} from "../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";

export function useJobLoaderToSetCurrentJob(jobId: number,
                                            currentJob : IncompleteJobDTO | JobDTO | null,
                                            setCurrentJob : Dispatch<SetStateAction<IncompleteJobDTO | JobDTO | null>>,
                                            jobCreationState : JobCreationStates) {
    const incompleteJobService = new IncompleteJobService();
    const jobService = new JobService();
    const navigate = useNavigate();
    const fetchJobAndSetJobCreation = useCallback(async () => {
        if (jobId == 0 || !jobId) {
            navigate(EmployerPagesPaths.JOB_POSTING);
            return;
        }
        if (currentJob?.id === jobId){
            return;
        }
        try {
            if (jobCreationState == JobCreationStates.completeJob){
                const retrievedJob = await jobService.getJobForEmployerById(jobId);
                setCurrentJob(retrievedJob);
            }
            else if (jobCreationState == JobCreationStates.incompleteJob) {
                const retrievedJob = await incompleteJobService.getIncompleteJobById(jobId);
                setCurrentJob(retrievedJob);
            }
            
        } catch (err) {
            logErrorInfo(err);
            navigate(EmployerPagesPaths.JOB_POSTING);
        } finally {
        }

    }, [jobId, setCurrentJob]);

    return {fetchJobAndSetJobCreation};
}