import React, { FC } from 'react';
import './PreviewEditWorkExperienceComponent.scss';
import PreviewPagesHeader from "../../../SharedComponents/PreviewPagesHeader/PreviewPagesHeader";
import EditWorkExperienceComponent
    from "../../../../BuildResumePages/EditWorkExperiencePage/PageComponents/EditWorkExperienceComponent/EditWorkExperienceComponent";

interface PreviewEditWorkExperienceComponentProps {}

const PreviewEditWorkExperienceComponent: FC<PreviewEditWorkExperienceComponentProps> = () => (
  <PreviewPagesHeader>
      <EditWorkExperienceComponent nextPagePath={"/build/preview"}/>
  </PreviewPagesHeader>
);

export default PreviewEditWorkExperienceComponent;
