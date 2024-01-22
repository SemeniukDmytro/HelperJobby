import React, { FC } from 'react';
import EducationInfoComponent from "../SharedComponents/EducationInfoComponent/EducationInfoComponent";

interface AddEducationPageProps {}

const AddEducationPage: FC<AddEducationPageProps> = () => (
  <EducationInfoComponent nextPagePath={"build/education"}/>
);

export default AddEducationPage;
