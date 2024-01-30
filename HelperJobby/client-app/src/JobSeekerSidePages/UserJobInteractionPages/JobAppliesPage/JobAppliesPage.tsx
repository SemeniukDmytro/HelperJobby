import React, {FC} from 'react';
import JobAppliesComponent from "./PageComponents/JobAppliesComponent/JobAppliesComponent";

interface AppliedJobsPageProps {
}

const JobAppliesPage: FC<AppliedJobsPageProps> = () => (
    <JobAppliesComponent/>
);

export default JobAppliesPage;
