import React, {FC} from 'react';
import './AppRoutes.scss';
import RequireAuth from "../../Components/RequireAuth/RequireAuth";
import {Route, Routes} from "react-router-dom";
import {JobSeekerProvider} from "../../contexts/JobSeekerContext";
import JobSeekerSideRoutes from "../JobSeekerSideRoutes/JobSeekerSideRoutes";
import HomePage from "../../JobSeekerSidePages/HomePage/HomePage";
import AuthPage from "../../CommonPages/AuthPage/AuthPage";
import SearchJobResultsPage from "../../JobSeekerSidePages/SearchJobResultsPage/SearchJobResultsPage";
import JobPage from "../../JobSeekerSidePages/JobPage/JobPage";
import NotFoundPage from "../../CommonPages/NotFoundPage/NotFoundPage";
import {AuthProvider} from "../../contexts/AuthContext";
import EmployerSideRoutes from "../EmployerSideRoutes/EmployerSideRoutes";
import {EmployerProvider} from "../../contexts/EmployerContext";
import EmployersPagesHeader from "../../EmployersSideComponents/EmployersPagesHeader/EmployersPagesHeader";

interface AppRoutesProps {
}

const AppRoutes: FC<AppRoutesProps> = () => (
    <AuthProvider>
        <Routes>
            <Route element={<RequireAuth/>}>
                <Route path="/*" element=
                    {<JobSeekerProvider>
                        <JobSeekerSideRoutes/>
                    </JobSeekerProvider>}>
                </Route>
                <Route path={"/employers/*"} element=
                    {<EmployerProvider>
                        <EmployersPagesHeader/>
                        <EmployerSideRoutes/>
                    </EmployerProvider>
                    }>
                </Route>
            </Route>

            {/*Public routes*/}
            <Route path="/home" element={<HomePage/>}/>
            <Route path={"/auth-page"} element={<AuthPage/>}/>
            <Route path={"/jobs"} element={<SearchJobResultsPage/>}/>
            <Route path={"/viewjob/:jid"} element={<JobPage/>}/>

            <Route path={"*"} element={<NotFoundPage/>}/>

        </Routes>
    </AuthProvider>
);

export default AppRoutes;
