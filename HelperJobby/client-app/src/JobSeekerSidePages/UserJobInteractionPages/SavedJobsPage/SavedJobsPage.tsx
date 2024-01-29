import React, { FC } from 'react';
import SavedJobsComponent from "./PageComponents/SavedJobsComponent/SavedJobsComponent";
import {JobSeekerJobInteractionsProvider} from "../../../contexts/JobSeekerJobInteractionsContext";

interface SavedJobsPageProps {}

const SavedJobsPage: FC<SavedJobsPageProps> = () => (
        <SavedJobsComponent/>
);

export default SavedJobsPage;
