import React, {FC} from 'react';
import './EmployerSideRoutes.scss';
import {Route, Routes} from "react-router-dom";
import JobPostingPage from "../../EmployerSidePages/JobPostingPage/JobPostingPage";
import EmployerSetupPage from "../../EmployerSidePages/EmployerSetupPage/EmployerSetupPage";
import RequireAuthForEmployersPages from "../../Components/RequireAuthForEmployersPages/RequireAuthForEmployersPages";

interface EmployerSideRoutesProps {
}

const EmployerSideRoutes: FC<EmployerSideRoutesProps> = () => (
    <Routes>
        <Route element={<RequireAuthForEmployersPages/>}>
            <Route path={"/posting"} element={<JobPostingPage/>}/>
            <Route path={"/setup-employer"} element={<EmployerSetupPage/>}/>
        </Route>
    </Routes>
);

export default EmployerSideRoutes;
