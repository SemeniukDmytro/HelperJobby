import {createContext, useContext} from "react";
import {EmailInfo} from "../ContextsTypes/EmailInfo";

const AuthContext = createContext<EmailInfo | undefined>(undefined);

export default AuthContext;
export function useAuthContext() : EmailInfo {
    let emailInfo = useContext(AuthContext);
    if (emailInfo === undefined){
        return {email: "", isRegisteredUser: false};
    }
    return emailInfo;
}