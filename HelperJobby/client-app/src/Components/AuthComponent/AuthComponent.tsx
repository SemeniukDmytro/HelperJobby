import React, {FC, useEffect, useState} from 'react';
import './AuthComponent.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong, faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import AuthService from "../../Services/AuthService";
import AuthContext from "../../Contexts/AuthContext";
import {ValidateEmail} from "../../Helpers/EmailValidator";
import SignInForm from "../PasswordForm/SignInForm";
import AccountTypeForm from "../AccountTypeForm/AccountTypeForm";
import {useNavigate} from "react-router-dom";

interface AuthComponentProps {}

const AuthComponent: FC<AuthComponentProps> = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isSubmitInvalid, setIsSubmitInvalid] = useState(false);
    const [isEmailRegistered, setIsEmailRegistered] = useState(false);
    const [checkEmailInProcess, setCheckEmailInProcess] = useState(true);
    
    const [renderAuthPage, setRenderAuthPage] = useState(true);
    const [renderSignInPage, setRenderSignInPage] = useState(false);
    const [renderAccountTypeForm, setRenderAccountTypeForm] = useState(false);
    
    let isFormInvalid = email.trim() === '';

    useEffect(() => {
        if (!checkEmailInProcess) {
            setRenderAuthPage(false);

            if (isEmailRegistered) {
                setRenderSignInPage(true);
            } 
            else {
                setRenderAccountTypeForm(true);
            }
        }
    }, [checkEmailInProcess, isEmailRegistered]);
    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!ValidateEmail(email)) {
            setError("Error: Invalid email address\n");
            setIsSubmitInvalid(true);
            isFormInvalid = true;
        } else {
            setError("");
        }

        try {
            const authService = new AuthService();

            // Show loading indicator
            setCheckEmailInProcess(true);

            const isEmailRegisteredValue = await authService.IsEmailRegistered(email);

            setIsEmailRegistered(isEmailRegisteredValue);
        } catch (error) {
            console.error('Error checking email registration:', error);
        } finally {
            setCheckEmailInProcess(false);
        }
    };

    const navigate = useNavigate();
    function GoToDefaultPage() {
        navigate("/");
    }

    return (
        <AuthContext.Provider value={{email: email, isRegisteredUser: isEmailRegistered}}>
            <div className="container">
                <div className="passpage-container">
                    <div className="logo-container" onClick={GoToDefaultPage}>
                        <span className="logo">HelperJobby</span>
                    </div>
                    {renderAuthPage && (
                        <div className="form-box">
                            <div className="auth-form-container">
                                <div className="auth-form-title-box">
                                    <span className="form-title">Ready to take next step?</span>
                                </div>
                                <div className="auth-form-subtitle-box">
                                    <span className="form-subtitle">Create an account or sign in.</span>
                                </div>
                                <form className="auth-input-box" onSubmit={onFormSubmit}>
                                    <div className="input-label-box">
                                        <label className={`input-label ${isSubmitInvalid ? 'invalid-text' : ''}`}>Email address
                                            <span className="required-mark"> *</span>
                                        </label>
                                    </div>
                                    <div className={`input-box`}>
                                        <input className={`email-input-field ${isSubmitInvalid ? 'invalid-input-border' : ''}`} value={email} type="text"
                                               onChange={(e) => {setEmail(e.target.value);
                                                   setError("");
                                                   setIsSubmitInvalid(false)}}/>
                                        <div className={"error-box"}>
                                            {isSubmitInvalid &&
                                                <>
                                                    <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation} />
                                                    <span className={`error-text`}>{error}</span>
                                                </>
                                            }
                                        </div>
                                    </div>
                                    <button className="submit-button" type={"submit"} disabled={isFormInvalid}>
                                        <span className="continue-text">Continue</span>
                                        <FontAwesomeIcon className="continue-arrow" icon={faArrowRightLong} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                    { renderSignInPage &&
                        (
                            <SignInForm>
                            </SignInForm>
                        )
                    }
                    { renderAccountTypeForm &&
                        (
                            <AccountTypeForm>
                            </AccountTypeForm>
                        )
                    }
                </div>
            </div>
        </AuthContext.Provider>
    )
};

export default AuthComponent;
