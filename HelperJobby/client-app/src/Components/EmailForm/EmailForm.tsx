import React, {FC, useContext, useEffect, useState} from 'react';
import './EmailForm.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong, faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import AuthService from "../../services/authService";
import SignInForm from "../SignInForm/SignInForm";
import AccountTypeForm from "../AccountTypeForm/AccountTypeForm";
import AppLogo from "../AppLogo/AppLogo";
import "../../Assets/scssSharedStyles/AuthFormBox.scss";
import "../../Assets/scssSharedStyles/InputFieldWithError.scss";
import {IsValidEmail} from "../../utils/authFormValidators";
import {useEmail} from "../../hooks/useEmail";

interface AuthComponentProps {}

const EmailForm: FC<AuthComponentProps> = () => {
    const {email, setEmail} = useEmail();
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

        if (!IsValidEmail(email)) {
            setError("Error: Invalid email address\n");
            setIsSubmitInvalid(true);
            isFormInvalid = true;
            return;
        } else {
            setError("");
        }

        try {
            const authService = new AuthService();
            setCheckEmailInProcess(true);

            const isEmailRegisteredValue = await authService.isEmailRegistered(email);

            setIsEmailRegistered(isEmailRegisteredValue);
        } catch (error) {
            console.error('Error checking email registration:', error);
        } finally {
            setCheckEmailInProcess(false);
        }
    };

    

    return (
        <>
            {renderAuthPage && (
                <AppLogo>
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
                                    <label className={`input-label ${isSubmitInvalid ? 'error-text' : ''}`}>Email address
                                        <span className="required-mark"> *</span>
                                    </label>
                                </div>
                                <div className={`input-box`}>
                                    <input className={`input-field ${isSubmitInvalid ? 'invalid-input-border' : ''}`} value={email} type="text"
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
