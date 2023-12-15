import React, {FC, useState} from 'react';
import './AuthComponent.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong, faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import AuthService from "../../Services/AuthService";
import AuthContext from "../../Contexts/AuthContext";
import {ValidateEmail} from "../../Helpers/EmailValidator";
import SignInForm from "../PasswordForm/SignInForm";

interface AuthComponentProps {}

const AuthComponent: FC<AuthComponentProps> = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isSubmitInvalid, setIsSubmitInvalid] = useState(false);
    const [renderPasswordForm, setRenderPasswordForm] = useState(false);
    
    let isEmailRegistered: boolean = false;
    let isFormInvalid = email.trim() === '';
    let checkEmailInProcess = true;

    
    const  onFormSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!ValidateEmail(email)){
            setError("Error: Invalid email address\n")
            setIsSubmitInvalid(true);
            isFormInvalid = true;
        }
        else 
        {
            setError("")
        }

        try {
            const authService = new AuthService();
            isEmailRegistered = await authService.IsEmailRegistered(email).finally(() => checkEmailInProcess = false);
            if (!checkEmailInProcess){
                setRenderPasswordForm(true);
            }
        }
        catch (error) 
        {
            console.error('Error checking email registration:', error);
        }
    }
    
    
    return (
        <AuthContext.Provider value={{email: email, isRegisteredUser: isEmailRegistered}}>
            <div className="container">
                <div className="passpage-container">
                    <div className="logo-container">
                        <span className="logo">HelperJobby</span>
                    </div>
                    {!renderPasswordForm ? (
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
                    )
                        :
                        <SignInForm>
                        </SignInForm>
                    }
                    
                </div>
            </div>
        </AuthContext.Provider>
    )
};

export default AuthComponent;
