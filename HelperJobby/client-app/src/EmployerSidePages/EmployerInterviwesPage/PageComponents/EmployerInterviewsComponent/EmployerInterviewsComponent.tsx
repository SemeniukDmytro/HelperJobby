import React, {FC, useEffect, useState} from 'react';
import './EmployerInterviewsComponent.scss';
import {JobService} from "../../../../services/jobService";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import employerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {useNavigate, useSearchParams} from "react-router-dom";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import JobInterviews from "../JobInterviews/JobInterviews";
import {useEmployer} from "../../../../hooks/contextHooks/useEmployer";

interface InterviewsComponentProps {
}

const EmployerInterviewsComponent: FC<InterviewsComponentProps> = () => {
    const {employer, setEmployer} = useEmployer();
    const jobService = new JobService();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const jobId = searchParams.get("jobId");

    useEffect(() => {
        loadEmployerJobTitles();
    }, []);

    async function loadEmployerJobTitles() {
        try {
            setLoading(true);
            const retrievedJobs = await jobService.getEmployerJobTitles(employer!.id);
            if (!employer?.jobs || employer.jobs.length == 0) {
                setEmployer(prev => {
                    return prev && {
                        ...prev,
                        jobs: retrievedJobs
                    }
                })
            }
            if (retrievedJobs.length !== 0) {
                navigate(`${EmployerPagesPaths.EMPLOYER_INTERVIEWS}?jobId=${retrievedJobs[0].id}`);
            }
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setLoading(false)
        }
    }

    function handleOtherJobSelection(jobId: number) {
        navigate(`${EmployerPagesPaths.EMPLOYER_INTERVIEWS}?jobId=${jobId}`);

    }

    function navigateToJobPostingPage() {
        navigate(employerPagesPaths.JOB_POSTING);
    }

    return (
        loading ? <LoadingPage/> :
            <div className={"light-grey-page-background"}>
                <div className={"emp-pages-layout"}>
                    <div className={"emp-pages-header mt1rem mb1rem"}>
                        <span className={"small-title mb0"}>Interviews</span>
                        <button className={"blue-button"} onClick={navigateToJobPostingPage}>Post a job</button>
                    </div>
                    <div className={"interviews-page-layout"}>
                        <div className={"job-select-for-interviews-container"}>
                            <div className={"job-select-for-interviews-header"}>
                                Interviews
                            </div>
                            <div className={"content-separation-line"}>
                            </div>
                            <div className={"flex-column"}>
                                {(employer?.jobs && employer.jobs.length != 0) &&
                                    employer.jobs.map((job, index) => (
                                        <>
                                            <div
                                                key={index}
                                                onClick={() => handleOtherJobSelection(job.id)}
                                                className={`job-title-for-interviews ${jobId && parseInt(jobId) == job.id ? "bold-text" : ""}`}>
                                                {job.jobTitle}
                                            </div>
                                            <div className={"content-separation-line"}></div>
                                        </>

                                    ))
                                }</div>
                        </div>
                        <div className={"job-interviews-container"}>
                            <JobInterviews/>
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default EmployerInterviewsComponent;
