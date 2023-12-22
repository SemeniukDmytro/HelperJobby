import './App.css';
import {Route, Routes} from "react-router-dom";
import AuthPage from "./Components/AuthPage/AuthPage";
import HomePage from "./Components/HomePage/HomePage";
import {AuthProvider} from "./Contexts/AuthContext";
import RequireAuth from "./Components/RequireAuth/RequireAuth";

function App() {
  return (
      <AuthProvider>
        <Routes>
            {/* public routes*/}
            <Route path="/" element={<AuthPage />} />
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
