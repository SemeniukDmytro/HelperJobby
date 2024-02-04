import React, {FC} from 'react';
import './EmployerSideRoutes.scss';
import {Outlet, Route, Routes} from "react-router-dom";
import JobPostingPage from "../../EmployerSidePages/JobPostingPage/JobPostingPage";
import EmployerSetupPage from "../../EmployerSidePages/EmployerSetupPage/EmployerSetupPage";
import RequireAuthForEmployersPages
    from "../../EmployerSidePages/RequireAuthForEmployersPages/RequireAuthForEmployersPages";
import AddJobBasicsPage from "../../EmployerSidePages/JobCreationPages/AddJobBasicsPage/AddJobBasicsPage";
import JobDetailsPage from "../../EmployerSidePages/JobCreationPages/JobDetailsPage/JobDetailsPage";
import AddJobPayAndBenefitsPage
    from "../../EmployerSidePages/JobCreationPages/AddJobPayAndBenefitsPage/AddJobPayAndBenefitsPage";
import JobDescriptionAndPreferencesPage
    from "../../EmployerSidePages/JobCreationPages/JobDescriptionAndPreferencesPage/JobDescriptionAndPreferencesPage";
import PagesWithoutSidebarWrap from "../../EmployersSideComponents/PagesWithoutSidebarWrap/PagesWithoutSidebarWrap";
import EmployerPagesWithSidebarWrap
    from "../../EmployersSideComponents/EmployerPagesWithSidebarWrap/EmployerPagesWithSidebarWrap";

interface EmployerSideRoutesProps {
}

const EmployerSideRoutes: FC<EmployerSideRoutesProps> = () => (
    <Routes>
        <Route element={<RequireAuthForEmployersPages/>}>
            <Route element={<PagesWithoutSidebarWrap/>}>
                <Route path={"/setup-employer"} element={<EmployerSetupPage/>}/>
            </Route>
            <Route element={<EmployerPagesWithSidebarWrap/>}>
                <Route path={"/posting"} element={<Outlet/>}>
                    <Route index element={<JobPostingPage/>}/>
                    <Route path={"getting-started"} element={<AddJobBasicsPage/>}/>
                    <Route path={"job-details"} element={<JobDetailsPage/>}/>
                    <Route path={"compensation-details"} element={<AddJobPayAndBenefitsPage/>}/>
                    <Route path={"description-and-application-settings"} element={<JobDescriptionAndPreferencesPage/>}/>
                </Route>
            </Route>
        </Route>
    </Routes>
);

export default EmployerSideRoutes;
