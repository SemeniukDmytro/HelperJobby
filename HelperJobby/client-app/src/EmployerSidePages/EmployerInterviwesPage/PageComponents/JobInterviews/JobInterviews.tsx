import React, {FC, useEffect, useState} from 'react';
import './JobInterviews.scss';
import {InterviewService} from "../../../../services/interviewService";
import {useNavigate, useSearchParams} from "react-router-dom";
import {isNanAfterIntParse} from "../../../../utils/validationLogic/numbersValidators";
import employerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import JobInterviewForEmployer from "../JobInterviewForEmployer/JobInterviewForEmployer";

interface JobInterviewsProps {
}

const JobInterviews: FC<JobInterviewsProps> = () => {
    const interviewService = new InterviewService();
    const [searchParams] = useSearchParams();
    const jobId = searchParams.get("jobId");
    const navigate = useNavigate();
    const [requestInProgress, setRequestInProgress] = useState(true);
    const [job, setJob] = useState<JobDTO>();

    useEffect(() => {
        if (!jobId || isNanAfterIntParse(jobId)) {
            navigate(employerPagesPaths.EMPLOYER_INTERVIEWS);
            return;
        }
        loadJobInterviews(parseInt(jobId))
    }, [jobId]);

    async function loadJobInterviews(jobId: number) {
        try {
            setRequestInProgress(true);
            const jobDTO = await interviewService.getInterviewsByJobId(jobId);
            setJob(jobDTO)
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setRequestInProgress(false);
        }
    }

    return (
        requestInProgress ? <LoadingPage/> :
            <>
                {job?.interviews && job.interviews.length > 0 ?
                    job.interviews.map((interview, index) =>
                        <JobInterviewForEmployer 
                            key={index}
                            interview={interview} setJob={setJob}/>
                    )
                    :
                    <div>

                    </div>
                }
            </>


    )
}

export default JobInterviews;
