import React, {FC} from 'react';
import JobDescriptionAndPreferencesComponent
    from "./PageComponents/JobDescriptionAndPreferencesComponnent/JobDescriptionAndPreferencesComponent";

interface JobDescriptionAndPreferencesPageProps {
}

const JobDescriptionAndPreferencesPage: FC<JobDescriptionAndPreferencesPageProps> = () => (
    <JobDescriptionAndPreferencesComponent/>
);

export default JobDescriptionAndPreferencesPage;
