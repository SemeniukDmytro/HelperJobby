import {createContext, ReactNode, useEffect, useState} from "react";
import AuthService from "../services/authService";
import {AuthContextProps} from "../contextTypes/AuthContextProps";
import {AuthUserDTO} from "../DTOs/userRelatedDTOs/AuthUserDTO";

const AuthContext = createContext<AuthContextProps>({authUser : null, 
    setAuthUser : () => {}});

export function AuthProvider({children} : {children: ReactNode; }) 
{
    const [authUser, setAuthUser] = useState<AuthUserDTO | null>(null);
    
     async function refreshToken() {
         
        const authService = new AuthService();
        const user = await  authService.refreshToken();
        console.log(user);
    }   

    useEffect(  () => {
        refreshToken();
        },[]);
        
    return (
        <AuthContext.Provider value={{authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

