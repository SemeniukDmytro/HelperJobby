import React, { FC } from 'react';
import './PreviewAddEducationComponent.scss';
import PreviewPagesHeader from "../../../SharedComponents/PreviewPagesHeader/PreviewPagesHeader";
import EducationInfoComponent
    from "../../../../BuildResumePages/SharedComponents/EducationInfoComponent/EducationInfoComponent";

interface PreviewAddEducationComponentProps {}

const PreviewAddEducationComponent: FC<PreviewAddEducationComponentProps> = () => (
  <PreviewPagesHeader>
      <EducationInfoComponent nextPagePath={"/build/preview"}/>
  </PreviewPagesHeader>
);

export default PreviewAddEducationComponent;
