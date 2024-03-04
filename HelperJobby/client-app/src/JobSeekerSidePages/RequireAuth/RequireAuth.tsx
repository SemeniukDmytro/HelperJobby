import React, {FC} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {JobSeekerProvider} from "../../contexts/JobSeekerContext";
import {useAuth} from "../../hooks/contextHooks/useAuth";

interface RequireAuthProps {
}

const RequireAuth: FC<RequireAuthProps> = () => {
    const location = useLocation();
    const {authUser} = useAuth();
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