import {removeAuthToken} from "../utils/authTokenInteraction";
import {ServerError} from "../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../utils/logErrorInfo";
import {Dispatch, SetStateAction, useCallback} from "react";
import {AuthUserDTO} from "../DTOs/userRelatedDTOs/AuthUserDTO";
import AuthService from "../services/authService";

export const useSignOut = (setAuthUser: Dispatch<SetStateAction<AuthUserDTO | null>>) => {
    const authService = new AuthService();

    const signOut = useCallback(async () => {
        try {
            await authService.revokeToken();
            removeAuthToken();
            window.location.reload();
            setAuthUser(null);

        } catch (error) {
            if (error instanceof ServerError) {
                logErrorInfo(error);
            }
        }
    }, [setAuthUser])

    return {signOut}
}