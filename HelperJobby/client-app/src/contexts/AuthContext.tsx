import {createContext, ReactNode, useEffect, useState} from "react";
import AuthService from "../services/authService";
import {AuthContextProps} from "../contextTypes/AuthContextProps";
import {AuthUserDTO} from "../DTOs/userRelatedDTOs/AuthUserDTO";
import {getAuthToken, setAuthToken} from "../utils/authTokenInteraction";
import LoadingPage from "../Components/LoadingPage/LoadingPage";

const AuthContext = createContext<AuthContextProps>({
    authUser: null,
    setAuthUser: () => {
    }
});

export function AuthProvider({children}: { children: ReactNode; }) {
    const [authUser, setAuthUser] = useState<AuthUserDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const authService = new AuthService();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const authToken = getAuthToken();
                if (authToken !== null && authToken !== "undefined") {
                    const refreshedAuthUser = await authService.refreshToken();
                    if (refreshedAuthUser?.user) {
                        setAuthUser(refreshedAuthUser);
                        setAuthToken(refreshedAuthUser.token);
                    }
                }
            } catch (e) {
            } finally {
                setLoading(false);
            }

        };

        fetchData();
    }, []);

    return (
        loading ? <LoadingPage></LoadingPage> :
            <AuthContext.Provider value={{authUser, setAuthUser}}>
                {children}
            </AuthContext.Provider>
    );
}

export default AuthContext;

