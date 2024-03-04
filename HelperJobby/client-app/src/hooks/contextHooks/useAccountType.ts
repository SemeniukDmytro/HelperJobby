import {useContext} from "react";
import AccountTypeContext from "../../contexts/AccountTypeContext";

export function useAccountType() {
    return useContext(AccountTypeContext);
}