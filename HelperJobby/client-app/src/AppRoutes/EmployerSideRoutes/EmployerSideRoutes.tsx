import React, {FC} from 'react';
import './EmployerSideRoutes.scss';
import {Outlet, Route, Routes} from "react-router-dom";
import JobPostingPage from "../../EmployerSidePages/JobPostingPage/JobPostingPage";
import EmployerSetupPage from "../../EmployerSidePages/EmployerSetupPage/EmployerSetupPage";
import RequireAuthForEmployersPages
    from "../../EmployerSidePages/RequireAuthForEmployersPages/RequireAuthForEmployersPages";
import AddJobBasicsPage from "../../EmployerSidePages/JobCreationPages/AddJobBasicsPage/AddJobBasicsPage";
import JobDetailsPage from "../../EmployerSidePages/JobCreationPages/JobDetailsPage/JobDetailsPage";

interface EmployerSideRoutesProps {
}

const EmployerSideRoutes: FC<EmployerSideRoutesProps> = () => (
    <Routes>
        <Route element={<RequireAuthForEmployersPages/>}>
            <Route path={"/posting"} element={<JobPostingPage/>}/>
            <Route path={"/setup-employer"} element={<EmployerSetupPage/>}/>
            <Route path={"/posting"} element={<Outlet/>}>
                <Route path={"getting-started"} element={<AddJobBasicsPage/>}/>
                <Route path={"job-details"} element={<JobDetailsPage/>}/>
            </Route>
        </Route>
    </Routes>
);

export default EmployerSideRoutes;
