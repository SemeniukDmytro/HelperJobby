import React, { FC } from 'react';
import './ResumePreviewHeader.scss';

interface ResumePreviewHeaderProps {}

const ResumePreviewHeader: FC<ResumePreviewHeaderProps> = () => (
  <>
      <div className={"build-page-header subtitle-margin"}>
          Is your resume ready?
      </div>
      <div className={"build-page-subtitle"}>
          Review and make any changes below.
      </div>
      <div className={"resume-content-separation-line"}/>
  </>
);

export default ResumePreviewHeader;
