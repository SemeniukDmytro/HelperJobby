import React, { FC } from 'react';
import ResumeInfoComponent from "../../../Components/ResumeInfoComponent/ResumeInfoComponent";
import PreviewResumeComponent from "./PageComponents/PreviewResumeComponent/PreviewResumeComponent";

interface PreviewPageProps {}

const PreviewPage: FC<PreviewPageProps> = () => (
    <PreviewResumeComponent/>
);

export default PreviewPage;
