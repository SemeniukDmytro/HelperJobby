import React, { FC } from 'react';
import EditWorkExperienceComponent from "./PageComponents/EditWorkExperienceComponent/EditWorkExperienceComponent";

interface EditWorkExperiencePageProps {}

const EditWorkExperiencePage: FC<EditWorkExperiencePageProps> = () => (
  <EditWorkExperienceComponent nextPagePath={"/build/experience"}/>
);

export default EditWorkExperiencePage;
