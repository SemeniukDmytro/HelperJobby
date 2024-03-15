import React, { FC } from 'react';
import './ApplyResumeExperienceComponent.scss';
import ApplyResumePagesHeader from "../../../SharedComponents/ApplyResumePagesHeader/ApplyResumePagesHeader";
import WorkExperienceComponent
    from "../../../../BuildResumePages/WorkExperiencePage/PageComponents/WorkExperienceComponent/WorkExperienceComponent";

interface ApplyResumeExperienceComponentProps {}

const ApplyResumeExperienceComponent: FC<ApplyResumeExperienceComponentProps> = () => (
    <ApplyResumePagesHeader>
        <WorkExperienceComponent/>
    </ApplyResumePagesHeader>
);

export default ApplyResumeExperienceComponent;
