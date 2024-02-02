import React, { FC } from 'react';
import JobDetailsComponent from "./PageComponents/JobDetailsComponent/JobDetailsComponent";

interface JobDetailsPageProps {}

const JobDetailsPage: FC<JobDetailsPageProps> = () => (
  <JobDetailsComponent/>
);

export default JobDetailsPage;
