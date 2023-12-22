import {useContext} from "react";
import AccountTypeContext from "../context/AccountTypeContext";

export function useAccountType()  {
    return useContext(AccountTypeContext);
}