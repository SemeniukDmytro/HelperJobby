import {Dispatch, SetStateAction} from "react";
import {AuthUserDTO} from "../DTOs/userRelatedDTOs/AuthUserDTO";

export interface AuthContextProps {
    authUser: AuthUserDTO | null
    setAuthUser: Dispatch<SetStateAction<AuthUserDTO | null>>;
}