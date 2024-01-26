import React, { FC } from 'react';
import AppliedJobsComponent from "./PageComponents/AppliedJobsComponent/AppliedJobsComponent";
import {JobSeekerJobInteractionsProvider} from "../../../contexts/JobSeekerJobInteractionsContext";

interface AppliedJobsPageProps {}

const AppliedJobsPage: FC<AppliedJobsPageProps> = () => (
    <AppliedJobsComponent/>
);

export default AppliedJobsPage;
