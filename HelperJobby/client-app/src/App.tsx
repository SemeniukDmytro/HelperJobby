import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import AuthComponent from "./Components/AuthComponent/AuthComponent";

function App() {
  return (
  <Routes>
    <Route path="/" element={<AuthComponent />} />
  </Routes>
  )
}

export default App;
