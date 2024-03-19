import React, {FC, useEffect} from 'react';
import './WorkExperienceComponent.scss';
import {ProgressPercentPerPage} from "../../../SharedComponents/ProgressPercentPerPage";
import {useLocation, useNavigate} from "react-router-dom";
import WorkExperienceReview from "../WorkExperienceReview/WorkExperienceReview";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import useResumeBuild from "../../../../../hooks/contextHooks/useResumeBuild";
import {useJobSeeker} from "../../../../../hooks/contextHooks/useJobSeeker";
import useCurrentJobApplication from "../../../../../hooks/contextHooks/useCurrentJobApplication";

interface WorkExperienceComponentProps {
}

const WorkExperienceComponent: FC<WorkExperienceComponentProps> = () => {
    const {setProgressPercentage, setSaveFunc} = useResumeBuild();
    const {jobSeeker} = useJobSeeker();
    const navigate = useNavigate();
    const location = useLocation();
    const addExperiencePath = location.pathname.includes("/apply-resume") ?
        "/apply-resume/experience/add" : "/build/experience/add";
    const {job} = useCurrentJobApplication();

    useEffect(() => {
        setProgressPercentage(ProgressPercentPerPage * 5);
        if (!jobSeeker?.resume || jobSeeker?.resume.workExperiences.length == 0) {
            navigate(addExperiencePath);
            return;
        }
        setSaveFunc(() => customSaveFunc)
    }, []);

    async function customSaveFunc() {
        let nextPagePath = "/my-profile";
        if (addExperiencePath.includes("/apply-resume") && job) {
            nextPagePath = `job-apply/${job.id}/resume`
        }
        navigate(nextPagePath)
    }

    function navigateSkillsPage() {
        if (location.pathname.includes("/apply-resume")) {
            navigate("/apply-resume/skills")
        } else {
            navigate("/build/skills")
        }

    }

    function addAnotherWorkExperience() {
        navigate("/build/experience/add")
    }

    return (
        jobSeeker?.resume == null ? <></> :
            <>
                <div className={"build-page-header"}>
                    Review work experience
                </div>
                {jobSeeker!.resume!.workExperiences.length > 0 &&
                    <div>
                        {jobSeeker!.resume!.workExperiences.map((workExperience, index) => (
                            <WorkExperienceReview key={index} workExperience={workExperience}/>
                        ))}
                    </div>
                }
                <div className={"form-and-buttons-divider"}>
                    <button className={"light-button-with-margin"} onClick={addAnotherWorkExperience}>
                        <FontAwesomeIcon className={"icon-right-margin"} icon={faPlus}/>
                        <span>Add another experience</span>
                    </button>
                </div>
                <div className={"form-and-buttons-divider"} onClick={navigateSkillsPage}>
                    <button className={"blue-button"}>
                        Continue
                    </button>
                </div>
                <div className={"bottom-page-margin"}/>

            </>
    )
}

export default WorkExperienceComponent;
