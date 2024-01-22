import React, { FC } from 'react';
import EditEducationComponent from "./PageComponents/EditEducationComponent/EditEducationComponent";

interface EditEducationPageProps {}

const EditEducationPage: FC<EditEducationPageProps> = () => (
  <EditEducationComponent nextPagePath={"/build/education"}/>
);

export default EditEducationPage;
