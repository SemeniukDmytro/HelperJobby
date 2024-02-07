import {Dispatch, SetStateAction, useCallback} from "react";
import {IncompleteJobDTO} from "../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import {IncompleteJobService} from "../services/incompleteJobService";
import {logErrorInfo} from "../utils/logErrorInfo";
import {useNavigate} from "react-router-dom";
import EmployerPagesPaths from "../AppRoutes/Paths/EmployerPagesPaths";

export function useJobLoaderForSettingCurrentIncompleteJob(jobId: number,
                                                           currentIncompleteJob : IncompleteJobDTO | null,
                                                           setIncompleteJob: Dispatch<SetStateAction<IncompleteJobDTO | null>>) {
    const incompleteJobService = new IncompleteJobService();
    const navigate = useNavigate();

    const fetchJobAndSetJobCreation = useCallback(async () => {
        if (jobId == 0 || !jobId) {
            navigate(EmployerPagesPaths.JOB_POSTING);
            return;
        }
        if (currentIncompleteJob?.id === jobId){
            return;
        }
        try {
            const retrievedJob = await incompleteJobService.getIncompleteJobById(jobId);
            setIncompleteJob(retrievedJob);
        } catch (err) {
            logErrorInfo(err);
            navigate(EmployerPagesPaths.JOB_POSTING);
        } finally {
        }

    }, [jobId, setIncompleteJob])

    return {fetchJobAndSetJobCreation};
}