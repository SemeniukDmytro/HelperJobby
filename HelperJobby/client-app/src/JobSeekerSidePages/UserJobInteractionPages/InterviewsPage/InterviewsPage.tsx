import React, { FC } from 'react';
import InterviewsComponent from "./PageComponents/InterviewsComponent/InterviewsComponent";
import {JobSeekerJobInteractionsProvider} from "../../../contexts/JobSeekerJobInteractionsContext";

interface InterviewsPageProps {}

const InterviewsPage: FC<InterviewsPageProps> = () => (
    <InterviewsComponent/>
);

export default InterviewsPage;
