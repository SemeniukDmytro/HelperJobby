import React, { FC } from 'react';
import './ResumeEditEducationComponent.scss';
import PreviewPagesHeader from "../../../SharedComponents/ResumeInfoPagesHeader/ResumeInfoPagesHeader";
import EditEducationComponent
    from "../../../../BuildResumePages/EditEducationPage/PageComponents/EditEducationComponent/EditEducationComponent";

interface ResumeEditEducationComponentProps {}

const ResumeEditEducationComponent: FC<ResumeEditEducationComponentProps> = () => (
  <PreviewPagesHeader>
      <EditEducationComponent/>
  </PreviewPagesHeader>
);

export default ResumeEditEducationComponent;
