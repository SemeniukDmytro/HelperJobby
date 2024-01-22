import React, {FC, useEffect, useState} from 'react';
import './EditWorkExperienceComponent.scss';
import {useNavigate, useParams} from "react-router-dom";
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import {WorkExperienceDTO} from "../../../../../DTOs/resumeRelatedDTOs/WorkExperienceDTO";
import WorkExperienceInfoComponent
    from "../../../SharedComponents/WorkExperienceInfoComponent/WorkExperienceInfoComponent";

interface EditWorkExperienceComponentProps {
    nextPagePath : string
}

const EditWorkExperienceComponent: FC<EditWorkExperienceComponentProps> = ({nextPagePath}) => {
    const [workExperience, setWorkExperience] = useState<WorkExperienceDTO | null>(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const {jobSeeker} = useJobSeeker();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id){
            navigate(nextPagePath)
            return;
        }
        const workExperience = jobSeeker?.resume?.workExperiences
            .find((we) => we.workExperienceId == Number.parseInt(id))
        if (!workExperience){
            navigate(nextPagePath)
            return;
        }
        setWorkExperience(workExperience);
        setLoading(false);
    }, []);


    return(
        loading ? <></>
            :
            <WorkExperienceInfoComponent workExperience={workExperience!} nextPagePath={nextPagePath}/>
    )
}

export default EditWorkExperienceComponent;
