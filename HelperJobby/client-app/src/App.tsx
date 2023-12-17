import React, {useState} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import AuthComponent from "./Components/AuthComponent/AuthComponent";
import CreatePasswordForm from "./Components/CreatePasswordForm/CreatePasswordForm";

function App() {
  return (
  <Routes>
    <Route path="/" element={<AuthComponent />} />
    <Route path={"auth-page"} element={<AuthComponent/>}></Route>
    <Route path={"temp"} element={<CreatePasswordForm/>}/>
  </Routes>
  )
}

export default App;
