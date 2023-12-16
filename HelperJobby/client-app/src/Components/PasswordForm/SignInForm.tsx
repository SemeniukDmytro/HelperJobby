import React, {FC, useContext, useEffect} from 'react';
import '../AuthComponent/AuthComponent.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong, faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import {useAuthContext} from "../../Contexts/AuthContext";

interface PasswordFormProps {}

const SignInForm: FC<PasswordFormProps> = () =>
{
    const emailInfo = useAuthContext();


    async function  AuthUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
    }

    return (
        <div className="form-box">
            <div className="auth-form-container">
                <div className="auth-form-title-box">
                    <span className="form-title">Welcome back!</span>
                </div>
                <div className="auth-form-subtitle-box">
                    <span className="form-subtitle">Keep your account safe.</span>
                </div>
                <form className="auth-input-box" onSubmit={AuthUser}>
                    <div className="input-label-box">
                        <label className={`input-label`}>Email address
                            <span className="required-mark"> *</span>
                        </label>
                    </div>
                    <div className={`input-box`}>
                        <input className={`email-input-field`} type="text"/>
                    </div>
                    <button className="submit-button">
                        <span className="continue-text">Rwa</span>
                        <FontAwesomeIcon className="continue-arrow" icon={faArrowRightLong} />
                    </button>
                </form>
            </div>
        </div>
    )
};
    

export default SignInForm;
