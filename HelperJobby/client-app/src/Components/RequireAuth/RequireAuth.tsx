import React, { FC} from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {useAuth} from "../../hooks/useAuth";

interface RequireAuthProps {}

const RequireAuth: FC<RequireAuthProps> = () => {
    const location = useLocation();
    const {authUser} = useAuth();

    return (
        authUser ? (
            <Outlet />
    ) : (
        <Navigate to="/home" state={{ from: location }} replace />
    ));
};

export default RequireAuth;