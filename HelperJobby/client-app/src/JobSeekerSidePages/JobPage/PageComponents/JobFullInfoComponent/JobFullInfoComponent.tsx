import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './JobFullInfoComponent.scss';
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import DetailedJobInfo from "../../../../Components/DetailedJobInfo/DetailedJobInfo";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark} from "@fortawesome/free-solid-svg-icons";
import {JobSeekerService} from "../../../../services/jobSeekerService";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {useNavigate} from "react-router-dom";
import {formatJobSalaryDisplay} from "../../../../utils/convertLogic/formatJobSalaryDisplay";
import {useJobSeeker} from "../../../../hooks/contextHooks/useJobSeeker";
import {useJobActions} from "../../../../hooks/comnonentSharedHooks/useJobActions";
import {useAuth} from "../../../../hooks/contextHooks/useAuth";

interface JobFullInfoComponentProps {
    job: JobDTO
}

const JobFullInfoComponent: FC<JobFullInfoComponentProps> = ({job}) => {
    const {
        jobSeeker, setJobSeeker,
        fetchJobSeekerJobInteractions
    } = useJobSeeker();
    const [isApplied, setIsApplied] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const jobSeekerService = new JobSeekerService();
    const {saveJob, removeSavedJob} = useJobActions(jobSeekerService, setJobSeeker, job);
    const {authUser} = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPageInitialData();
    }, []);

    useEffect(() => {
        isApplicationCreated();
        isJobSaved();
    }, [jobSeeker?.savedJobs, jobSeeker?.jobApplies]);

    async function fetchPageInitialData() {
        await fetchJobSeekerJobInteractions()
        setLoading(false);
    }

    function isApplicationCreated() {
        if (!jobSeeker?.jobApplies) {
            return;
        }
        if (jobSeeker?.jobApplies.some(j => j.jobId === job.id)) {
            setIsApplied(true);
        } else {
            setIsApplied(false);
        }
    }

    function isJobSaved() {
        if (!jobSeeker?.savedJobs) {
            return;
        }
        if (jobSeeker?.savedJobs.some(j => j.jobId === job.id)) {
            setIsSaved(true);
        } else {
            setIsSaved(false);
        }
    }

    async function handleJobInteraction(actionFunction: (jobId: number) => void, setIsSaved: Dispatch<SetStateAction<boolean>>) {
        try {
            if (!authUser) {
                navigate("/auth-page");
                return;
            }

            await actionFunction(job.id);
            setIsSaved(actionFunction !== removeSavedJob);
        } catch (err) {
            logErrorInfo(err);
        }
    }

    async function handleRemoveSavedJobClick() {
        await handleJobInteraction(removeSavedJob, setIsSaved);
    }

    async function handleSaveJobClick() {
        await handleJobInteraction(saveJob, setIsSaved);
    }


    return (
        (loading) ? <LoadingPage/> :
            <div className={"fji-layout"}>
                <div className={"fji-fb"}>
                    <div className={"fji-job-container"}>
                        <div className={"fji-job-header-block"}>
                            <div className={"fji-job-title bold-text"}>{job.jobTitle}</div>
                            <div className={"fji-organization-name"}>{job.employer.organization.name}</div>
                            <div className={"semi-dark-default-text mb25rem"}>{job.location}</div>
                            <div
                                className={"semi-dark-default-text mb1rem"}
                            >{formatJobSalaryDisplay(job)}</div>
                            <div className={"header-job-interactions-box"}>
                                <button
                                    className={"blue-button mr1rem"}
                                    disabled={isApplied}
                                >{isApplied ? "Applied" : "Apply now"}</button>
                                {!isApplied ?
                                    (!isSaved ? (
                                            <button
                                                className={"light-neutral-button-with-icon"}
                                                onClick={handleSaveJobClick}
                                            >
                                                <FontAwesomeIcon className={"svg125rem"} icon={faBookmark}/>
                                            </button>) : (
                                            <button
                                                className={"light-neutral-button"}
                                                onClick={handleRemoveSavedJobClick}
                                            >
                                                <FontAwesomeIcon className={"svg125rem"} icon={faBookmark}/>
                                                <span
                                                    className={"semi-dark-default-text bold-text ml05rem"}>Saved</span>
                                            </button>)
                                    ) :
                                    (<button
                                        className={"light-neutral-button"} disabled={isApplied}
                                        onClick={handleSaveJobClick}
                                    >
                                        <FontAwesomeIcon className={"svg125rem mr05rem"} icon={faBookmark}/>
                                        {isApplied &&
                                            <span className={"semi-dark-default-text bold-text"}>Applied</span>}
                                    </button>)
                                }

                            </div>
                        </div>
                        <DetailedJobInfo job={job}/>
                    </div>
                </div>
            </div>
    )
};

export default JobFullInfoComponent;
