import React, {FC, FormEvent, useEffect, useState} from 'react';
import './JobPostingComponent.scss';
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import PageTitleWithImage from "../../../../EmployersSideComponents/PageTitleWithImage/PageTitleWithImage";
import PeopleInAnOffice from "../../../../Components/Icons/PeopleInAnOffice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import {JobPostingMethods} from "../../../../enums/utilityEnums/JobPostingMethods";
import {useEmployer} from "../../../../hooks/useEmployer";

interface JobPostingComponentProps {
}

const JobPostingComponent: FC<JobPostingComponentProps> = () => {
    const [jobPostingMethod, setJobPostingMethod] = useState<JobPostingMethods>(JobPostingMethods.fromPreviousPost);
    const {employer} = useEmployer();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!employer?.hasPostedFirstJob){
            navigate(EmployerPagesPaths.ADD_JOB_BASICS)
        }
        setLoading(false);
    }, []);
    
    function handleFromPreviousJobPostClick() {
        setJobPostingMethod(JobPostingMethods.fromPreviousPost);
    }

    function handleNewTemplateClick() {
        setJobPostingMethod(JobPostingMethods.newTemplate);
    }

    function handleCreateJobClick(e: FormEvent) {
        e.preventDefault();
        if (jobPostingMethod === JobPostingMethods.newTemplate){
            navigate(EmployerPagesPaths.ADD_JOB_BASICS);
        }
    }

    return (
        loading ? <LoadingPage/> :
            <div className={"employers-centralized-page-layout"}>
                <PageTitleWithImage imageElement={<PeopleInAnOffice/>} title={"Create a job post"}/>
                <div className={"emp-form-fb"}>
                    <form className={"emp-form"}>
                        <div className={"small-title horizontal-title"}>
                            <span>How would you like to post your job?</span>
                            <span className={"error-text"}>&nbsp;*</span>
                        </div>
                        <div className={"radio-input-info mb1rem"} onClick={handleFromPreviousJobPostClick}>
                            <input
                                type={"radio"}
                                className={"custom-radio-input"}
                                checked={jobPostingMethod === JobPostingMethods.fromPreviousPost}
                                onChange={handleFromPreviousJobPostClick}
                            >
                            </input>
                            <div className={"create-job-option-text"}>
                                <span className={"dark-default-text"}>Use a previous job as a template</span>
                                <span className={"light-dark-small-text"}>Save time by copying a previous job post</span>
                            </div>

                        </div>
                        <div className={"radio-input-info"} onClick={handleNewTemplateClick}>
                            <input
                                type={"radio"}
                                className={"custom-radio-input"}
                                checked={jobPostingMethod === JobPostingMethods.newTemplate}
                                onChange={handleNewTemplateClick}
                            >
                            </input>
                            <div className={"create-job-option-text"}>
                                <span className={"dark-default-text"}>Create a new post</span>
                                <span className={"light-dark-small-text"}>We'll offer smart tips along the way.</span>
                            </div>
                        </div>
                        <button 
                            className={"blue-button br-corner-button mt2rem"}
                            onClick={handleCreateJobClick}
                        >
                            Continue
                            <FontAwesomeIcon className={"svg125rem ml05rem"} icon={faArrowRightLong}/>
                        </button>
                    </form>
                </div>
            </div>
    )
}

export default JobPostingComponent;
