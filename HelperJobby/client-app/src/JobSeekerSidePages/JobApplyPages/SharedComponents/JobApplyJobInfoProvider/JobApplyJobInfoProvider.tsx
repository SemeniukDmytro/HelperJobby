import React, { FC } from 'react';
import './JobApplyJobInfoProvider.scss';
import {Outlet} from "react-router-dom";
import {CurrentJobApplicationProvider} from "../../../../contexts/CurrentJobApplicationContext";

interface JobApplyJobInfoProviderProps {}

const JobApplyJobInfoProvider: FC<JobApplyJobInfoProviderProps> = () => (
    <CurrentJobApplicationProvider>
        <Outlet/>
    </CurrentJobApplicationProvider>
);

export default JobApplyJobInfoProvider;
