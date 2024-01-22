import React, { FC } from 'react';
import WorkExperienceInfoComponent from "../SharedComponents/WorkExperienceInfoComponent/WorkExperienceInfoComponent";

interface AddWorkExperiencePageProps {}


const AddWorkExperiencePage: FC<AddWorkExperiencePageProps> = () => (
  <WorkExperienceInfoComponent nextPagePath={"build/experience"}/>
);

export default AddWorkExperiencePage;
