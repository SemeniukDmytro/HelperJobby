import AuthService from "../services/authService";
import {getAuthToken, setAuthToken} from "./authTokenInteraction";

export async function addAuthHeader(headers : { [key: string]: string }) : Promise<{ [key: string]: string }> {
    let accessToken = getAuthToken();
    if (accessToken && accessToken !== "undefined") {
        headers = {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
        };
        const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
        const expirationTime = decodedToken.exp;
        const isTokenExpired = Date.now() >= expirationTime * 1000; 
        if (isTokenExpired){
            const authService = new AuthService();
            const authUser = await authService.refreshToken();
            if (authUser.token && authUser.token !== "undefined" && authUser.token !== undefined){
                setAuthToken(authUser.token);
            }
        }
    }
    return headers;
}