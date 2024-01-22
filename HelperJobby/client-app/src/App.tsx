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
import PreviewAddSkillPage from "./Pages/BuildResumePages/PreviewAddSkillPage/PreviewAddSkillPage";
import PreviewAddEducationPage from "./Pages/ResumePreviewPages/PreviewAddEducationPage/PreviewAddEducationPage";
import PreviewEditEducationPage from "./Pages/ResumePreviewPages/PreviewEditEducationPage/PreviewEditEducationPage";
import PreviewAddWorkExperiencePage
    from "./Pages/ResumePreviewPages/PreviewAddWorkExperiencePage/PreviewAddWorkExperiencePage";
import PreviewEditWorkExperiencePage
    from "./Pages/ResumePreviewPages/PreviewEditWorkExperiencePage/PreviewEditWorkExperiencePage";


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
                        <Route path={"skills/add"} element={<PreviewAddSkillPage/>}/>
                        <Route path={"education/add"} element={<PreviewAddEducationPage/>}/>
                        <Route path={"education/:id"} element={<PreviewEditEducationPage/>}/>
                        <Route path={"experience/add"} element={<PreviewAddWorkExperiencePage/>}/>
                        <Route path={"experience/:id"} element={<PreviewEditWorkExperiencePage/>}/>
                    </Route>
                </Route>
                <Route path={"/resume/contact"} element={<EditContactInfoPage/>}/>
                
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
