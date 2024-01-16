import './App.css';
import {Route, Routes} from "react-router-dom";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import React from "react";
import AuthPage from "./Pages/AuthPage/AuthPage";
import HomePage from "./Pages/HomePage/HomePage";
import {AuthProvider} from "./contexts/AuthContext";
import JobSeekerProfilePage from "./Pages/JobSeekerProfilePage/JobSeekerProfilePage";
import EditContactInfoPage from "./Pages/EditContactInfoPage/EditContactInfoPage";
import SearchJobResultsPage from "./Pages/SearchJobResultsPage/SearchJobResultsPage";
import ResumeNamePage from "./Pages/BuildResumePages/ResumeNamePage/ResumeNamePage";
import ResumePhonePage from "./Pages/BuildResumePages/ResumePhoneNumberPage/ResumePhonePage";
import BuildResumePage from "./Pages/BuildResumePages/BuildResumePage/BuildResumePage";
import ResumeAddressPage from "./Pages/BuildResumePages/ResumeAddressPage/ResumeAddressPage";
import AddEducationPage from "./Pages/BuildResumePages/AddEducationPage/AddEducationPage";

function App() {
  return (
      <AuthProvider>
        <Routes>
            {/* auth routes*/}
            <Route element={<RequireAuth/>}>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/my-profile"} element={<JobSeekerProfilePage/>}/>
                <Route path={"/edit-contact"} element={<EditContactInfoPage/>}/>
                <Route path={"/build"} element={<BuildResumePage/>}>
                    <Route path={"name"} element={<ResumeNamePage/>}/>
                    <Route path={"phone"} element={<ResumePhonePage/>}/>
                    <Route path={"address"} element={<ResumeAddressPage/>}/>
                    <Route path={"education/add"} element={<AddEducationPage/>}/>
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
