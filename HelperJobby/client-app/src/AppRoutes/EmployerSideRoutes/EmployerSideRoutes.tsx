import React, {FC} from 'react';
import './EmployerSideRoutes.scss';
import {Route, Routes} from "react-router-dom";
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
import JobPostingPagesWrap
    from "../../EmployerSidePages/JobCreationPages/SharedComponents/JobPostingPagesWrap/JobPostingPagesWrap";
import ReviewJobPage from "../../EmployerSidePages/JobCreationPages/ReviewJobPage/ReviewJobPage";
import EmployerJobsPage from "../../EmployerSidePages/EmployerJobsPage/EmployerJobsPage";
import EditJobPage from "../../EmployerSidePages/EditJobPage/EditJobPage";
import CandidatesComponent
    from "../../EmployerSidePages/CandidatesPage/PageComponents/CandidatesComponent/CandidatesComponent";
import ResumeSearchPage from "../../EmployerSidePages/ResumeSearchPage/ResumeSearchPage";
import JobApplyReviewPage from "../../EmployerSidePages/JobApplyReviewPage/JobApplyReviewPage";
import EmployerInterviewsPage from "../../EmployerSidePages/EmployerInterviwesPage/EmployerInterviewsPage";
import OrganizationUsersPage from "../../EmployerSidePages/OrganizationUsersPage/OrganizationUsersPage";
import JobCreationPagesWrap from "../../EmployersSideComponents/JobCreationPagesWrap/JobCreationPagesWrap";
import EmployerMessagingPage from "../../EmployerSidePages/EmployerMessagingPage/EmployerMessagingPage";
import EditEmployerInfoPage from "../../EmployerSidePages/EditEmployerInfoPage/EditEmployerInfoPage";
import EmployerMessagingWrap
    from "../../EmployerSidePages/EmployerMessagingPage/PageComponents/EmployerMessagingWrap/EmployerMessagingWrap";

interface EmployerSideRoutesProps {
}

const EmployerSideRoutes: FC<EmployerSideRoutesProps> = () => (
    <Routes>
        <Route element={<RequireAuthForEmployersPages/>}>
            <Route element={<PagesWithoutSidebarWrap/>}>
                <Route path={"/setup-employer"} element={<EmployerSetupPage/>}/>
            </Route>
            <Route element={<EmployerPagesWithSidebarWrap/>}>
                
            </Route>
            <Route element={<JobPostingPagesWrap/>}>
                <Route path={"/posting"} element={<JobCreationPagesWrap/>}>
                    <Route index element={<JobPostingPage/>}/>
                    <Route path={"getting-started"} element={<AddJobBasicsPage/>}/>
                    <Route path={"getting-started/:jobId"} element={<AddJobBasicsPage/>}/>
                    <Route path={"job-details/:jobId"} element={<JobDetailsPage/>}/>
                    <Route path={"compensation-details/:jobId"} element={<AddJobPayAndBenefitsPage/>}/>
                    <Route path={"description-and-application-settings/:jobId"} element={<JobDescriptionAndPreferencesPage/>}/>
                    <Route path={"review-job/:jobId"} element={<ReviewJobPage/>}/>
                </Route>
                <Route path={"/jobs"} element={<EmployerJobsPage/>}/>
                <Route path={"/editing/:employerJobId"} element={<EditJobPage/>}/>
                <Route path={"/candidates"} element={<CandidatesComponent/>}/>
                <Route path={"/resumes"} element={<ResumeSearchPage/>}/>
                <Route path={"/review-job-apply/:candidateId/:jobId"} element={<JobApplyReviewPage/>}/>
                <Route path={"/interviews"} element={<EmployerInterviewsPage/>}/>
                <Route path={"/organization/users"} element={<OrganizationUsersPage/>}/>
                <Route path={"/employer-edit"} element={<EditEmployerInfoPage/>}/>
                <Route path={"/messages"} element={<EmployerMessagingWrap/>}>
                    <Route index element={<EmployerMessagingPage/>}/>
                </Route>
            </Route>
        </Route>
    </Routes>
);

export default EmployerSideRoutes;
