import React, { FC } from 'react';
import {ResumeBuildContextProvider} from "../../../contexts/ResumeBuildContext";
import BuildResumeLayout from "../SharedComponents/BuildResumeLayout/BuildResumeLayout";

interface BuildResumePageProps {}

const BuildResumePage: FC<BuildResumePageProps> = () => (
  <ResumeBuildContextProvider>
      <BuildResumeLayout/>
  </ResumeBuildContextProvider>
);

export default BuildResumePage;
