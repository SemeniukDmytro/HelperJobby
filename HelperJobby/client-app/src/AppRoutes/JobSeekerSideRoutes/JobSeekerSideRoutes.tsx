import React, {FC} from 'react';
import {Outlet, Route, Routes} from "react-router-dom";
import HomePage from "../../JobSeekerSidePages/HomePage/HomePage";
import JobSeekerProfilePage from "../../JobSeekerSidePages/JobSeekerProfilePage/JobSeekerProfilePage";
import EditContactInfoPage from "../../JobSeekerSidePages/EditContactInfoPage/EditContactInfoPage";
import BuildResumePage from "../../JobSeekerSidePages/BuildResumePages/BuildResumePage/BuildResumePage";
import AddNamePage from "../../JobSeekerSidePages/BuildResumePages/AddNamePage/AddNamePage";
import AddPhonePage from "../../JobSeekerSidePages/BuildResumePages/AddPhonePage/AddPhonePage";
import ResumeAddressPage from "../../JobSeekerSidePages/BuildResumePages/AddAddressPage/ResumeAddressPage";
import EducationPage from "../../JobSeekerSidePages/BuildResumePages/EducationPage/EducationPage";
import AddEducationPage from "../../JobSeekerSidePages/BuildResumePages/AddEducationPage/AddEducationPage";
import EditEducationPage from "../../JobSeekerSidePages/BuildResumePages/EditEducationPage/EditEducationPage";
import WorkExperiencePage from "../../JobSeekerSidePages/BuildResumePages/WorkExperiencePage/WorkExperiencePage";
import AddWorkExperiencePage
    from "../../JobSeekerSidePages/BuildResumePages/AddWorkExperiencePage/AddWorkExperiencePage";
import EditWorkExperiencePage
    from "../../JobSeekerSidePages/BuildResumePages/EditWorkExperiencePage/EditWorkExperiencePage";
import SkillsPage from "../../JobSeekerSidePages/BuildResumePages/SkillsPage/SkillsPage";
import PreviewPage from "../../JobSeekerSidePages/BuildResumePages/PreviewPage/PreviewPage";
import ResumeAddSkillPage from "../../JobSeekerSidePages/BuildResumePages/ResumeAddSkillPage/ResumeAddSkillPage";
import ResumeAddEducationPage
    from "../../JobSeekerSidePages/AddResumeInfoPages/ResumeAddEducationPage/ResumeAddEducationPage";
import ResumeEditEducationPage
    from "../../JobSeekerSidePages/AddResumeInfoPages/ResumeEditEducationPage/ResumeEditEducationPage";
import ResumeAddWorkExperiencePage
    from "../../JobSeekerSidePages/AddResumeInfoPages/ResumeAddWorkExperiencePage/ResumeAddWorkExperiencePage";
import ResumeEditWorkExperiencePage
    from "../../JobSeekerSidePages/AddResumeInfoPages/ResumeEditWorkExperiencePage/ResumeEditWorkExperiencePage";
import ResumePage from "../../JobSeekerSidePages/ResumePage/ResumePage";
import AccountSettingsPage
    from "../../JobSeekerSidePages/AccountSettingsRelatedPages/AccountSettingsPage/AccountSettingsPage";
import ChangeAccountTypePage
    from "../../JobSeekerSidePages/AccountSettingsRelatedPages/ChangeAccountTypePage/ChangeAccountTypePage";
import ChangeEmailPage from "../../JobSeekerSidePages/AccountSettingsRelatedPages/ChangeEmailPage/ChangeEmailPage";
import ChangePasswordPage
    from "../../JobSeekerSidePages/AccountSettingsRelatedPages/ChangePasswordPage/ChangePasswordPage";
import ChangePhonePage from "../../JobSeekerSidePages/AccountSettingsRelatedPages/ChangePhonePage/ChangePhonePage";
import MyJobsPagesWrap from "../../Components/MyJobsPagesWrap/MyJobsPagesWrap";
import SavedJobsPage from "../../JobSeekerSidePages/UserJobInteractionPages/SavedJobsPage/SavedJobsPage";
import JobAppliesPage from "../../JobSeekerSidePages/UserJobInteractionPages/JobAppliesPage/JobAppliesPage";
import InterviewsPage from "../../JobSeekerSidePages/UserJobInteractionPages/InterviewsPage/InterviewsPage";
import JobPage from "../../JobSeekerSidePages/JobPage/JobPage";
import RequireAuth from "../../Components/RequireAuth/RequireAuth";
import AuthPage from "../../CommonPages/AuthPage/AuthPage";
import SearchJobResultsPage from "../../JobSeekerSidePages/SearchJobResultsPage/SearchJobResultsPage";

interface JobSeekerSideRoutesProps {
}

const JobSeekerSideRoutes: FC<JobSeekerSideRoutesProps> = () => (
    <Routes>
        <Route element={<RequireAuth/>}>
            <Route path={"/"} element={<HomePage/>}/>

            <Route path={"/my-profile"} element={<JobSeekerProfilePage/>}/>

            <Route path={"/edit/contact"} element={<EditContactInfoPage/>}/>

            <Route path={"/build"} element={<BuildResumePage/>}>
                <Route path={"name"} element={<AddNamePage/>}/>
                <Route path={"phone"} element={<AddPhonePage/>}/>
                <Route path={"address"} element={<ResumeAddressPage/>}/>

                <Route path="education" element={<Outlet/>}>
                    <Route index element={<EducationPage/>}/>
                    <Route path="add" element={<AddEducationPage/>}/>
                    <Route path=":id" element={<EditEducationPage/>}/>
                </Route>
                <Route path="experience" element={<Outlet/>}>
                    <Route index element={<WorkExperiencePage/>}/>
                    <Route path="add" element={<AddWorkExperiencePage/>}/>
                    <Route path=":id" element={<EditWorkExperiencePage/>}/>
                </Route>

                <Route path={"skills"} element={<SkillsPage/>}/>

                <Route path={"preview"} element={<Outlet/>}>
                    <Route index element={<PreviewPage/>}/>
                    <Route path={"skills/add"} element={<ResumeAddSkillPage/>}/>
                    <Route path={"education/add"} element={<ResumeAddEducationPage/>}/>
                    <Route path={"education/:id"} element={<ResumeEditEducationPage/>}/>
                    <Route path={"experience/add"} element={<ResumeAddWorkExperiencePage/>}/>
                    <Route path={"experience/:id"} element={<ResumeEditWorkExperiencePage/>}/>
                </Route>
            </Route>

            <Route path={"/resume"} element={<Outlet/>}>
                <Route index element={<ResumePage/>}/>
                <Route path={"contact"} element={<EditContactInfoPage/>}/>
                <Route path={"education/add"} element={<ResumeAddEducationPage/>}/>
                <Route path={"education/:id"} element={<ResumeEditEducationPage/>}/>
                <Route path={"experience/add"} element={<ResumeAddWorkExperiencePage/>}/>
                <Route path={"experience/:id"} element={<ResumeEditWorkExperiencePage/>}/>
                <Route path={"skills/add"} element={<ResumeAddSkillPage/>}/>
            </Route>

            <Route path={"/settings"} element={<AccountSettingsPage/>}/>
            <Route path={"/account"} element={<Outlet/>}>
                <Route index element={<AccountSettingsPage/>}/>
                <Route path={"change-type"} element={<ChangeAccountTypePage/>}/>
                <Route path={"change-email"} element={<ChangeEmailPage/>}/>
                <Route path={"change-password"} element={<ChangePasswordPage/>}/>
                <Route path={"change-phone"} element={<ChangePhonePage/>}/>
            </Route>

            <Route element={<MyJobsPagesWrap/>}>
                <Route path={"saved"} element={<SavedJobsPage/>}/>
                <Route path={"applied"} element={<JobAppliesPage/>}/>
                <Route path={"interviews"} element={<InterviewsPage/>}/>
            </Route>

            <Route path={"/viewjob/:jid"} element={<JobPage/>}/>
        </Route>
        
        {/*Public routes*/}
        <Route path="/home" element={<HomePage/>}/>
        <Route path={"/auth-page"} element={<AuthPage/>}/>
        <Route path={"/jobs"} element={<SearchJobResultsPage/>}/>
        <Route path={"/viewjob/:jid"} element={<JobPage/>}/>
    </Routes>
);

export default JobSeekerSideRoutes;
