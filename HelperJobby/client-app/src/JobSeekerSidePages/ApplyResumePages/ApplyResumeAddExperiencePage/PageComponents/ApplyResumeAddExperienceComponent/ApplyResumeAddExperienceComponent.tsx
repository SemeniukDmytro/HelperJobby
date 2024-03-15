import React, { FC } from 'react';
import './ApplyResumeAddExperienceComponent.scss';
import EducationInfoComponent
    from "../../../../BuildResumePages/SharedComponents/EducationInfoComponent/EducationInfoComponent";
import ApplyResumePagesHeader from "../../../SharedComponents/ApplyResumePagesHeader/ApplyResumePagesHeader";
import WorkExperienceInfoComponent
    from "../../../../BuildResumePages/SharedComponents/WorkExperienceInfoComponent/WorkExperienceInfoComponent";

interface ApplyResumeAddExperienceComponentProps {}

const ApplyResumeAddExperienceComponent: FC<ApplyResumeAddExperienceComponentProps> = () => (
    <ApplyResumePagesHeader>
        <div className={"light-dark-small-text"}>
            Build your resume (2 of 4);
        </div>
        <WorkExperienceInfoComponent/>
    </ApplyResumePagesHeader>
);

export default ApplyResumeAddExperienceComponent;
