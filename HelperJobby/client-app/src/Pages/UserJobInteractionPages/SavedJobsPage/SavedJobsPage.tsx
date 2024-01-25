import React, { FC } from 'react';
import SavedJobsComponent from "./PageComponents/SavedJobsComponent/SavedJobsComponent";

interface SavedJobsPageProps {}

const SavedJobsPage: FC<SavedJobsPageProps> = () => (
  <SavedJobsComponent/>
);

export default SavedJobsPage;
