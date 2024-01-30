import React, { FC } from 'react';
import JobPostingComponent from "./PageComponents/JobPostingComponent/JobPostingComponent";

interface JobPostingPageProps {}

const JobPostingPage: FC<JobPostingPageProps> = () => (
  <JobPostingComponent/>
);

export default JobPostingPage;
