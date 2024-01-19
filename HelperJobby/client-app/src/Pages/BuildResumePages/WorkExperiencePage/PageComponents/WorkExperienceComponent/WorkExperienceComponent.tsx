import React, {FC, useEffect} from 'react';
import './WorkExperienceComponent.scss';
import useResumeBuild from "../../../../../hooks/useResumeBuild";
import {ProgressPercentPerPage} from "../../../SharedComponents/ProgressPercentPerPage";
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import {useNavigate} from "react-router-dom";

interface WorkExperienceComponentProps {}

const WorkExperienceComponent: FC<WorkExperienceComponentProps> = () => {
    const {setProgressPercentage} = useResumeBuild();
    const {jobSeeker} = useJobSeeker();
    const navigate = useNavigate();
    
    useEffect(() => {
        setProgressPercentage(ProgressPercentPerPage * 5);
        if (jobSeeker?.resume!.workExperiences.length == 0){
            navigate("/build/experience/add")
        }
    }, []);
    
    return (
        <div>
            
        </div>
    )
}

export default WorkExperienceComponent;
