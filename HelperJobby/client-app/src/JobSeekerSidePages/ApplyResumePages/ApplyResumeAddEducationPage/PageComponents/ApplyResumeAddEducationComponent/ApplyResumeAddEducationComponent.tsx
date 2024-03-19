import React, {FC} from 'react';
import './ApplyResumeAddEducationComponent.scss';
import EducationInfoComponent
    from "../../../../BuildResumePages/SharedComponents/EducationInfoComponent/EducationInfoComponent";
import ApplyResumePagesHeader from "../../../SharedComponents/ApplyResumePagesHeader/ApplyResumePagesHeader";

interface ApplyResumeAddEducationComponentProps {
}

const ApplyResumeAddEducationComponent: FC<ApplyResumeAddEducationComponentProps> = () => (
    <ApplyResumePagesHeader>
        <div className={"light-dark-small-text"}>
            Build your resume (1 of 4);
        </div>
        <EducationInfoComponent/>
    </ApplyResumePagesHeader>
);

export default ApplyResumeAddEducationComponent;
