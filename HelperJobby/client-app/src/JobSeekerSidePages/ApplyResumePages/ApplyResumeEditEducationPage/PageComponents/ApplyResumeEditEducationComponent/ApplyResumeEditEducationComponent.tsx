import React, { FC } from 'react';
import './ApplyResumeEditEducationComponent.scss';
import ApplyResumePagesHeader from "../../../SharedComponents/ApplyResumePagesHeader/ApplyResumePagesHeader";
import EditEducationComponent
    from "../../../../BuildResumePages/EditEducationPage/PageComponents/EditEducationComponent/EditEducationComponent";

interface ApplyResumeEditEducationComponentProps {}

const ApplyResumeEditEducationComponent: FC<ApplyResumeEditEducationComponentProps> = () => (
    <ApplyResumePagesHeader>
        <EditEducationComponent/>
    </ApplyResumePagesHeader>
);

export default ApplyResumeEditEducationComponent;
