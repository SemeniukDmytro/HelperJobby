import React, {FC} from 'react';
import './AppRoutes.scss';
import {Route, Routes} from "react-router-dom";
import JobSeekerSideRoutes from "../JobSeekerSideRoutes/JobSeekerSideRoutes";
import HomePage from "../../JobSeekerSidePages/HomePage/HomePage";
import AuthPage from "../../CommonPages/AuthPage/AuthPage";
import SearchJobResultsPage from "../../JobSeekerSidePages/SearchJobResultsPage/SearchJobResultsPage";
import JobPage from "../../JobSeekerSidePages/JobPage/JobPage";
import NotFoundPage from "../../CommonPages/NotFoundPage/NotFoundPage";
import {AuthProvider} from "../../contexts/AuthContext";
import EmployerSideRoutes from "../EmployerSideRoutes/EmployerSideRoutes";

interface AppRoutesProps {
}

const AppRoutes: FC<AppRoutesProps> = () => (
    <AuthProvider>
        <Routes>
            <Route path="/*" element={<JobSeekerSideRoutes/>}/>
            <Route path={"/employers/*"} element={<EmployerSideRoutes/>}>
            </Route>

            <Route path={"*"} element={<NotFoundPage/>}/>

        </Routes>
    </AuthProvider>
);

export default AppRoutes;
