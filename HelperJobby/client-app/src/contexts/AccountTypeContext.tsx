    import {createContext, ReactNode, useState} from "react";
import {AccountTypeContextProps} from "../contextTypes/AccountTypeContextProps";

const AccountTypeContext = createContext<AccountTypeContextProps>({
    accountType: null,
    setAccountType: () => {
    }
});

export function AccountTypeProvider({children}: { children: ReactNode }) {
    const [accountType, setAccountType] = useState<string | null>(null);

    return (
        <AccountTypeContext.Provider value={{accountType, setAccountType}}>
            {children}
        </AccountTypeContext.Provider>
    )
}

export default AccountTypeContext;