import React, {FC, useContext, useEffect, useState} from 'react';
import './EmailForm.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong, faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import SignInForm from "../SignInForm/SignInForm";
import AccountTypeForm from "../AccountTypeForm/AccountTypeForm";
import AppLogo from "../AppLogo/AppLogo";
import "../../../../Assets/scssSharedStyles/AuthFormBox.scss";
import "../../../../Assets/scssSharedStyles/InputFieldWithError.scss";
import {useEmail} from "../../../../hooks/useEmail";
import AuthService from "../../../../services/authService";
import {IsValidEmail} from "../../../../utils/validationLogic/authFormValidators";

interface AuthComponentProps {}

const EmailForm: FC<AuthComponentProps> = () => {
    const {email, setEmail} = useEmail();
    const [error, setError] = useState("");
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isEmailRegistered, setIsEmailRegistered] = useState<boolean | null>(null);
    
    const [renderAuthPage, setRenderAuthPage] = useState(true);
    const [renderSignInPage, setRenderSignInPage] = useState(false);
    const [renderAccountTypeForm, setRenderAccountTypeForm] = useState(false);
    
    let isFormInvalid = email.trim() === '';
    
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
            isFormInvalid = true;
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
                            <form className="auth-input-box" onSubmit={onFormSubmit}>
                                <div className="input-label-box">
                                    <label className={`input-label ${isEmailInvalid ? 'error-text' : ''}`}>Email address
                                        <span className="required-mark"> *</span>
                                    </label>
                                </div>
                                <div className={`input-box`}>
                                    <input 
                                        className={`input-field ${isEmailInvalid ? 'invalid-input-border' : ''}`}
                                        value={email}
                                        type="email"
                                        autoComplete={"email"}
                                           onChange={(e) => {setEmail(e.target.value);
                                               setError("");
                                               setIsEmailInvalid(false)}}/>
                                    <div className={"error-box"}>
                                        {isEmailInvalid &&
                                            <>
                                                <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation} />
                                                <span className={`error-text`}>{error}</span>
                                            </>
                                        }
                                    </div>
                                </div>
                                <button className="submit-button" type={"submit"} disabled={isFormInvalid}>
                                    <span className="submit-button-text">Continue</span>
                                    <FontAwesomeIcon className="continue-arrow" icon={faArrowRightLong} />
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
