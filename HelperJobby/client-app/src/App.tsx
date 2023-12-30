import './App.css';
import {Route, Routes} from "react-router-dom";
import HomeComponent from "./Components/HomeComponent/HomeComponent";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import React from "react";
import {AuthProvider} from "./context/AuthContext";
import AuthPage from "./Pages/AuthPage/AuthPage";
import HomePage from "./Pages/HomePage/HomePage";

function App() {
  return (
      <AuthProvider>
        <Routes>
            {/* public routes*/}
            <Route path="/" element={<HomePage/>} />
            <Route path={"auth-page"} element={<AuthPage/>}></Route>
            {/*private routes */}
            <Route element={<RequireAuth/>}>
                <Route path={"temp"} element={<HomePage/>}/>
            </Route>
        </Routes>
      </AuthProvider>
  )
}

export default App;
