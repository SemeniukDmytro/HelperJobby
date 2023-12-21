import {createContext, useContext} from "react";
import {EmailProviderContextProps} from "../ContextsTypes/EmailProviderContextProps";

const EmailProviderContext = createContext<EmailProviderContextProps | undefined>(undefined);

export default EmailProviderContext;
export function useAuthContext() : EmailProviderContextProps {
    let emailInfo = useContext(EmailProviderContext);
    if (emailInfo === undefined){
        return {email: "", isRegisteredUser: false};
    }
    return emailInfo;
}