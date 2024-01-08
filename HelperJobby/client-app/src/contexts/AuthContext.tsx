import {createContext, ReactNode, useEffect, useState} from "react";
import AuthService from "../services/authService";
import {AuthContextProps} from "../contextTypes/AuthContextProps";
import {AuthUserDTO} from "../DTOs/userRelatedDTOs/AuthUserDTO";
import {getAuthToken, setAuthToken} from "../utils/authTokenInteraction";

const AuthContext = createContext<AuthContextProps>({authUser : null, 
    setAuthUser : () => {}});

export function AuthProvider({children} : {children: ReactNode; }) 
{
    const [authUser, setAuthUser] = useState<AuthUserDTO | null>(null);
    const [loading, setLoading] = useState(true);
    
     async function refreshAuthUser() {
         setLoading(true);
        const authService = new AuthService();
        let refreshedAuthUser : AuthUserDTO | null = null;
        try {
            const authToken = getAuthToken();
            if (authToken !== null && authToken !== "undefined"){
                refreshedAuthUser = await authService.refreshToken();
            }
        }
        catch (e){
            
        }
        finally {
            if (refreshedAuthUser?.user){
                setAuthUser(refreshedAuthUser);
                setAuthToken(refreshedAuthUser.token);
            }
            setLoading(false);
        }
        
    }   

    useEffect(  () => {
        refreshAuthUser();
        },[]);
        
    return (
        loading ? <></> :
        <AuthContext.Provider value={{authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

