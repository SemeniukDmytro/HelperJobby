import React, { FC } from 'react';
import AddSkillComponent from "../SharedComponents/AddSkillComponent/AddSkillComponent";
import {ResumeBuildContextProvider} from "../../../contexts/ResumeBuildContext";

interface AddSkillPageProps {}

const PreviewAddSkillPage: FC<AddSkillPageProps> = () => (
    <ResumeBuildContextProvider>
        <AddSkillComponent/>
    </ResumeBuildContextProvider>
);

export default PreviewAddSkillPage;
