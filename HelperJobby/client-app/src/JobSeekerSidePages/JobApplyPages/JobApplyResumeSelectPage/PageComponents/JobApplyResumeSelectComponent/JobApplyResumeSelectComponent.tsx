import React, {FC, FormEvent, useEffect, useState} from 'react';
import './JobApplyResumeSelectComponent.scss';
import JobApplyJobInfoWrap from "../../../SharedComponents/JobApplyJobInfoWrap/JobApplyJobInfoWrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowLeftLong,
    faCircleCheck,
    faCircleExclamation,
    faFileLines,
    faPen
} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import useCurrentJobApplication from "../../../../../hooks/contextHooks/useCurrentJobApplication";
import {useJobSeeker} from "../../../../../hooks/contextHooks/useJobSeeker";
import {ResumeService} from "../../../../../services/resumeService";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import {getFormattedTimeWithWeekdays} from "../../../../../utils/convertLogic/formatDate";
import {useAuth} from "../../../../../hooks/contextHooks/useAuth";

interface JobApplyResumeSelectComponentProps {
}

const JobApplyResumeSelectComponent: FC<JobApplyResumeSelectComponentProps> = () => {

    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const {authUser} = useAuth();
    const {job, setShowExitDialog} = useCurrentJobApplication();
    const navigate = useNavigate();
    const [resumeChosen, setResumeChosen] = useState(false);
    const [invalidContinueTry, setInvalidContinueTry] = useState(false);
    const [loading, setLoading] = useState(true);
    const resumeService = new ResumeService();

    useEffect(() => {
        loadJobSeekerResume();
    }, [jobSeeker?.id]);

    useEffect(() => {
        if (resumeChosen) {
            setInvalidContinueTry(false);
        }
    }, [resumeChosen]);

    function onBackButtonClick() {
        navigate(`/job-apply/${job?.id}/contact-info`)
    }

    async function loadJobSeekerResume() {
        try {
            if (!jobSeeker) {
                return;
            }
            setLoading(true);
            const retrievedResume = await resumeService.getResumeByJobSeekerId(jobSeeker!.id);
            setJobSeeker(prev => {
                return prev && {
                    ...prev,
                    resume: retrievedResume
                }
            })

        } catch
            (err) {
            logErrorInfo(err)
        } finally {
            setLoading(false)
        }
    }

    function proceedToJobApplyReviewPage(e: FormEvent) {
        e.preventDefault();
        if (!resumeChosen) {
            setInvalidContinueTry(true);
        }
        if (!jobSeeker?.resume) {
            navigate("/apply-resume/education");
        } else if (job) {
            navigate(`/job-apply/${job.id}/review-info`);
        } else {
            navigate("/")
        }
    }

    function navigateToEditResumePage() {
        if (!job) {
            navigate("/resume")
        } else {
            navigate(`/resume?from=job-apply&jobId=${job?.id}`);
        }
    }

    return (
        <JobApplyJobInfoWrap>
            <div className={"progress-bar-and-exit-container mb15rem"}>
                <div className={"job-apply-navigation-container"}>
                    <button className={"back-button"} onClick={onBackButtonClick}>
                        <FontAwesomeIcon className={"svg125rem"} icon={faArrowLeftLong}/>
                    </button>
                    <div
                        onClick={() => setShowExitDialog(true)}
                        className={"bold-navigation-link"}>
                        Exit
                    </div>
                </div>

                <div className={"progress-bar-line mt05rem"}>
                    <div
                        style={{width: "66%"}}
                        className={"progress-bar-filled"}/>
                </div>
            </div>
            {loading ? <LoadingPage/> :
                <form
                    onSubmit={proceedToJobApplyReviewPage}
                    className={"ja-form"}>
                    <div className={"ja-header"}>
                        Add a resume for employer
                    </div>
                    <div
                        onClick={() => setResumeChosen(true)}
                        className={`resume-select-container ${resumeChosen ? "resume-option-selected" : ""}`}>
                        <div className={"resume-select-header-container"}>
                            <div className={"flex-row"}><FontAwesomeIcon className={"resume-add-icon mr1rem"}
                                                                         icon={faFileLines}/>
                                <div className={"flex-column"}>
                                    <div className={"bold-navigation-link mb025rem"}>
                                        {jobSeeker?.resume?.id ? "HelperJobby Resume" : "Build a HelperJobby Resume"}
                                    </div>
                                    <div className={"grey-tiny-text"}>
                                        {jobSeeker?.resume?.id ?
                                            `Created ${getFormattedTimeWithWeekdays(jobSeeker.resume.createdOn) === "Today"
                                                ? "today" : `on ${getFormattedTimeWithWeekdays(jobSeeker.resume.createdOn)}`}`
                                            :
                                            "We’ll guide you through it; there are only a few steps."
                                        }
                                    </div>
                                </div>
                            </div>
                            {resumeChosen &&
                                <FontAwesomeIcon className={"dark-blue-color"} icon={faCircleCheck}/>}
                        </div>
                        {jobSeeker?.resume &&
                            <>
                                <div className={"content-separation-line"}/>
                                <div className="selected-resume-info-container">
                                    <div className={"dark-default-text bold-text mb05rem"}>
                                        {jobSeeker.firstName} {jobSeeker.lastName}
                                    </div>
                                    <div className={"grey-small-text mb1rem"}>
                                        <div>{authUser?.user.email}</div>
                                        <div>{jobSeeker.phoneNumber}</div>
                                        <div>{jobSeeker.address?.city}</div>
                                        {jobSeeker.resume.workExperiences.map((we, index) => (
                                            <div key={index}>{we.jobTitle}{we.company ? `, ${we.company}` : ""}</div>
                                        ))
                                        }
                                        {jobSeeker.resume.educations.map((e, index) => (
                                            <div key={index}>{e.schoolName && `${e.schoolName}, `}
                                                {e.levelOfEducation}{e.fieldOfStudy ? ` - ${e.fieldOfStudy}` : ""}</div>
                                        ))
                                        }
                                    </div>
                                    <button
                                        onClick={navigateToEditResumePage}
                                        className={"full-width-button light-neutral-button jc-center"}>
                                        <span className={"bold-text dark-default-text"}>Edit resume</span>
                                        <FontAwesomeIcon className={"svg1rem ml05rem"} icon={faPen}/>
                                    </button>
                                </div>
                            </>

                        }
                    </div>
                    {(invalidContinueTry) &&
                        <div className={"error-box"}>
                            <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                            <span className={"error-text"}>Choose an option to continue</span>
                        </div>}
                    <button
                        className={"blue-button mt1rem"}
                        type={"submit"}
                    >
                        Continue
                    </button>
                </form>
            }

        </JobApplyJobInfoWrap>
    )
}

export default JobApplyResumeSelectComponent;
