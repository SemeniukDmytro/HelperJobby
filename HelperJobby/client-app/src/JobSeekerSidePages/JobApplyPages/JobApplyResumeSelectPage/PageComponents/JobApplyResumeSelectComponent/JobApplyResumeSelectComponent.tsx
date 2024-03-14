import React, {FC, FormEvent, useEffect, useState} from 'react';
import './JobApplyResumeSelectComponent.scss';
import JobApplyJobInfoWrap from "../../../SharedComponents/JobApplyJobInfoWrap/JobApplyJobInfoWrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeftLong, faCircleCheck, faCircleExclamation, faFileLines} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import useCurrentJobApplication from "../../../../../hooks/contextHooks/useCurrentJobApplication";
import {useJobSeeker} from "../../../../../hooks/contextHooks/useJobSeeker";
import {ResumeService} from "../../../../../services/resumeService";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";

interface JobApplyResumeSelectComponentProps {
}

const JobApplyResumeSelectComponent: FC<JobApplyResumeSelectComponentProps> = () => {

    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const {job} = useCurrentJobApplication();
    const navigate = useNavigate();
    const [resumeChosen, setResumeChosen] = useState(false);
    const [invalidContinueTry, setInvalidContinueTry] = useState(false);
    const [loading, setLoading] = useState(true);
    const resumeService = new ResumeService();

    useEffect(() => {
        loadJobSeekerResume();
    }, []);

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

    function createJobApply(e: FormEvent) {
        e.preventDefault();
        if (!resumeChosen) {
            setInvalidContinueTry(true);
        }
        if (!jobSeeker?.resume){
            navigate("/apply-resume/education")
        }
    }

    return (
        <JobApplyJobInfoWrap>
            <div className={"progress-bar-and-exit-container mb15rem"}>
                <div className={"job-apply-navigation-container"}>
                    <button className={"back-button"} onClick={onBackButtonClick}>
                        <FontAwesomeIcon className={"svg125rem"} icon={faArrowLeftLong}/>
                    </button>
                    <div className={"bold-navigation-link"}>
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
                    onSubmit={createJobApply}
                    className={"ja-form"}>
                    <div className={"ja-header"}>
                        Add a resume for employer
                    </div>
                    <div
                        onClick={() => setResumeChosen(true)}
                        className={`resume-select-container ${resumeChosen ? "resume-option-selected" : ""}`}>
                        <div className={"flex-row"}><FontAwesomeIcon className={"resume-add-icon mr1rem"}
                                                                     icon={faFileLines}/>
                            <div className={"flex-column"}>
                                <div className={"bold-navigation-link mb025rem"}>
                                    {jobSeeker?.resume?.id ? "HelperJobby Resume" : "Build a HelperJobby Resume"}
                                </div>
                                <div className={"grey-tiny-text"}>
                                    We’ll guide you through it; there are only a few steps.
                                </div>
                            </div>
                        </div>
                        {resumeChosen &&
                            <FontAwesomeIcon className={"dark-blue-color"} icon={faCircleCheck}/>}
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
