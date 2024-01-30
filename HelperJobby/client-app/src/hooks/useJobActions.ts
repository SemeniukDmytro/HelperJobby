import {Dispatch, SetStateAction, useCallback, useState} from "react";
import {JobSeekerAccountService} from "../services/jobSeekerAccountService";
import {JobDTO} from "../DTOs/jobRelatetedDTOs/JobDTO";
import {JobSeekerAccountDTO} from "../DTOs/accountDTOs/JobSeekerAccountDTO";

export const useJobActions = (
    jobSeekerService: JobSeekerAccountService,
    setJobSeeker: Dispatch<SetStateAction<JobSeekerAccountDTO | null>>,
    job: JobDTO
) => {
    const [requestInProcess, setRequestInProcess] = useState(false);

    const removeSavedJob = useCallback(async (jobId: number) => {
        try {
            if (requestInProcess) {
                return;
            }
            setRequestInProcess(true);
            await jobSeekerService.deleteSavedJob(jobId);

            setJobSeeker(prevJobSeeker => {
                return prevJobSeeker && {
                    ...prevJobSeeker,
                    savedJobs: prevJobSeeker.savedJobs.filter(savedJob => savedJob.jobId !== jobId)
                }
            });
        } catch (error) {
            throw error;
        } finally {
            setRequestInProcess(false);
        }
    }, [requestInProcess, jobSeekerService, setJobSeeker]);

    const saveJob = useCallback(async (jobId: number) => {
        try {
            if (requestInProcess) {
                return;
            }
            setRequestInProcess(true);
            const retrievedSavedJob = await jobSeekerService.saveJob(jobId);
            retrievedSavedJob.job = job;
            setJobSeeker(prevJobSeeker => {
                return prevJobSeeker && {
                    ...prevJobSeeker,
                    savedJobs: [...prevJobSeeker.savedJobs, retrievedSavedJob]
                };
            });
        } catch (error) {
            throw error
        } finally {
            setRequestInProcess(false);
        }
    }, [requestInProcess, jobSeekerService, job, setJobSeeker]);

    return {removeSavedJob, saveJob};
};
