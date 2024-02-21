import React, {FC, useEffect, useState} from 'react';
import './JobCandidatesPage.scss';
import {useLocation, useParams, useSearchParams} from "react-router-dom";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {JobService} from "../../../../services/jobService";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {JobApplyService} from "../../../../services/jobApplyService";
import {isNanAfterIntParse} from "../../../../utils/validationLogic/numbersValidators";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";

interface JobCandidatesPageProps {}

const JobCandidatesPage: FC<JobCandidatesPageProps> = () => {
    const [params] = useSearchParams();
    const [job, setJob] = useState<JobDTO>();
    const [jobAppliesLoading, setJobAppliesLoading] = useState(true);
    const jobApplyService = new JobApplyService();
    
    const jobId = params.get("jobId");

    useEffect(() => {
        if (!jobId || isNanAfterIntParse(jobId)){
            return;
        }
        getJobWithJobApplies();
    }, [jobId]);
    
    async function getJobWithJobApplies(){
        try {
            setJobAppliesLoading(true);
            const retrievedJob = await jobApplyService.getJobAppliesByJobId(parseInt(jobId!));
            setJob(retrievedJob);
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
            setJobAppliesLoading(false);
        }
    }
    
    return (
        jobAppliesLoading ? <LoadingPage/>
            :
            
            <div className={"job-candidates-container"}>
                {job?.jobApplies.length != 0 ? 
                    <div>
                        dimas
                    </div>
                    :
                    <div className={"no-candidates-info"}>
                        dimas
                    </div>
                }
            </div>
                
    )
}

export default JobCandidatesPage;
