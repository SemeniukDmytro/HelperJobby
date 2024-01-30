import React, {FC, useEffect, useState} from 'react';
import './EditEducationComponent.scss';
import {EducationDTO} from "../../../../../DTOs/resumeRelatedDTOs/EducationDTO";
import {useNavigate, useParams} from "react-router-dom";
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import EducationInfoComponent from "../../../SharedComponents/EducationInfoComponent/EducationInfoComponent";
import {getResumeInfoPageParentPath} from "../../../../../utils/getResumeInfoPageParentPath";

interface EditEducationComponentProps {
}

const EditEducationComponent: FC<EditEducationComponentProps> = () => {
    const [education, setEducation] = useState<EducationDTO | null>(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const {jobSeeker} = useJobSeeker();
    const [loading, setLoading] = useState(true);
    const [parentPagePath, setParentPagePath] = useState("");

    useEffect(() => {
        const currentPath = window.location.pathname;
        let parentPathFirstPart = getResumeInfoPageParentPath(currentPath);
        if (parentPathFirstPart == "/build") {
            parentPathFirstPart = "/build/education"
        }
        setParentPagePath(parentPathFirstPart);
    }, []);

    useEffect(() => {
        if (parentPagePath) {
            if (!id) {
                navigate(parentPagePath)
                return;
            }
            const education = jobSeeker?.resume?.educations
                .find((ed) => ed.id == Number.parseInt(id))
            if (!education) {
                navigate(parentPagePath)
                return;
            }
            setEducation(education);
            setLoading(false);
        }
    }, [parentPagePath]);


    return (
        loading ? <></>
            :
            <EducationInfoComponent education={education!}></EducationInfoComponent>
    )
}

export default EditEducationComponent;
