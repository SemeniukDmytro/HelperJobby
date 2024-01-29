import React, { FC } from 'react';
import {ResumeContextProvider} from "../../../contexts/ResumeContext";
import BuildResumeLayout from "../SharedComponents/BuildResumeLayout/BuildResumeLayout";

interface BuildResumePageProps {}

const BuildResumePage: FC<BuildResumePageProps> = () => (
  <ResumeContextProvider>
      <BuildResumeLayout/>
  </ResumeContextProvider>
);

export default BuildResumePage;
