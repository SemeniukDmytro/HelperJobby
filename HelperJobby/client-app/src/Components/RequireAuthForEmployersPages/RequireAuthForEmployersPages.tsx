import React, {FC} from 'react';
import './RequireAuthForEmployersPages.scss';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {EmployerProvider} from "../../contexts/EmployerContext";

interface RequireAuthForEmployersPagesProps {
}

const RequireAuthForEmployersPages: FC<RequireAuthForEmployersPagesProps> = () => {
    const location = useLocation();
    const {authUser} = useAuth();

    return (
        authUser ? (
            <EmployerProvider>
                <Outlet/>
            </EmployerProvider>
        ) : (
            <Navigate to="/auth-page" state={{from: location}} replace/>
        ));
}

export default RequireAuthForEmployersPages;
