import React, {FC, useEffect, useState} from 'react';
import './ApplyReviewComponent.scss';
import useCurrentJobApplication from "../../../../../hooks/contextHooks/useCurrentJobApplication";
import {useJobSeeker} from "../../../../../hooks/contextHooks/useJobSeeker";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {useNavigate, useParams} from "react-router-dom";
import {ResumeService} from "../../../../../services/resumeService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeftLong, faBuilding} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../../../../../hooks/contextHooks/useAuth";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import {JobService} from "../../../../../services/jobService";
import {isNanAfterIntParse} from "../../../../../utils/validationLogic/numbersValidators";
import ReviewResumeWorkExperience from "../ReviewResumeWorkExperience/ReviewResumeWorkExperience";
import ReviewResumeEducation from "../ReviewResumeEducation/ReviewResumeEducation";
import WhiteLoadingSpinner from "../../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {JobApplyService} from "../../../../../services/jobApplyService";

interface ApplyReviewComponentProps {
}

const ApplyReviewComponent: FC<ApplyReviewComponentProps> = () => {
    const {authUser} = useAuth();
    const {jobId} = useParams<{ jobId: string }>();
    const {job, setJob, setShowExitDialog} = useCurrentJobApplication();
    const {jobSeeker, setJobSeeker, fetchJobSeeker} = useJobSeeker();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const resumeService = new ResumeService();
    const jobService = new JobService();
    const [requestInProgress, setRequestInProgress] = useState(false);
    const jobApplyService = new JobApplyService();

    useEffect(() => {
        if (!jobId || isNanAfterIntParse(jobId)) {
            navigate("/");
            return;
        }
        loadJobInfo();
        fetchJobSeeker();
    }, []);

    useEffect(() => {
        if (jobSeeker?.resume && job) {
            setLoading(false);
        }
    }, [jobSeeker?.resume, job]);

    useEffect(() => {
        if (jobSeeker?.resume) {
            if (jobSeeker.resume.educations.length == 0 &&
                jobSeeker.resume.workExperiences.length == 0 && jobSeeker.resume.skills.length == 0) {
                loadJobSeekerResume();
            }
        }
    }, [jobSeeker?.id]);

    async function loadJobInfo() {
        try {
            const retrievedJob = await jobService.getJobForJobSeekersById(parseInt(jobId!));
            setJob(retrievedJob);
        } catch (err) {
            logErrorInfo(err)
        }
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

        } catch (err) {
            logErrorInfo(err);
            if (job) {
                navigate(`/job-apply/${job.id}/resume`)
            } else {
                navigate("/build/name")
            }
        } finally {
            setLoading(false)
        }
    }

    async function createJobApply() {
        try {
            if (requestInProgress) {
                return;
            }
            setRequestInProgress(true);
            const retrievedJobApply = await jobApplyService.postJobApply(job!.id);
            retrievedJobApply.job = job!;
            setJobSeeker(prevJobSeeker => {
                return prevJobSeeker && {
                    ...prevJobSeeker,
                    jobApplies: [...prevJobSeeker.jobApplies, retrievedJobApply]
                };
            });
            navigate("/");
        } catch (error) {
            throw error
        } finally {
            setRequestInProgress(false);
        }
    }

    function onBackButtonClick() {
        navigate(-1);
    }

    function goToApplyResumePage() {
        navigate(`/job-apply/${jobId}/resume`)
    }

    function goToApplyContactInfoPage() {
        navigate(`/job-apply/${jobId}/contact-info`)
    }

    return (
        loading || !jobSeeker?.resume ? <LoadingPage/> :
            <div className={"apply-review-page-container"}>
                <div className="apply-review-fb">
                    <div className={"review-apply-job-container mb1rem"}>
                        <FontAwesomeIcon className={"company-vector mr1rem"} icon={faBuilding}/>
                        <div className={"apply-review-job-info"}>
                            <div className={"dark-default-text bold-text"}>
                                {job?.jobTitle}
                            </div>
                            <div className={'grey-tiny-text'}>
                                {job?.employer.organization.name}
                            </div>
                        </div>
                    </div>
                    <div className={"review-apply-main-container"}>
                        <div className={"mb15rem"}>
                            <div className={"job-apply-navigation-container"}>
                                <button className={"back-button small-back-button"} onClick={onBackButtonClick}>
                                    <FontAwesomeIcon className={"svg1rem"} icon={faArrowLeftLong}/>
                                </button>
                                <div
                                    onClick={() => setShowExitDialog(true)}
                                    className={"small-bold-navigation-link"}>
                                    Exit
                                </div>
                            </div>

                            <div className={"progress-bar-line mt05rem"}>
                                <div
                                    style={{width: "100%"}}
                                    className={"full-progress-bar-filled"}/>
                            </div>
                        </div>
                        <div className={"ja-header"}>
                            Please review your application
                        </div>
                        <div className={"job-apply-navigation-container mb1rem"}>
                            <div className={"grey-small-text bold-text"}>
                                Contact information
                            </div>
                            <div onClick={goToApplyContactInfoPage} className={"small-bold-navigation-link"}>
                                Edit
                            </div>
                        </div>
                        <div className={"review-info-container mb1rem"}>
                            <div className="review-info-block">
                                <div className={"light-dark-small-text"}>
                                    Full name
                                </div>
                                <div className={"ml2rem semi-dark-default-text bold-text"}>
                                    {jobSeeker?.firstName} {jobSeeker?.lastName}
                                </div>
                            </div>
                            <div className={"light-content-separation-line"}/>
                            <div className="review-info-block">
                                <div className={"light-dark-small-text"}>
                                    Email
                                </div>
                                <div className={"ml2rem semi-dark-default-text bold-text"}>
                                    {authUser?.user.email}
                                </div>
                            </div>
                            <div className={"light-content-separation-line"}/>
                            <div className="review-info-block">
                                <div className={"light-dark-small-text"}>
                                    City, Province/Territory
                                </div>
                                <div className={"ml2rem semi-dark-default-text bold-text"}>
                                    {jobSeeker?.address?.city}
                                </div>
                            </div>
                            <div className={"light-content-separation-line"}/>
                            {jobSeeker?.phoneNumber &&
                                <div className="review-info-block">
                                    <div className={"light-dark-small-text"}>
                                        Phone number
                                    </div>
                                    <div className={"ml2rem semi-dark-default-text bold-text"}>
                                        {jobSeeker?.phoneNumber}
                                    </div>
                                </div>
                            }
                        </div>

                        <div className={"job-apply-navigation-container mb1rem"}>
                            <div className={"grey-small-text bold-text"}>
                                Resume
                            </div>
                            <div onClick={goToApplyResumePage} className={"small-bold-navigation-link"}>
                                Edit
                            </div>
                        </div>
                        <div className={"review-info-container inner-padding"}>
                            <div className={"apply-review-job-seeker-name dark-default-text"}>
                                {jobSeeker?.firstName} {jobSeeker?.lastName}
                            </div>
                            <div className={"dark-tiny-text"}>
                                {jobSeeker?.address?.city}
                            </div>
                            <div className={"dark-tiny-text dark-blue-color"}>
                                {authUser?.user.email}
                            </div>
                            <div className={"dark-tiny-text mb1rem"}>
                                {jobSeeker?.phoneNumber}
                            </div>
                            <div className={"review-apply-resume-subtitle semi-dark-default-text"}>
                                Work experience
                            </div>
                            <div className={"light-content-separation-line"}/>
                            {jobSeeker.resume.workExperiences.map((we, index) => (
                                <ReviewResumeWorkExperience workExperience={we} key={index}/>
                            ))}
                            <div className={"review-apply-resume-subtitle semi-dark-default-text mt1rem"}>
                                Education
                            </div>
                            <div className={"light-content-separation-line"}/>
                            {jobSeeker.resume.educations.map((e, index) => (
                                <ReviewResumeEducation education={e} key={index}/>
                            ))}
                            <div className={"review-apply-resume-subtitle semi-dark-default-text mt1rem"}>
                                Skills
                            </div>
                            <div className={"light-content-separation-line"}/>
                            <ul className={"review-apply-skills-list"}>
                                {jobSeeker.resume.skills.map((skill, index) => (
                                    <li className={"dark-tiny-text"} key={index}>{skill.name}</li>
                                ))}
                            </ul>

                        </div>
                        <button
                            onClick={createJobApply}
                            className={"blue-button mt1rem"}>
                            {requestInProgress ?
                                <WhiteLoadingSpinner/>
                                :
                                "Submit your application"
                            }
                        </button>
                    </div>

                </div>
            </div>
    )
}

export default ApplyReviewComponent;
