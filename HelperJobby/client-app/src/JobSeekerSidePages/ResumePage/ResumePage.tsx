import React, {FC} from 'react';
import ResumeComponent from "./PageComponents/ResumeComponent/ResumeComponent";
import {ResumeContextProvider} from "../../contexts/ResumeContext";

interface ResumePageProps {
}

const ResumePage: FC<ResumePageProps> = () => (
    <ResumeContextProvider>
        <ResumeComponent/>
    </ResumeContextProvider>
);

export default ResumePage;
