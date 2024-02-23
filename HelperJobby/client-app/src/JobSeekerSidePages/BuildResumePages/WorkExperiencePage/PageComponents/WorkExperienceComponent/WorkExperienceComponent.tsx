import React, {FC, useEffect} from 'react';
import './WorkExperienceComponent.scss';
import useResumeBuild from "../../../../../hooks/useResumeBuild";
import {ProgressPercentPerPage} from "../../../SharedComponents/ProgressPercentPerPage";
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import {useNavigate} from "react-router-dom";
import WorkExperienceReview from "../WorkExperienceReview/WorkExperienceReview";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

interface WorkExperienceComponentProps {
}

const WorkExperienceComponent: FC<WorkExperienceComponentProps> = () => {
    const {setProgressPercentage, setSaveFunc} = useResumeBuild();
    const {jobSeeker} = useJobSeeker();
    const navigate = useNavigate();

    useEffect(() => {
        setProgressPercentage(ProgressPercentPerPage * 5);
        if (!jobSeeker?.resume){
            navigate("/build/experience/add");
            return;
        }
        if (jobSeeker?.resume.workExperiences.length == 0) {
            navigate("/build/experience/add");
            return;
        }
        setSaveFunc(() => customSaveFunc)
    }, []);

    async function customSaveFunc() {
        navigate("/my-profile")
    }

    function navigateSkillsPage() {
        navigate("/build/skills")

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
                        <span>Add another education</span>
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
