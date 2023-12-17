import {createContext, useContext} from "react";

const AccountTypeContext = createContext<string>("");

export default AccountTypeContext;
export function useAccountTypeContext() : string {
    return useContext(AccountTypeContext);
}