import React, {FC, useEffect, useState} from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {UserService} from "../../services/userService";

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
