import React, {FC} from "react";
import {EmailProvider} from "../../contexts/EmailContext";
import {AccountTypeProvider} from "../../contexts/AccountTypeContext";
import EmailForm from "./PageComponents/EmailForm/EmailForm";

interface AuthPageProps{
    
}

const AuthPage: FC<AuthPageProps> = () => {
    
    return(
        <EmailProvider>
            <AccountTypeProvider>
                <EmailForm/>
            </AccountTypeProvider>
        </EmailProvider>
    )
}

export default AuthPage;