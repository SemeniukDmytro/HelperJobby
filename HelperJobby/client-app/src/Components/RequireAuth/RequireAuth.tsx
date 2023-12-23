import React, { FC, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserService } from '../../services/userService';
import { UserDTO } from '../../DTOs/userRelatedDTOs/UserDTO';

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
        <Outlet />
    ) : (
        <Navigate to="auth-page" state={{ from: location }} replace />
    );
};

export default RequireAuth;