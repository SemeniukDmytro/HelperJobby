import React, {FC} from "react";
import {EmailProvider} from "../../context/EmailContext";
import {AccountTypeProvider} from "../../context/AccountTypeContext";
import EmailForm from "../../Components/EmailForm/EmailForm";

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