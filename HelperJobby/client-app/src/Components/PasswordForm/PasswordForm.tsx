import React, {FC, useContext, useEffect} from 'react';
import '../AuthComponent/AuthComponent.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong, faCircleExclamation} from "@fortawesome/free-solid-svg-icons";

interface PasswordFormProps {}

const PasswordForm: FC<PasswordFormProps> = () =>
{
    let isRegisteredUser : boolean;
    let userEmail : string;
    
   
    const storedEmail = localStorage.getItem('email');
    const storedIsEmailRegistered = localStorage.getItem('isEmailRegistered');
    userEmail = storedEmail || '';
    isRegisteredUser = storedIsEmailRegistered ? true : false;
    let titleText : string;
    if (isRegisteredUser){
        titleText = "Welcome back";
    }
    else {
        titleText = "Create your account"
    }
    //let titleText : string = isRegisteredUser ? "Welcome back" : "Create your account";
    
    return (
        <div className="container">
            <div className="passpage-container">
                <div className="logo-container">
                    <span className="logo">HelperJobby</span>
                </div>
                <div className="form-box">
                    <div className="auth-form-container">
                        <div className="auth-form-title-box">
                            <span className="form-title">{titleText}</span>
                        </div>
                        <div className="auth-form-subtitle-box">
                            <span className="form-subtitle">Create an account or sign in.</span>
                        </div>
                        <form className="auth-input-box">
                            <div className="input-label-box">
                                <label className={`input-label`}>Email address
                                    <span className="required-mark"> *</span>
                                </label>
                            </div>
                            <div className={`input-box`}>
                                <input className={`email-input-field`} type="text"/>
                            </div>
                            <button className="submit-button" type={"submit"}>
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
    

export default PasswordForm;
