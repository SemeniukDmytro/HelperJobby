import React, {FC, useEffect} from 'react';
import './EducationComponent.scss';
import useResumeBuild from "../../../../../hooks/useResumeBuild";
import {ProgressPercentPerPage} from "../../../SharedComponents/ProgressPercentPerPage";
import EducationReview from "../EducationReview/EducationReview";
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import {useNavigate} from "react-router-dom";
import "../../../../../Assets/scssSharedStyles/DefaultButtons.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

interface ResumeEducationComponentProps {}

const EducationComponent: FC<ResumeEducationComponentProps> = () => {
    const {setProgressPercentage, setSaveFunc} = useResumeBuild();
    const {jobSeeker} = useJobSeeker();
    const navigate = useNavigate();

    useEffect(() => {
        if (jobSeeker?.resume == null){
            navigate("/build/education/add")
        }
        if (jobSeeker!.resume!.educations.length == 0){
            navigate("/build/education/add")
        }
        setProgressPercentage(ProgressPercentPerPage * 4);
        setSaveFunc(() => customSaveFunc)
    }, []);

    function addAnotherEducation() {
        navigate("/build/education/add")
    }
    
    async function customSaveFunc(){
        navigate("my-profile")
    }

    function navigateToWorkExperiencePage() {
        navigate("/build/experience")
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
                    )) }
                </div>
            }
            <div className={"form-and-buttons-divider"}>
                <button className={"light-button"} onClick={addAnotherEducation}>
                    <FontAwesomeIcon className={"icon-right-margin"} icon={faPlus}/>
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
