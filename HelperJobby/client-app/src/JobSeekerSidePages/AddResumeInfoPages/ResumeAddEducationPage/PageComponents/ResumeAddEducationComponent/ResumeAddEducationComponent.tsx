import React, {FC} from 'react';
import './ResumeAddEducationComponent.scss';
import EducationInfoComponent
    from "../../../../BuildResumePages/SharedComponents/EducationInfoComponent/EducationInfoComponent";
import ResumeInfoPagesHeader from "../../../SharedComponents/ResumeInfoPagesHeader/ResumeInfoPagesHeader";

interface AddEducationComponentProps {
}

const ResumeAddEducationComponent: FC<AddEducationComponentProps> = () => (
    <ResumeInfoPagesHeader>
        <EducationInfoComponent/>
    </ResumeInfoPagesHeader>
);

export default ResumeAddEducationComponent;
