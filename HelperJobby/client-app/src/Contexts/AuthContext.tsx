import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {AuthUserDTO} from "../DTOs/UserDTOs/AuthUserDTO";
import {AuthContextProps} from "../ContextsTypes/AuthContextProps";
import AuthService from "../Services/AuthService";

const AuthContext = createContext<AuthContextProps>({authUser : null
    , setAuthUser : () => {}});

export function AuthProvider({children} : {children: ReactNode; }) 
{
    const [auth, setAuth] = useState<AuthUserDTO | null>(null);
    
     async function refreshToken() {
        const authService = new AuthService();
        setAuth((await  authService.refreshToken()))
    }

    useEffect(  () => {
            refreshToken();
        },[]);
        
    return (
        <AuthContext.Provider value={{authUser : auth, setAuthUser : setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

