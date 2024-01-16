import React, {FC, useEffect} from 'react';
import './ResumeEducationComponent.scss';
import useResumeBuild from "../../../../../hooks/useResumeBuild";
import {ProgressPercentPerPage} from "../../../SharedComponents/ProgressPercentPerPage";
import EducationReview from "../EducationReview/EducationReview";
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import {useNavigate} from "react-router-dom";

interface ResumeEducationComponentProps {}

const ResumeEducationComponent: FC<ResumeEducationComponentProps> = () => {
    const {setProgressPercentage} = useResumeBuild();
    const {jobSeeker} = useJobSeeker();
    const navigate = useNavigate();

    useEffect(() => {
        if (jobSeeker?.resume.educations.length == 0){
            navigate("/build/education/add")
        }
        setProgressPercentage(ProgressPercentPerPage * 4)
    }, []);
    
    return (
        <>
            <div className={"build-page-header"}>
                Review education
            </div>
            {jobSeeker!.resume.educations.length > 0 &&
                <div className={"education-reviews"}>
                    <EducationReview education={jobSeeker!.resume.educations[0]}/>
                </div>
            }
        </>
    )
}

export default ResumeEducationComponent;
