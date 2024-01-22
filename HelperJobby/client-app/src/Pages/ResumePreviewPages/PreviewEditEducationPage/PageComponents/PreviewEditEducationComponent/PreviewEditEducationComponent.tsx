import React, { FC } from 'react';
import './PreviewEditEducationComponent.scss';
import PreviewPagesHeader from "../../../SharedComponents/PreviewPagesHeader/PreviewPagesHeader";
import EditEducationComponent
    from "../../../../BuildResumePages/EditEducationPage/PageComponents/EditEducationComponent/EditEducationComponent";

interface PreviewEditEducationComponentProps {}

const PreviewEditEducationComponent: FC<PreviewEditEducationComponentProps> = () => (
  <PreviewPagesHeader>
      <EditEducationComponent nextPagePath={"/build/preview"}/>
  </PreviewPagesHeader>
);

export default PreviewEditEducationComponent;
