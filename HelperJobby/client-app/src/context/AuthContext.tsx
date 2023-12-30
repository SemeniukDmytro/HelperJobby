import {createContext, ReactNode, useEffect, useState} from "react";
import AuthService from "../services/authService";
import {AuthContextProps} from "../contextTypes/AuthContextProps";
import {AuthUserDTO} from "../DTOs/userRelatedDTOs/AuthUserDTO";
import {setAuthToken} from "../utils/AuthTokenInteraction";

const AuthContext = createContext<AuthContextProps>({authUser : null, 
    setAuthUser : () => {}});

export function AuthProvider({children} : {children: ReactNode; }) 
{
    const [authUser, setAuthUser] = useState<AuthUserDTO | null>(null);
    
     async function refreshAuthUser() {
         
        const authService = new AuthService();
        let refreshedAuthUser : AuthUserDTO | null = null;
        try {
            refreshedAuthUser = await authService.refreshToken();
        }
        catch (e){
            
        }
        finally {
            if (refreshedAuthUser?.user){
                setAuthUser(refreshedAuthUser);
                setAuthToken(refreshedAuthUser.token);
            }
        }
        
    }   

    useEffect(  () => {
        refreshAuthUser();
        },[]);
        
    return (
        <AuthContext.Provider value={{authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

