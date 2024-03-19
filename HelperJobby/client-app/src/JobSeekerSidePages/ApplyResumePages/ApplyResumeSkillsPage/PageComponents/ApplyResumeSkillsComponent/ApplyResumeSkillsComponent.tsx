import React, {FC} from 'react';
import './ApplyResumeSkillsComponent.scss';
import ApplyResumePagesHeader from "../../../SharedComponents/ApplyResumePagesHeader/ApplyResumePagesHeader";
import SkillsComponent from "../../../../BuildResumePages/SkillsPage/PageComponents/SkillsComponent/SkillsComponent";

interface ApplyResumeSkillsComponentProps {
}

const ApplyResumeSkillsComponent: FC<ApplyResumeSkillsComponentProps> = () => (
    <ApplyResumePagesHeader>
        <div className={"light-dark-small-text"}>
            Build your resume (3 of 4);
        </div>
        <SkillsComponent/>
    </ApplyResumePagesHeader>
);

export default ApplyResumeSkillsComponent;
