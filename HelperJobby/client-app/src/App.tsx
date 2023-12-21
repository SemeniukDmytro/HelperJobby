import React, {Dispatch, SetStateAction, useState} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import AuthPage from "./Components/AuthPage/AuthPage";
import CreatePasswordForm from "./Components/CreatePasswordForm/CreatePasswordForm";
import HomePage from "./Components/HomePage/HomePage";
import {AuthProvider} from "./Contexts/AuthContext";
import {AuthUserDTO} from "./DTOs/UserDTOs/AuthUserDTO";

function App() {
  const [authUser, setAuthUser] = useState<AuthUserDTO | null>(null);
  return (
      <AuthProvider user={authUser} setAuthUser={ setAuthUser}>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path={"auth-page"} element={<AuthPage/>}></Route>
          <Route path={"temp"} element={<HomePage/>}/>
        </Routes>
      </AuthProvider>
  )
}

export default App;
