import React, {FC, useEffect} from 'react';
import './EducationComponent.scss';
import {ProgressPercentPerPage} from "../../../SharedComponents/ProgressPercentPerPage";
import EducationReview from "../EducationReview/EducationReview";
import {useLocation, useNavigate} from "react-router-dom";
import "../../../../../Assets/scssSharedStyles/DefaultButtons.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useJobSeeker} from "../../../../../hooks/contextHooks/useJobSeeker";
import useResumeBuild from "../../../../../hooks/contextHooks/useResumeBuild";
import useCurrentJobApplication from "../../../../../hooks/contextHooks/useCurrentJobApplication";

interface ResumeEducationComponentProps {
}

const EducationComponent: FC<ResumeEducationComponentProps> = () => {
    const {setProgressPercentage, setSaveFunc} = useResumeBuild();
    const {jobSeeker} = useJobSeeker();
    const navigate = useNavigate();
    const location = useLocation();
    const addEducationPath = location.pathname.includes("/apply-resume") ? "/apply-resume/education/add" : "/build/education/add";
    const {job} = useCurrentJobApplication();

    useEffect(() => {
        if (!jobSeeker?.resume || jobSeeker.resume.educations.length == 0) {
            navigate(addEducationPath);
            return;
        }
        setProgressPercentage(ProgressPercentPerPage * 4);
        setSaveFunc(() => customSaveFunc)
    }, []);

    function addAnotherEducation() {
        navigate(addEducationPath)
    }

    async function customSaveFunc() {
        let nextPagePath = "/my-profile";
        if (addEducationPath.includes("/apply-resume") && job) {
            nextPagePath = `job-apply/${job.id}/resume`
        }
        navigate(nextPagePath)
    }

    function navigateToWorkExperiencePage() {
        if (location.pathname.includes("/apply-resume")) {
            navigate("/apply-resume/experience")
        } else {
            navigate("/build/experience")
        }
    }

    return (
        jobSeeker?.resume == null ? <></> :
            <>
                <div className={"build-page-header"}>
                    Review education
                </div>
                {jobSeeker!.resume!.educations.length > 0 &&
                    <div>
                        {jobSeeker!.resume!.educations.map((education, index) => (
                            <EducationReview key={index} education={education}/>
                        ))}
                    </div>
                }
                <div className={"form-and-buttons-divider"}>
                    <button className={"light-button-with-margin"} onClick={addAnotherEducation}>
                        <FontAwesomeIcon className={"icon-right-margin svg125rem"} icon={faPlus}/>
                        <span>Add another education</span>
                    </button>
                </div>
                <div className={"form-and-buttons-divider"} onClick={navigateToWorkExperiencePage}>
                    <button className={"blue-button"}>
                        Continue
                    </button>
                </div>
                <div className={"bottom-page-margin"}/>
            </>
    )
}

export default EducationComponent;
