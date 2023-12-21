import {AuthUserDTO} from "../DTOs/UserDTOs/AuthUserDTO";
import {Dispatch, SetStateAction} from "react";

export interface AuthContextProps {
    authUser: AuthUserDTO | null
    setAuthUser: Dispatch<SetStateAction<AuthUserDTO | null>>;
}