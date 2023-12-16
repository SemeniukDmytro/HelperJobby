import {createContext, useContext} from "react";

const AccountTypeContext = createContext<string>("");

export default AccountTypeContext;
export function useAuthContext() : string {
    return useContext(AccountTypeContext);
}