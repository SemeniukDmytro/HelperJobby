import React, {useState} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import AuthComponent from "./Components/AuthComponent/AuthComponent";
import PasswordForm from "./Components/PasswordForm/PasswordForm";

function App() {
  return (
  <Routes>
    <Route path="/" element={<AuthComponent />} />
    <Route path={"auth-page"} element={<AuthComponent/>}></Route>
    <Route path={"continue-auth"} element={<PasswordForm/>}/>
  </Routes>
  )
}

export default App;
