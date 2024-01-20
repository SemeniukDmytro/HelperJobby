import React, {FC, useEffect, useState} from 'react';
import './EditWorkExperienceComponent.scss';
import {useNavigate, useParams} from "react-router-dom";
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import {WorkExperienceDTO} from "../../../../../DTOs/resumeRelatedDTOs/WorkExperienceDTO";
import WorkExperienceInfoComponent
    from "../../../SharedComponents/WorkExperienceInfoComponent/WorkExperienceInfoComponent";

interface EditWorkExperienceComponentProps {}

const EditWorkExperienceComponent: FC<EditWorkExperienceComponentProps> = () => {
    const [workExperience, setWorkExperience] = useState<WorkExperienceDTO | null>(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const {jobSeeker} = useJobSeeker();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id){
            navigate("/build/experience")
            return;
        }
        const workExperience = jobSeeker?.resume?.workExperiences
            .find((we) => we.workExperienceId == Number.parseInt(id))
        if (!workExperience){
            navigate("/build/experience")
            return;
        }
        setWorkExperience(workExperience);
        setLoading(false);
    }, []);


    return(
        loading ? <></>
            :
            <WorkExperienceInfoComponent workExperience={workExperience!}/>
    )
}

export default EditWorkExperienceComponent;
