import {Dispatch, SetStateAction, useCallback, useState} from "react";
import {JobSeekerService} from "../../services/jobSeekerService";
import {JobSeekerDTO} from "../../DTOs/accountDTOs/JobSeekerDTO";
import {JobDTO} from "../../DTOs/jobRelatetedDTOs/JobDTO";

export const useJobActions = (
    jobSeekerService: JobSeekerService,
    setJobSeeker: Dispatch<SetStateAction<JobSeekerDTO | null>>,
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
