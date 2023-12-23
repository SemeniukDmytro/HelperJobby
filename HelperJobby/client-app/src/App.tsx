import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import React from "react";
import {AuthProvider} from "./context/AuthContext";
import AuthPage from "./Pages/AuthPage/AuthPage";

function App() {
  return (
      <AuthProvider>
        <Routes>
            {/* public routes*/}
            <Route path="/" element={<AuthPage/>} />
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
