import React, {useState} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import AuthComponent from "./Components/AuthComponent/AuthComponent";
import AccountTypeForm from "./Components/AccountTypeForm/AccountTypeForm";

function App() {
  return (
  <Routes>
    <Route path="/" element={<AuthComponent />} />
    <Route path={"auth-page"} element={<AuthComponent/>}></Route>
    <Route path={"temp"} element={<AccountTypeForm/>}/>
  </Routes>
  )
}

export default App;
