import React, { FC } from 'react';
import './ApplyResumeEducationComponent.scss';
import ApplyResumePagesHeader from "../../../SharedComponents/ApplyResumePagesHeader/ApplyResumePagesHeader";
import EducationComponent
    from "../../../../BuildResumePages/EducationPage/PageComponents/EducationComponent/EducationComponent";

interface ApplyResumeEducationComponentProps {}

const ApplyResumeEducationComponent: FC<ApplyResumeEducationComponentProps> = () => {
    
    return (
        <ApplyResumePagesHeader>
            <EducationComponent/>
        </ApplyResumePagesHeader>
    )
}
export default ApplyResumeEducationComponent;
