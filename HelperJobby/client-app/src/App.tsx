import './App.css';
import {Route, Routes} from "react-router-dom";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import React from "react";
import AuthPage from "./Pages/AuthPage/AuthPage";
import HomePage from "./Pages/HomePage/HomePage";
import {AuthProvider} from "./contexts/AuthContext";
import JobSeekerProfilePage from "./Pages/JobSeekerProfilePage/JobSeekerProfilePage";
import EditContactInfoPage from "./Pages/EditContactInfoPage/EditContactInfoPage";

function App() {
  return (
      <AuthProvider>
        <Routes>
            
            
            {/* auth routes*/}
            <Route element={<RequireAuth/>}>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"my-profile"} element={<JobSeekerProfilePage/>}/>
                <Route path={"edit-contact"} element={<EditContactInfoPage/>}/>
            </Route>

            {/*public routes */}
            <Route path="/" element={<HomePage/>}/>
            <Route path={"auth-page"} element={<AuthPage/>}></Route>
        </Routes>
      </AuthProvider>
  )
}

export default App;
