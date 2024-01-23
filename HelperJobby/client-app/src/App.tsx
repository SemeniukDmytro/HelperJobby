import './App.css';
import {Outlet, Route, Routes} from "react-router-dom";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import React from "react";
import AuthPage from "./Pages/AuthPage/AuthPage";
import HomePage from "./Pages/HomePage/HomePage";
import {AuthProvider} from "./contexts/AuthContext";
import JobSeekerProfilePage from "./Pages/JobSeekerProfilePage/JobSeekerProfilePage";
import EditContactInfoPage from "./Pages/EditContactInfoPage/EditContactInfoPage";
import SearchJobResultsPage from "./Pages/SearchJobResultsPage/SearchJobResultsPage";
import BuildResumePage from "./Pages/BuildResumePages/BuildResumePage/BuildResumePage";
import AddEducationPage from "./Pages/BuildResumePages/AddEducationPage/AddEducationPage";
import EditEducationPage from "./Pages/BuildResumePages/EditEducationPage/EditEducationPage";
import ResumeAddressPage from "./Pages/BuildResumePages/AddAddressPage/ResumeAddressPage";
import WorkExperiencePage from "./Pages/BuildResumePages/WorkExperiencePage/WorkExperiencePage";
import AddWorkExperiencePage from "./Pages/BuildResumePages/AddWorkExperiencePage/AddWorkExperiencePage";
import AddPhonePage from "./Pages/BuildResumePages/AddPhonePage/AddPhonePage";
import AddNamePage from "./Pages/BuildResumePages/AddNamePage/AddNamePage";
import EducationPage from "./Pages/BuildResumePages/EducationPage/EducationPage";
import EditWorkExperiencePage from "./Pages/BuildResumePages/EditWorkExperiencePage/EditWorkExperiencePage";
import SkillsPage from "./Pages/BuildResumePages/SkillsPage/SkillsPage";
import PreviewPage from "./Pages/BuildResumePages/PreviewPage/PreviewPage";
import ResumePage from "./Pages/ResumePage/ResumePage";
import ResumeAddEducationPage from "./Pages/AddResumeInfoPages/ResumeAddEducationPage/ResumeAddEducationPage";
import ResumeAddWorkExperiencePage
    from "./Pages/AddResumeInfoPages/ResumeAddWorkExperiencePage/ResumeAddWorkExperiencePage";
import ResumeEditEducationPage from "./Pages/AddResumeInfoPages/ResumeEditEducationPage/ResumeEditEducationPage";
import ResumeEditWorkExperiencePage
    from "./Pages/AddResumeInfoPages/ResumeEditWorkExperiencePage/ResumeEditWorkExperiencePage";
import ResumeAddSkillPage from "./Pages/BuildResumePages/ResumeAddSkillPage/ResumeAddSkillPage";


function App() {
  return (
      <AuthProvider>
        <Routes>
            {/* auth routes*/}
            <Route element={<RequireAuth/>}>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/my-profile"} element={<JobSeekerProfilePage/>}/>
                <Route path={"/edit/contact"} element={<EditContactInfoPage/>}/>
                <Route path={"/build"} element={<BuildResumePage/>}>
                    <Route path={"name"} element={<AddNamePage/>}/>
                    <Route path={"phone"} element={<AddPhonePage/>}/>
                    <Route path={"address"} element={<ResumeAddressPage/>}/>
                    <Route path="education" element={<Outlet/>}>
                        <Route index element={<EducationPage />} />
                        <Route path="add" element={<AddEducationPage />} />
                        <Route path=":id" element={<EditEducationPage />} />
                    </Route>
                    <Route path="experience" element={<Outlet/>}>
                        <Route index element={<WorkExperiencePage />} />
                        <Route path="add" element={<AddWorkExperiencePage />} />
                        <Route path=":id" element={<EditWorkExperiencePage />} />
                    </Route>
                    <Route path={"skills"} element={<SkillsPage/>}/>
                    <Route path={"preview"} element={<Outlet/>}>
                        <Route index element={<PreviewPage />} />
                        <Route path={"skills/add"} element={<ResumeAddSkillPage/>}/>
                        <Route path={"education/add"} element={<ResumeAddEducationPage/>}/>
                        <Route path={"education/:id"} element={<ResumeEditEducationPage/>}/>
                        <Route path={"experience/add"} element={<ResumeAddWorkExperiencePage/>}/>
                        <Route path={"experience/:id"} element={<ResumeEditWorkExperiencePage/>}/>
                    </Route>
                </Route>
                <Route path={"/resume"} element={<Outlet/>}>
                    <Route index element={<ResumePage/>} />
                    <Route path={"contact"} element={<EditContactInfoPage/>}/>
                    <Route path={"education/add"} element={<ResumeAddEducationPage/>}/>
                    <Route path={"education/:id"} element={<ResumeEditEducationPage/>}/>
                    <Route path={"experience/add"} element={<ResumeAddWorkExperiencePage/>}/>
                    <Route path={"experience/:id"} element={<ResumeEditWorkExperiencePage/>}/>
                    <Route path={"skills/add"} element={<ResumeAddSkillPage/>}/>
                </Route>
                
            </Route>

            {/*public routes */}
            <Route path="/home" element={<HomePage/>}/>
            <Route path={"/auth-page"} element={<AuthPage/>}/>
            <Route path={"/jobs"} element={<SearchJobResultsPage/>}/>
            
        </Routes>
      </AuthProvider>
  )
}

export default App;
