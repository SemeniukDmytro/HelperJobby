import React, {FC, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong, faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import AppLogo from "../AppLogo/AppLogo";
import "../../Assets/scssSharedStyles/AuthFormBox.scss";
import "../../Assets/scssSharedStyles/InputFieldWithError.scss";
import {useEmail} from "../../hooks/useEmail";
import EmailForm from "../EmailForm/EmailForm";
import "./SignInForm.scss";
import {IsValidPasswordMaximalLength, IsValidPasswordMinimalLength} from "../../utils/authFormValidators";
import {LoginUserDTO} from "../../DTOs/userRelatedDTOs/LoginUserDTO";
import AuthService from "../../services/authService";
import {setAuthToken} from "../../utils/authTokenInteraction";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import NotifyPopupWindow from "../NotifyPopupWindow/NotifyPopupWindow";
import {ServerError} from "../../ErrorDTOs/ServerErrorDTO";

interface SignInFormProps {}

const SignInForm: FC<SignInFormProps> = () =>
{
    const {email, setEmail} = useEmail();
    const {setAuthUser} = useAuth();
    const navigate = useNavigate();
    
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [isSuccessfulNotify, setIsSuccessfulNotify] = useState(false);
    const [notifyMessage, setNotifyMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    
    const [renderEmailForm, setRenderEmailForm] = useState(false);
    
    const isEmptyPassword = password.trim() == "";
    const authService : AuthService = new AuthService();

    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showPopup]);
    
    async function  AuthUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!IsValidPasswordMaximalLength(password)){
            setIsPasswordInvalid(true);
            setError("Please enter password less than 25 characters long")
            return;
        }
        else if (!IsValidPasswordMinimalLength(password)) {
            setIsPasswordInvalid(true);
            setError("Please enter a password at least 8 characters long")
            return;
        }
        
        const loginUserDTO : LoginUserDTO = 
            {email : email,
            password : password}
        
        try {
            const authUser = await authService.login(loginUserDTO);
            setAuthToken(authUser.token);
            setAuthUser(authUser);
            navigate("/temp");
        }
        catch (error) {
            if (error instanceof ServerError){
                setIsSuccessfulNotify(false);
                setNotifyMessage(error.ServerErrorDTO.detail);
                setShowPopup(true);
            }
        }
    }

    function goToInitialAuthPage() {
        setRenderEmailForm(true);
        setEmail("");
    }

    return (
        renderEmailForm ? (<EmailForm/>) :
            (
                <AppLogo>
                    {showPopup && <NotifyPopupWindow isSuccessful={isSuccessfulNotify} text={notifyMessage}/>}
                    <div className="form-box">
                        <div className="auth-form-container">
                            <div className="auth-form-title-box">
                                <span className="form-title">Welcome back!</span>
                            </div>
                            <div className="auth-form-subtitle-box">
                                <span className="form-subtitle">Keep your account safe.</span>
                            </div>
                            <div className={"email-clarification-box"}>
                                <span className="email-clarification-default-text">Continue as&nbsp;</span>
                                <span className={"user-email"}>{email}</span>
                                <button className={"return-button"} onClick={goToInitialAuthPage}>
                                    <span className={"return-button-text"}>(not you?)</span>
                                </button>
                            </div>
                            <form className="auth-input-box" onSubmit={AuthUser}>
                                <div className="input-label-box">
                                    <label className={`input-label ${isPasswordInvalid ? 'error-text' : ''}`}>Enter your password
                                        <span className="required-mark"> *</span>
                                    </label>
                                </div>
                                <div className={`input-box`}>
                                    <input className={`input-field ${isPasswordInvalid ? 'invalid-input-border' : ''}`}
                                           type="password" value={password} 
                                           onChange={e => {
                                               setPassword(e.target.value)
                                               setIsPasswordInvalid(false);
                                           }}/>
                                    {isPasswordInvalid &&
                                        <div className={"error-box"}>
                                            <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                                            <span className={`error-text`}>Error : {error}</span>
                                        </div>
                                    }
                                </div>
                                <button className="submit-button" disabled={isEmptyPassword}>
                                    <span className="submit-button-text">Sign in</span>
                                    <FontAwesomeIcon className="continue-arrow" icon={faArrowRightLong}/>
                                </button>
                            </form>
                        </div>
                    </div>
                </AppLogo>
            )
    )
};
    

export default SignInForm;
