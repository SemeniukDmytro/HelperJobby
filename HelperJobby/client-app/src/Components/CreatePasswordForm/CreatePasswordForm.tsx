import React, {FC, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong, faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import {useAuthContext} from "../../Contexts/EmailProviderContext";
import "./CreatePasswordForm.scss"
import {useAccountTypeContext} from "../../Contexts/AccountTypeContext";
import {IsValidPasswordMaximalLength, IsValidPasswordMinimalLength} from "../../Helpers/AuthValidators";
import AppLogo from "../AppLogo/AppLogo";
import AuthPage from "../AuthPage/AuthPage";
import "../../CommonStyles/AuthFormBox.scss";
import "../../CommonStyles/InputFieldWithError.scss";
import AuthService from "../../Services/AuthService";
import {CreateUserDTO} from "../../DTOs/UserDTOs/CreateUserDTO";
import {useAuth} from "../../Contexts/AuthContext";
import {useNavigate} from "react-router-dom";


interface CreatePasswordFormProps {}

const CreatePasswordForm: FC<CreatePasswordFormProps> = () => {
    let emailInfo = useAuthContext();
    let accountTypeContextInfo = useAccountTypeContext();
    
    const [password, setPassword] = useState("");
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [error, setError] = useState("");
    const [accountTypeChanger, setAccountTypeChanger] = useState<string>("");
    const [accountType, setAccountType] = useState(accountTypeContextInfo);
    const [formTitle, setFormTitle] = useState("");
    
    const [renderInitialAuthPage, setRenderInitialAuthPage] = useState(false);
    const [authUser, setAuthUser] = useAuth();
    const navigate = useNavigate();
    async function HandleAccountCreation(e: React.FormEvent<HTMLFormElement>) {
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
        
        const authService = new AuthService();

        let createdUser: CreateUserDTO = {
            password: password,
            email: emailInfo.email,
            accountType: accountType,
        };

        try {
            let newUser = await authService.RegisterNewUser(createdUser);
            setAuthUser(newUser); // Use the callback form of setAuthUser
            navigate('/temp');
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }
    
    useEffect(() => {
      if (accountTypeContextInfo == "Employer"){
        setAccountTypeChanger("a job seeker");
        setFormTitle("Create your employer account")
      }  
      else {
          setAccountTypeChanger("an employer")
          setFormTitle("Create your account");
      }
    },[]);
    
    function ChangeAccountType() {
        if (accountTypeChanger === "an employer"){
            setAccountType("Employer");
            setAccountTypeChanger("a job seeker");
            setFormTitle("Create your employer account");
        }
        else {
            setAccountType("Job seeker");
            setAccountTypeChanger("an employer");
            setFormTitle("Create your account");
        }
    }

    function goToInitialAuthPage() {
        setRenderInitialAuthPage(true);
    }

    return (
        !renderInitialAuthPage ? (
            <AppLogo>
            <div className="form-box">
                <div className="auth-form-container">
                    <div className="auth-form-title-box">
                        <span className="form-title">{formTitle}</span>
                    </div>
                    <div className="auth-form-subtitle-box subtitle-font-size">
                        <span className="form-subtitle">Signing up as&nbsp;</span>
                        <span className={"user-email"}>{emailInfo.email}</span>
                        <button className={"return-button"} onClick={goToInitialAuthPage}>
                            <span className={"return-button-text"}>(not you?)</span>
                        </button>
                    </div>
                    <form className="auth-input-box" onSubmit={HandleAccountCreation}>
                        <div className="input-label-box">
                            <label className={`input-label ${isPasswordInvalid ? 'error-text' : ''}`}>Password
                                <span className="required-mark"> *</span>
                            </label>
                            <span className={"password-subtitle"}>Use at least 8 characters</span>
                        </div>
                        <div className={`input-box`}>
                            <input className={`input-field`} type="password" onChange={e => {
                                setPassword(e.target.value);
                                setError("");
                                setIsPasswordInvalid(false);
                            }}/>
                            <div className={"error-box"}>
                                {isPasswordInvalid &&
                                    <>
                                        <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                                        <span className={`error-text`}>Error : {error}</span>
                                    </>
                                }
                            </div>
                        </div>
                        <button className="submit-button" type={"submit"}>
                            <span className="submit-button-text">Create account</span>
                        </button>
                    </form>
                    <div>
                        <a className={"type-change-button"} onClick={ChangeAccountType}>
                            <span className={"type-change-text"}>Wait, I am {accountTypeChanger}</span>
                            <FontAwesomeIcon className="type-continue-arrow" icon={faArrowRightLong}/>
                        </a>
                    </div>
                </div>
            </div>
        </AppLogo>
        ) :
        (
            <AuthPage/>
        )
        
)};

export default CreatePasswordForm;