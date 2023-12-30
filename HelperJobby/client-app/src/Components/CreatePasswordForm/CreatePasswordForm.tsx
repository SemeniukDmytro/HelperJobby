import React, {FC, useContext, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong, faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import "./CreatePasswordForm.scss"
import AppLogo from "../AppLogo/AppLogo";
import "../../Assets/scssSharedStyles/AuthFormBox.scss";
import "../../Assets/scssSharedStyles/InputFieldWithError.scss";
import AuthService from "../../services/authService";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {IsValidPasswordMaximalLength, IsValidPasswordMinimalLength} from "../../utils/authFormValidators";
import {CreateUpdateUserDTO} from "../../DTOs/userRelatedDTOs/CreateUpdateUserDTO";
import {useAccountType} from "../../hooks/useAccountType";
import {useEmail} from "../../hooks/useEmail";
import EmailForm from "../EmailForm/EmailForm";


interface CreatePasswordFormProps {}

const CreatePasswordForm: FC<CreatePasswordFormProps> = () => {
    const {email, setEmail} = useEmail();
    const {accountType, setAccountType} = useAccountType();
    const {setAuthUser} = useAuth();

    const [password, setPassword] = useState("");
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [error, setError] = useState("");
    const [accountTypeChanger, setAccountTypeChanger] = useState<string>("");
    const [formTitle, setFormTitle] = useState("");
    
    const [renderEmailForm, setRenderEmailForm] = useState(false);

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
        
        let createdUser: CreateUpdateUserDTO = {
            password: password,
            email: email,
            accountType: accountType!,
        };

        try {
            let newUser = await authService.register(createdUser);
            localStorage.setItem("accessToken", newUser.token);
            console.log(newUser.token);
            console.log(localStorage.getItem("accessToken"))
            setAuthUser(newUser);
        } catch (error) {
            console.error("Error creating user:", error);
        }
        finally {
            navigate("/temp");
        }
    }
    
    
    
    useEffect(() => {
      if (accountType == "Employer"){
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
        setRenderEmailForm(true);
        setEmail("");
    }

    return (
        !renderEmailForm ? (
            <AppLogo>
            <div className="form-box">
                <div className="auth-form-container">
                    <div className="auth-form-title-box">
                        <span className="form-title">{formTitle}</span>
                    </div>
                    <div className="auth-form-subtitle-box subtitle-font-size">
                        <span className="form-subtitle">Signing up as&nbsp;</span>
                        <span className={"user-email"}>{email}</span>
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
                            <input className={`input-field ${isPasswordInvalid ? 'invalid-input-border' : ''}`} type="password" onChange={e => {
                                setPassword(e.target.value);
                                setError("");
                                setIsPasswordInvalid(false);
                            }}/>
                            {isPasswordInvalid &&
                                <div className={"error-box"}>
                                    <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                                    <span className={`error-text`}>Error : {error}</span>
                                </div>
                            }
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
            <EmailForm/>
        )
        
)};

export default CreatePasswordForm;
