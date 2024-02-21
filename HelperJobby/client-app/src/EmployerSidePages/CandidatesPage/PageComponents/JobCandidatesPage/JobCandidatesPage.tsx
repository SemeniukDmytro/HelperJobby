import React, {FC, useEffect, useState} from 'react';
import './JobCandidatesPage.scss';
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {JobService} from "../../../../services/jobService";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {JobApplyService} from "../../../../services/jobApplyService";
import {isNanAfterIntParse} from "../../../../utils/validationLogic/numbersValidators";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import JobCandidateInfo from "../JobCandidateInfo/JobCandidateInfo";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";

interface JobCandidatesPageProps {}

const JobCandidatesPage: FC<JobCandidatesPageProps> = () => {
    const [params] = useSearchParams();
    const [job, setJob] = useState<JobDTO>();
    const [jobAppliesLoading, setJobAppliesLoading] = useState(true);
    const jobApplyService = new JobApplyService();
    const navigate = useNavigate();
    
    const jobId = params.get("jobId");

    useEffect(() => {
        if (!jobId || isNanAfterIntParse(jobId)){
            navigate(EmployerPagesPaths.CANDIDATES)
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

            job?.jobApplies.length != 0 ?
                <div className={"job-candidates-container"}>
                    <div className={"job-candidate-table-titles-container"}>
                        
                    </div>
                    {job!.jobApplies.map((jobApply, index) => (
                        <JobCandidateInfo job={job!} jobApply={jobApply} key={index}/>
                    ))}
                </div>
                :
                <div  className={"no-job-candidates-container"}>
                    
                </div>
                
    )
}

export default JobCandidatesPage;
