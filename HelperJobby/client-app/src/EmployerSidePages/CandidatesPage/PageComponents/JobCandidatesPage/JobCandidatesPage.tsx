import React, {FC, useEffect, useState} from 'react';
import './JobCandidatesPage.scss';
import {useNavigate, useSearchParams} from "react-router-dom";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {JobApplyService} from "../../../../services/jobApplyService";
import {isNanAfterIntParse} from "../../../../utils/validationLogic/numbersValidators";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import JobCandidateInfo from "../JobCandidateInfo/JobCandidateInfo";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import NoJobs from "../../../../Components/Icons/NoJobs";
import {useEmployer} from "../../../../hooks/contextHooks/useEmployer";
import NoCandidates from "../../../../Components/Icons/NoCandidates";

interface JobCandidatesPageProps {
}

const JobCandidatesPage: FC<JobCandidatesPageProps> = () => {
    const {employer} = useEmployer();
    const [params] = useSearchParams();
    const [job, setJob] = useState<JobDTO>();
    const [jobAppliesLoading, setJobAppliesLoading] = useState(true);
    const jobApplyService = new JobApplyService();
    const navigate = useNavigate();

    const jobId = params.get("jobId");

    useEffect(() => {
        if (!jobId || isNanAfterIntParse(jobId)) {
            navigate(EmployerPagesPaths.CANDIDATES)
            setJobAppliesLoading(false)
            return;
        }
        getJobWithJobApplies();
    }, [jobId]);

    async function getJobWithJobApplies() {
        try {
            setJobAppliesLoading(true);
            const retrievedJob = await jobApplyService.getJobAppliesByJobId(parseInt(jobId!));
            setJob(retrievedJob);
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setJobAppliesLoading(false);
        }
    }

    return (
        jobAppliesLoading ? <LoadingPage/>
            :

            job?.jobApplies && job?.jobApplies.length != 0 ?
                <div className={"emp-main-info-container-with-pdng"}>
                    <div className={"job-candidate-table-titles-container"}>
                        <div className={"candidate-credentials-container"}>
                            <span className={"bold-text semi-dark-default-text"}>Name</span>
                        </div>
                        <div className={"review-status-box"}>
                            <span className={"bold-text semi-dark-default-text"}>Status</span>
                        </div>
                        <div className="candidate-skills-container">
                            <span className="bold-text semi-dark-default-text">Candidate skills</span>
                        </div>
                        <div className="candidate-qualifications-container">
                            <span className="bold-text semi-dark-default-text">Recent experience</span>
                        </div>
                        <div className="">
                            <span className="bold-text semi-dark-default-text">Interested?</span>
                        </div>
                        <div className={"more-candidate-options-block"}>

                        </div>
                    </div>
                    {job!.jobApplies.map((jobApply, index) => (
                        <JobCandidateInfo job={job!} setJob={setJob} jobApply={jobApply} key={index}/>
                    ))}
                </div>
                :
                !employer?.hasPostedFirstJob ?
                    <div className={"no-job-candidates-container"}>
                        <div className={"no-search-results-container"}>
                            <NoJobs/>
                            <span className={"build-page-header"}>
                            Your job isn't posted on Indeed
                        </span>
                        </div>
                    </div>
                    :
                    <div className={"no-job-candidates-container"}>
                        <div className={"no-search-results-container"}>
                            <NoCandidates/>
                            <span className={"build-page-header mt05rem"}>
                            No candidates found
                        </span>
                        </div>
                    </div>

    )
}

export default JobCandidatesPage;
