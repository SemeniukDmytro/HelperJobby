import React, {FC} from 'react';
import JobDescriptionAndPreferencesComponent
    from "./PageComponents/JobDescriptionAndPreferencesComponent/JobDescriptionAndPreferencesComponent";

interface JobDescriptionAndPreferencesPageProps {
}

const JobDescriptionAndPreferencesPage: FC<JobDescriptionAndPreferencesPageProps> = () => (
    <JobDescriptionAndPreferencesComponent/>
);

export default JobDescriptionAndPreferencesPage;
