import React, {FC} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useAuth} from "../../hooks/useAuth";
import {JobSeekerProvider} from "../../contexts/JobSeekerContext";

interface RequireAuthProps {
}

const RequireAuth: FC<RequireAuthProps> = () => {
    const location = useLocation();
    const {authUser} = useAuth();
    console.log("pidad")
    return (
        authUser ? (
            <JobSeekerProvider>
                <Outlet/>
            </JobSeekerProvider>
        ) : (
            <Navigate to="/home" state={{from: location}} replace/>
        ));
};

export default RequireAuth;