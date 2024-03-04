import React, {FC} from 'react';
import './AppRoutes.scss';
import {Route, Routes} from "react-router-dom";
import JobSeekerSideRoutes from "../JobSeekerSideRoutes/JobSeekerSideRoutes";
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
