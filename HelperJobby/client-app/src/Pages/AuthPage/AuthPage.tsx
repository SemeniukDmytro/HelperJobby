import React, {FC} from "react";
import EmailForm from "../../Components/EmailForm/EmailForm";
import {EmailProvider} from "../../contexts/EmailContext";
import {AccountTypeProvider} from "../../contexts/AccountTypeContext";

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