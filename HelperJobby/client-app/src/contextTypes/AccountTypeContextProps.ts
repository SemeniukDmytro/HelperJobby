import {Dispatch, SetStateAction} from "react";

export interface AccountTypeContextProps {
    accountType: string | null
    setAccountType: Dispatch<SetStateAction<string | null>>;
}