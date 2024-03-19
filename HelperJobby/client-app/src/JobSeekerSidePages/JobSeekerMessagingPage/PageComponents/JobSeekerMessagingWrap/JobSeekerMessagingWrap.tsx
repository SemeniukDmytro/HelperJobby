import React, {FC} from 'react';
import './JobSeekerMessagingWrap.scss';
import {JobSeekerMessagingConversationProvider} from "../../../../contexts/JobSeekerMessaginConversationContext";
import {Outlet} from "react-router-dom";

interface JobSeekerMessagingWrapProps {
}

const JobSeekerMessagingWrap: FC<JobSeekerMessagingWrapProps> = () => (
    <JobSeekerMessagingConversationProvider>
        <Outlet/>
    </JobSeekerMessagingConversationProvider>
);

export default JobSeekerMessagingWrap;
