import React, {FC, useEffect} from 'react';
import './ResumeEducationComponent.scss';
import useResumeBuild from "../../../../../hooks/useResumeBuild";
import {ProgressPercentPerPage} from "../../../SharedComponents/ProgressPercentPerPage";
import EducationReview from "../EducationReview/EducationReview";
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import {useNavigate} from "react-router-dom";
import "../../../../../Assets/scssSharedStyles/DefaultButtons.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

interface ResumeEducationComponentProps {}

const ResumeEducationComponent: FC<ResumeEducationComponentProps> = () => {
    const {setProgressPercentage} = useResumeBuild();
    const {jobSeeker} = useJobSeeker();
    const navigate = useNavigate();

    useEffect(() => {
        if (jobSeeker!.resume!.educations.length == 0){
            navigate("/build/education/add")
        }
        setProgressPercentage(ProgressPercentPerPage * 4)
    }, []);

    function addAnotherEducation() {
        
    }

    return (
        <>
            <div className={"build-page-header"}>
                Review education
            </div>
            {jobSeeker!.resume!.educations.length > 0 &&
                <div className={"education-reviews"}>
                    {jobSeeker!.resume!.educations.map((education, index) => (
                        <EducationReview key={index} education={education}/>
                    )) }
                </div>
            }
            <div className={"reviews-and-buttons-divider"}>
                <button className={"light-button"} onClick={addAnotherEducation}>
                    <FontAwesomeIcon className={"icon-right-margin"} icon={faPlus}/>
                    <span>Add another education</span>
                </button>
            </div>
            <div className={"reviews-and-buttons-divider"}>
                <button className={"blue-button"}>
                    Continue
                </button>
            </div>
        </>
    )
}

export default ResumeEducationComponent;
