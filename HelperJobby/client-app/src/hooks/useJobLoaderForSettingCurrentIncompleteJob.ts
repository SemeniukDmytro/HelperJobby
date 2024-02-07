import {Dispatch, SetStateAction, useCallback} from "react";
import {IncompleteJobDTO} from "../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import {IncompleteJobService} from "../services/incompleteJobService";
import {logErrorInfo} from "../utils/logErrorInfo";

export function useJobLoaderForSettingCurrentIncompleteJob(jobId: number,
                                                           currentIncompleteJob : IncompleteJobDTO | null,
                                                           setIncompleteJob: Dispatch<SetStateAction<IncompleteJobDTO | null>>) {
    const incompleteJobService = new IncompleteJobService();

    const fetchJobAndSetJobCreation = useCallback(async () => {
        if (jobId == 0 || !jobId || currentIncompleteJob?.id === jobId) {
            return;
        }
        try {
            const retrievedJob = await incompleteJobService.getIncompleteJobById(jobId);
            setIncompleteJob(retrievedJob);
        } catch (err) {
            logErrorInfo(err)
        } finally {
        }

    }, [jobId, setIncompleteJob])

    return {fetchJobAndSetJobCreation};
}