import React, {FC, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import AppLogo from "../AppLogo/AppLogo";
import EmailForm from "../EmailForm/EmailForm";
import "./SignInForm.scss";
import {useLocation, useNavigate} from "react-router-dom";
import {useEmail} from "../../../../hooks/useEmail";
import {useAuth} from "../../../../hooks/useAuth";
import AuthService from "../../../../services/authService";
import {LoginUserDTO} from "../../../../DTOs/userRelatedDTOs/LoginUserDTO";
import {setAuthToken} from "../../../../utils/authTokenInteraction";
import {ServerError} from "../../../../ErrorDTOs/ServerErrorDTO";
import NotifyPopupWindow from "../../../../Components/NotifyPopupWindow/NotifyPopupWindow";
import {
    IsValidPasswordMaximalLength,
    IsValidPasswordMinimalLength
} from "../../../../utils/validationLogic/authFormValidators";
import CustomPasswordInputField from "../../../../Components/CustomPasswordInputField/CustomPasswordInputField";

interface SignInFormProps {
}

const SignInForm: FC<SignInFormProps> = () => {
    const {email, setEmail} = useEmail();
    const {setAuthUser} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || "/";

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [isSuccessfulNotify, setIsSuccessfulNotify] = useState(false);
    const [notifyMessage, setNotifyMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    
    const [renderEmailForm, setRenderEmailForm] = useState(false);

    const isEmptyPassword = password.trim() == "";
    const authService: AuthService = new AuthService();

    async function AuthUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!IsValidPasswordMaximalLength(password)) {
            setIsPasswordInvalid(true);
            setError("Please enter password less than 25 characters long")
            return;
        } else if (!IsValidPasswordMinimalLength(password)) {
            setIsPasswordInvalid(true);
            setError("Please enter a password at least 8 characters long")
            return;
        }

        const loginUserDTO: LoginUserDTO =
            {
                email: email,
                password: password
            }

        try {
            const authUser = await authService.login(loginUserDTO);
            setAuthToken(authUser.token);
            setAuthUser(authUser);
            navigate(from);
        } catch (error) {
            if (error instanceof ServerError) {
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
                    {showPopup && <NotifyPopupWindow
                        isSuccessful={isSuccessfulNotify}
                        text={notifyMessage}
                        showNotify={showPopup}
                        setShowNotify={setShowPopup}/>}
                    <div className="passpage-form-layout">
                        <div className="passpage-form-box">
                            <div className="passpage-form-title-box">
                                <span className="form-title">Welcome back!</span>
                            </div>
                            <div className="passpage-form-subtitle-box">
                                <span className="form-subtitle">Keep your account safe.</span>
                            </div>
                            <div className={"email-clarification-box"}>
                                <span className="email-clarification-default-text">Continue as&nbsp;</span>
                                <span className={"user-email"}>{email}</span>
                                <button className={"return-button"} onClick={goToInitialAuthPage}>
                                    <span className={"return-button-text"}>(not you?)</span>
                                </button>
                            </div>
                            <div className={"content-separation-margin"}></div>
                            <form className="passpage-form" onSubmit={AuthUser}>
                                <CustomPasswordInputField
                                    password={password} 
                                    setPassword={setPassword}
                                    fieldLabel={"Enter your password"}
                                    fieldError={error}
                                    setFieldError={setError}
                                    showRequiredMark={true}/>
                                <button className="blue-button" disabled={isEmptyPassword}>
                                    <span>Sign in</span>
                                    <FontAwesomeIcon className="continue-arrow medium-svg" icon={faArrowRightLong}/>
                                </button>
                            </form>
                        </div>
                    </div>
                </AppLogo>
            )
    )
};


export default SignInForm;
