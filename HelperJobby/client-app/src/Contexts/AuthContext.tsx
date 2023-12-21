import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {AuthUserDTO} from "../DTOs/UserDTOs/AuthUserDTO";
import {AuthContextProps} from "../ContextsTypes/AuthContextProps";

const AuthContext = createContext<AuthContextProps | null>(null);

export function useAuth(): [AuthUserDTO | null, Dispatch<SetStateAction<AuthUserDTO | null>>] {
    const authUserInfo = useContext(AuthContext);

    if (authUserInfo?.authUser === undefined) {
        return [null, (() => {}) as Dispatch<SetStateAction<AuthUserDTO | null>>];
    }

    return [authUserInfo?.authUser, authUserInfo?.setAuthUser];
}

export function AuthProvider({
                                 user,
                                 setAuthUser,
                                 children
                             }: {
    user: AuthUserDTO | null;
    setAuthUser: Dispatch<SetStateAction<AuthUserDTO | null>>;
    children: ReactNode;
}) {
    return (
        <AuthContext.Provider value={{ authUser: user, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}

