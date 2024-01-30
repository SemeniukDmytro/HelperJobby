import React, {FC} from 'react';
import './ResumeEditWorkExperienceComponent.scss';
import PreviewPagesHeader from "../../../SharedComponents/ResumeInfoPagesHeader/ResumeInfoPagesHeader";
import EditWorkExperienceComponent
    from "../../../../BuildResumePages/EditWorkExperiencePage/PageComponents/EditWorkExperienceComponent/EditWorkExperienceComponent";

interface ResumeEditWorkExperienceComponentProps {
}

const ResumeEditWorkExperienceComponent: FC<ResumeEditWorkExperienceComponentProps> = () => (
    <PreviewPagesHeader>
        <EditWorkExperienceComponent/>
    </PreviewPagesHeader>
);

export default ResumeEditWorkExperienceComponent;
