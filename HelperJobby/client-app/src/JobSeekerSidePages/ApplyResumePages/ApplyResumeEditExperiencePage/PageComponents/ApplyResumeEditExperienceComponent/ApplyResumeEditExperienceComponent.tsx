import React, { FC } from 'react';
import './ApplyResumeEditExperienceComponent.scss';
import ApplyResumePagesHeader from "../../../SharedComponents/ApplyResumePagesHeader/ApplyResumePagesHeader";
import EditWorkExperienceComponent
    from "../../../../BuildResumePages/EditWorkExperiencePage/PageComponents/EditWorkExperienceComponent/EditWorkExperienceComponent";

interface ApplyResumeEditExperienceComponentProps {}

const ApplyResumeEditExperienceComponent: FC<ApplyResumeEditExperienceComponentProps> = () => (
    <ApplyResumePagesHeader>
        <EditWorkExperienceComponent/>
    </ApplyResumePagesHeader>
);

export default ApplyResumeEditExperienceComponent;
