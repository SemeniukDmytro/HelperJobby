import React, { FC, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserService } from '../../services/userService';
import { UserDTO } from '../../DTOs/userRelatedDTOs/UserDTO';
import {JobSeekerProvider} from "../../contexts/JobSeekerContext";
import {useAuth} from "../../hooks/useAuth";

interface RequireAuthProps {}

const RequireAuth: FC<RequireAuthProps> = () => {
    const location = useLocation();
    const userService = new UserService();
    const [user, setUser] = useState<UserDTO | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await userService.getCurrentUser();
                setUser(fetchedUser);
            } catch (error) {
                console.error('Error fetching current user:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    return isLoading ? (
        <>
            <span>Loading...</span>
        </>
    ) : user ? (
        <JobSeekerProvider>
            <Outlet />
        </JobSeekerProvider>
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default RequireAuth;