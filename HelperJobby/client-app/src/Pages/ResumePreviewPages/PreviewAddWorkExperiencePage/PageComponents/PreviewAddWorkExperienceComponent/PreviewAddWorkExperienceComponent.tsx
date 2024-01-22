import React, { FC } from 'react';
import './PreviewAddWorkExperienceComponent.scss';
import PreviewPagesHeader from "../../../SharedComponents/PreviewPagesHeader/PreviewPagesHeader";
import WorkExperienceInfoComponent
    from "../../../../BuildResumePages/SharedComponents/WorkExperienceInfoComponent/WorkExperienceInfoComponent";

interface PreviewAddWorkExperienceComponentProps {}

const PreviewAddWorkExperienceComponent: FC<PreviewAddWorkExperienceComponentProps> = () => (
    <PreviewPagesHeader>
        <WorkExperienceInfoComponent nextPagePath={"/build/preview"}/>
    </PreviewPagesHeader>
);

export default PreviewAddWorkExperienceComponent;
