import React, {FC, useEffect, useState} from 'react';
import './EditWorkExperienceComponent.scss';
import {useNavigate, useParams} from "react-router-dom";
import {WorkExperienceDTO} from "../../../../../DTOs/resumeRelatedDTOs/WorkExperienceDTO";
import WorkExperienceInfoComponent
    from "../../../SharedComponents/WorkExperienceInfoComponent/WorkExperienceInfoComponent";
import {getResumeInfoPageParentPath} from "../../../../../utils/getResumeInfoPageParentPath";
import {useJobSeeker} from "../../../../../hooks/contextHooks/useJobSeeker";

interface EditWorkExperienceComponentProps {
}

const EditWorkExperienceComponent: FC<EditWorkExperienceComponentProps> = () => {
    const [workExperience, setWorkExperience] = useState<WorkExperienceDTO | null>(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const {jobSeeker} = useJobSeeker();
    const [loading, setLoading] = useState(true);
    const [parentPagePath, setParentPagePath] = useState("");

    useEffect(() => {
        const currentPath = window.location.pathname;
        let parentPathFirstPart = getResumeInfoPageParentPath(currentPath);
        if (parentPathFirstPart == "/build") {
            parentPathFirstPart = "/build/experience"
        }
        setParentPagePath(parentPathFirstPart);
    }, []);

    useEffect(() => {
        if (parentPagePath) {
            if (!id) {
                navigate(parentPagePath)
                return;
            }
            const workExperience = jobSeeker?.resume?.workExperiences
                .find((we) => we.id == Number.parseInt(id))
            if (!workExperience) {
                navigate(parentPagePath)
                return;
            }
            setWorkExperience(workExperience);
            setLoading(false);
        }
    }, [parentPagePath]);


    return (
        loading ? <></>
            :
            <WorkExperienceInfoComponent workExperience={workExperience!}/>
    )
}

export default EditWorkExperienceComponent;
