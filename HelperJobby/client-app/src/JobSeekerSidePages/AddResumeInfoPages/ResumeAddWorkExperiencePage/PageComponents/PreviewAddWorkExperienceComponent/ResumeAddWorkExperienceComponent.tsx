import React, { FC } from 'react';
import './ResumeAddWorkExperienceComponent.scss';
import PreviewPagesHeader from "../../../SharedComponents/ResumeInfoPagesHeader/ResumeInfoPagesHeader";
import WorkExperienceInfoComponent
    from "../../../../BuildResumePages/SharedComponents/WorkExperienceInfoComponent/WorkExperienceInfoComponent";

interface PreviewAddWorkExperienceComponentProps {
}

const ResumeAddWorkExperienceComponent: FC<PreviewAddWorkExperienceComponentProps> = () => (
    <PreviewPagesHeader>
        <WorkExperienceInfoComponent/>
    </PreviewPagesHeader>
);

export default ResumeAddWorkExperienceComponent;
