import React, {FC, useEffect, useState} from 'react';
import './AuthComponent.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong, faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import AuthService from "../../Services/AuthService";
import {NavigateFunction, useNavigate} from "react-router-dom";
interface AuthComponentProps {}

const AuthComponent: FC<AuthComponentProps> = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isSubmitInvalid, setIsSubmitInvalid] = useState(false);
    
    const navigate : NavigateFunction = useNavigate();
    const ValidateEmail = (email : string) : boolean => {
        let result : boolean = true;
        const atSignIndex : number = email.lastIndexOf('@');
        if (!(atSignIndex > 0 && atSignIndex < email.lastIndexOf('.') && atSignIndex === email.indexOf('@') 
        && email.length - atSignIndex > 2))
        {
            result = false;
        }
        
        if (email.length < 5 || email.length > 50)
            result = false;
        return result;
    }
    
    let isEmailRegistered: boolean = false;
    let isFormInvalid = email.trim() === '';

    
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
            const result = await authService.IsEmailRegistered(email);
            isEmailRegistered = result;

            if (!isFormInvalid) {
                localStorage.setItem('email', email);   
                localStorage.setItem('isEmailRegistered', JSON.stringify(isEmailRegistered));
                navigate('/continue-auth');
            }
        }
        catch (error) 
        {
            console.error('Error checking email registration:', error);
        }
    }
    return (
        <div className="container">
            <div className="passpage-container">
                <div className="logo-container">
                    <span className="logo">HelperJobby</span>
                </div>
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
            </div>
        </div>
    )
};

export default AuthComponent;
