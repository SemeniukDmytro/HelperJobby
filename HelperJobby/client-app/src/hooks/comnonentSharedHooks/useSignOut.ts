import {Dispatch, SetStateAction, useCallback} from "react";
import AuthService from "../../services/authService";
import {removeAuthToken} from "../../utils/authTokenInteraction";
import {logErrorInfo} from "../../utils/logErrorInfo";
import {AuthUserDTO} from "../../DTOs/userRelatedDTOs/AuthUserDTO";


export const useSignOut = (setAuthUser: Dispatch<SetStateAction<AuthUserDTO | null>>) => {
    const authService = new AuthService();

    const signOut = useCallback(async () => {
        try {
            await authService.revokeToken();
            removeAuthToken();
            window.location.reload();
            setAuthUser(null);

        } catch (error) {
            logErrorInfo(error)
        }
    }, [setAuthUser])

    return {signOut}
}