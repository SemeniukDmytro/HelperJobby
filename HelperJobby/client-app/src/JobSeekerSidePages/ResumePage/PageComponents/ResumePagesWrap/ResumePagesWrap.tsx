import React, {FC} from 'react';
import './ResumePagesWrap.scss';
import {ApplyResumeProvider} from "../../../../contexts/ApplyResumeContext";
import {Outlet} from "react-router-dom";

interface ResumePagesWrapProps {
}

const ResumePagesWrap: FC<ResumePagesWrapProps> = () => (
    <ApplyResumeProvider>
        <Outlet/>
    </ApplyResumeProvider>
);

export default ResumePagesWrap;
