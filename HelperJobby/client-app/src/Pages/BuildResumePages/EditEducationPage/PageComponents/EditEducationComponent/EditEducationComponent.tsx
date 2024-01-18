import React, {FC, useEffect, useState} from 'react';
import './EditEducationComponent.scss';
import {EducationDTO} from "../../../../../DTOs/resumeRelatedDTOs/EducationDTO";
import {useNavigate, useParams} from "react-router-dom";
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import EducationInfoComponent from "../../../SharedComponents/EducationInfoComponent/EducationInfoComponent";

interface EditEducationComponentProps {}

const EditEducationComponent: FC<EditEducationComponentProps> = () => {
    const [education, setEducation] = useState<EducationDTO | null>(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const {jobSeeker} = useJobSeeker();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (!id){
            navigate("/build/education")
            return;
        }
        console.log(jobSeeker);
        const education = jobSeeker?.resume?.educations
            .find((ed) => ed.id == Number.parseInt(id))
        if (!education){
            navigate("/build/education")
            return;
        }
        setEducation(education);
        setLoading(false);
    }, []);
    
    
    return(
        loading ? <></>
            :
            <EducationInfoComponent education={education!}></EducationInfoComponent>
    )
}

export default EditEducationComponent;
