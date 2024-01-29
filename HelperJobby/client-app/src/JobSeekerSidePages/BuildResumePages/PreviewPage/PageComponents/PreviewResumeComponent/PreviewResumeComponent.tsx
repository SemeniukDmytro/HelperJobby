import React, { FC } from 'react';
import './PreviewResumeComponent.scss';
import ResumePreviewHeader from "../ResumePreviewHeader/ResumePreviewHeader";
import ResumeInfoComponent from "../../../../../Components/ResumeInfoComponent/ResumeInfoComponent";

interface PreviewResumeComponentProps {}

const PreviewResumeComponent: FC<PreviewResumeComponentProps> = () => (
  <>
      <ResumePreviewHeader/>
      <ResumeInfoComponent/>
  </>
);

export default PreviewResumeComponent;
