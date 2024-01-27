import React, {FC, useContext, useEffect, useState} from 'react';
import './EmailForm.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong, faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import SignInForm from "../SignInForm/SignInForm";
import AccountTypeForm from "../AccountTypeForm/AccountTypeForm";
import AppLogo from "../AppLogo/AppLogo";
import {useEmail} from "../../../../hooks/useEmail";
import AuthService from "../../../../services/authService";
import {IsValidEmail} from "../../../../utils/validationLogic/authFormValidators";
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";

interface AuthComponentProps {}

const EmailForm: FC<AuthComponentProps> = () => {
    const {email, setEmail} = useEmail();
    const [error, setError] = useState("");
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isEmailRegistered, setIsEmailRegistered] = useState<boolean | null>(null);
    
    const [renderAuthPage, setRenderAuthPage] = useState(true);
    const [renderSignInPage, setRenderSignInPage] = useState(false);
    const [renderAccountTypeForm, setRenderAccountTypeForm] = useState(false);
    const [isFormInvalid, setIsFormInvalid] = useState(true);

    useEffect(() => {
        if (email.trim().length == 0){
            setIsFormInvalid(true);
        }
        else {
            setIsFormInvalid(false);
        }
    }, [email]);
    
    
    useEffect(() => { 
        if (isEmailRegistered != null){
            setRenderAuthPage(false);
            if (isEmailRegistered) {
                setRenderSignInPage(true);
            }
            else{
                setRenderAccountTypeForm(true);
            }
        }
    }, [isEmailRegistered]);
    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!IsValidEmail(email)) {
            setError("Error: Invalid email address\n");
            setIsEmailInvalid(true);
            setIsFormInvalid(true);
            return;
        } else {
            setError("");
        }

        try {
            const authService = new AuthService();

            const response = await authService.isEmailRegistered(email);
            setIsEmailRegistered(response);
        } catch (error) {
            console.error('Error checking email registration:', error);
        }
    };

    

    return (
        <>
            {renderAuthPage && (
                <AppLogo>
                    <div className="passpage-form-layout">
                        <div className="passpage-form-box">
                            <div className="passpage-form-title-box">
                                <span className="form-title">Ready to take next step?</span>
                            </div>
                            <div className="passpage-form-subtitle-box">
                                <span className="form-subtitle">Create an account or sign in.</span>
                            </div>
                            <div className={"content-separation-margin"}></div>
                            <form className="passpage-form" onSubmit={onFormSubmit}>
                                <CustomInputField fieldLabel={"Email address"}
                                                  isRequired={true}
                                                  inputFieldValue={email}
                                                  setInputFieldValue={setEmail} 
                                                  customErrorMessage={error}
                                                  setCustomErrorMessage={setError}/>
                                <button className="blue-button" type={"submit"} disabled={isFormInvalid}>
                                    <span>Continue</span>
                                    <FontAwesomeIcon className="continue-arrow medium-svg" icon={faArrowRightLong} />
                                </button>
                            </form>
                        </div>
                    </div>
                </AppLogo>
                )
            }
            { renderSignInPage && <SignInForm/>}
            { renderAccountTypeForm && <AccountTypeForm/>}
        </>
    )
};

export default EmailForm;
