import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { JobSeekerAccountService } from "../services/jobSeekerAccountService";
import { SavedJobDTO } from "../DTOs/userJobInteractionsDTOs/SavedJobDTO";
import { JobDTO } from "../DTOs/jobRelatetedDTOs/JobDTO";
import {useAuth} from "./useAuth";

export const useJobActions = (
    jobSeekerService: JobSeekerAccountService,
    setJobSeekerSavedJobs: Dispatch<SetStateAction<SavedJobDTO[] | null>>,
    job: JobDTO
) => {
    const [requestInProcess, setRequestInProcess] = useState(false);
    const {authUser} = useAuth();
    
    const removeSavedJob = useCallback(async (jobId: number) => {
        try {
            if (requestInProcess) {
                return;
            }
            setRequestInProcess(true);
            await jobSeekerService.deleteSavedJob(jobId);
            setJobSeekerSavedJobs(prevSavedJobs =>
                prevSavedJobs!.filter(savedJob => savedJob.jobId !== jobId)
            );
        } catch (error) {
            throw error;
        } finally {
            setRequestInProcess(false);
        }
    }, [requestInProcess, jobSeekerService, setJobSeekerSavedJobs]);

    const saveJob = useCallback(async (jobId: number) => {
        try {
            if (requestInProcess) {
                return;
            }
            setRequestInProcess(true);
            const retrievedSavedJob = await jobSeekerService.saveJob(jobId);
            retrievedSavedJob.job = job;
            setJobSeekerSavedJobs(prevSavedJobs => [...prevSavedJobs!, retrievedSavedJob!]);
        } catch (error) {
            throw error
        } finally {
            setRequestInProcess(false);
        }
    }, [requestInProcess, jobSeekerService, job, setJobSeekerSavedJobs]);

    return { removeSavedJob, saveJob };
};
