import {createContext, ReactNode, useContext, useState} from "react";
import {EmailContextProps} from "../contextTypes/EmailContextProps";
import AccountTypeContext from "./AccountTypeContext";

const EmailContext = createContext<EmailContextProps>(
    {email : "", setEmail : () => {}});

export function EmailProvider({children} : {children : ReactNode}){
    const [email, setEmail] = useState<string>("");

    return (
        <EmailContext.Provider  value={{ email, setEmail }}>
            {children}
        </EmailContext.Provider>
    )
}
export default EmailContext;