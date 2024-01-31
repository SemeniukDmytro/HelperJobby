import React, {FC} from 'react';
import './EmployerSideRoutes.scss';
import {Outlet, Route, Routes} from "react-router-dom";
import JobPostingPage from "../../EmployerSidePages/JobPostingPage/JobPostingPage";
import EmployerSetupPage from "../../EmployerSidePages/EmployerSetupPage/EmployerSetupPage";
import RequireAuthForEmployersPages from "../../Components/RequireAuthForEmployersPages/RequireAuthForEmployersPages";
import AddJobBasicsPage from "../../EmployerSidePages/AddJobBasicsPage/AddJobBasicsPage";

interface EmployerSideRoutesProps {
}

const EmployerSideRoutes: FC<EmployerSideRoutesProps> = () => (
    <Routes>
        <Route element={<RequireAuthForEmployersPages/>}>
            <Route path={"/posting"} element={<JobPostingPage/>}/>
            <Route path={"/setup-employer"} element={<EmployerSetupPage/>}/>
            <Route path={"/posting"} element={<Outlet/>}>
                <Route path={"getting-started"} element={<AddJobBasicsPage/>}/>
            </Route>
        </Route>
    </Routes>
);

export default EmployerSideRoutes;
