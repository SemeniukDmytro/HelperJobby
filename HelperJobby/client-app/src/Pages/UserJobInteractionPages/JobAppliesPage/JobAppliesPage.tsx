import React, { FC } from 'react';
import JobAppliesComponent from "./PageComponents/AppliedJobsComponent/JobAppliesComponent";
import {JobSeekerJobInteractionsProvider} from "../../../contexts/JobSeekerJobInteractionsContext";

interface AppliedJobsPageProps {}

const JobAppliesPage: FC<AppliedJobsPageProps> = () => (
    <JobAppliesComponent/>
);

export default JobAppliesPage;
