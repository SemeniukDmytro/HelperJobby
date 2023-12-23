import AuthService from "../services/authService";
import {getAuthToken, setAuthToken} from "./AuthTokenInteraction";

export async function addAuthHeader(headers : { [key: string]: string }) : Promise<{ [key: string]: string }> {
    let accessToken = getAuthToken();
    if (accessToken) {
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
            setAuthToken(authUser.token);
        }
    }
    return headers;
}