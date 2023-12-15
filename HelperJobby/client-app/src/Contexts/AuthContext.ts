import {createContext, useContext} from "react";
import {EmailInfo} from "../ContextsTypes/EmailInfo";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext<EmailInfo | undefined>(undefined);

export default AuthContext;
export function useAuthContext() : EmailInfo {
    const navigate = useNavigate();
    let emailInfo = useContext(AuthContext);
    console.log(emailInfo);
    if (emailInfo === undefined){
        return {email: "", isRegisteredUser: false};
    }
    return emailInfo;
}