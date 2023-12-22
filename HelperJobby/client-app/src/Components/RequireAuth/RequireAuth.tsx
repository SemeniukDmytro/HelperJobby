import React, {FC, useEffect, useState} from 'react';
import {useAuth} from "../../Hooks/useAuth";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {UserService} from "../../Services/UserService";

interface RequireAuthProps {}

const RequireAuth: FC<RequireAuthProps> = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    async function checkSignedInUser() : Promise<boolean>{
        const userService = new UserService();
        
        try {
            const user = await userService.getCurrentUser();
            console.log(user);
            return true;
        }
        catch (error){
            return false;
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoggedIn(await checkSignedInUser());
        };
        
        fetchData();
        
    }, []);
    
    return (
        isLoggedIn 
        ? <Outlet />
        : <Navigate to={"auth-page"} state={{from : location}} replace/>    
    );
};

export default RequireAuth;
