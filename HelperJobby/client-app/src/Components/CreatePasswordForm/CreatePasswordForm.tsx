import React, {FC, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong, faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import {useAuthContext} from "../../Contexts/AuthContext";

import "./CreatePasswordForm.scss"
import {useAccountTypeContext} from "../../Contexts/AccountTypeContext";
import {IsValidPasswordMaximalLength, IsValidPasswordMinimalLength} from "../../Helpers/AuthValidators";


interface CreatePasswordFormProps {}

const CreatePasswordForm: FC<CreatePasswordFormProps> = () => {
    let emailInfo = useAuthContext();
    let accountTypeInfo = useAccountTypeContext();
    
    const [password, setPassword] = useState("");
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [error, setError] = useState("");
    const [accountType, setAccountType] = useState<string>("");
    const [formTitle, setFormTitle] = useState("");
    
    function HandleAccountCreation(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!IsValidPasswordMaximalLength(password)){
            setIsPasswordInvalid(true);
            setError("Please enter password less than 25 characters long")
        }
        else if (!IsValidPasswordMinimalLength(password)) {
            setIsPasswordInvalid(true);
            setError("Please enter a password at least 8 characters long")
        }
        else {
            setIsPasswordInvalid(false);
            setError("");
        }
    }
    
    useEffect(() => {
      if (accountTypeInfo == "Employer"){
        setAccountType("a job seeker");
        setFormTitle("Create your employer account")
      }  
      else {
          setAccountType("an employer")
          setFormTitle("Create your account");
      }
    },[]);
    
    function ChangeAccountType() {
        if (accountType === "an employer"){
            accountTypeInfo = "Employer";
            setAccountType("a job seeker");
            setFormTitle("Create your employer account");
        }
        else {
            accountTypeInfo = "Job seeker";
            setAccountType("an employer");
            setFormTitle("Create your account");
        }
    }

    return (
    <div className="form-box">
        <div className="auth-form-container">
            <div className="auth-form-title-box">
                <span className="form-title">{formTitle}</span>
            </div>
            <div className="auth-form-subtitle-box subtitle-font-size">
                <span className="form-subtitle">Signing up as&nbsp;</span>
                <span className={"user-email"}>{emailInfo.email}</span>
                <button className={"return-button"}>
                    <span className={"return-button-text"}>(not you?)</span>
                </button>
            </div>
            <form className="auth-input-box" onSubmit={HandleAccountCreation}>
                <div className="input-label-box">
                    <label className={`input-label`}>Password
                        <span className="required-mark"> *</span>
                    </label>
                    <span className={"password-subtitle"}>Use at least 8 characters</span>
                </div>
                <div className={`input-box`}>
                    <input className={`email-input-field`} type="password" onChange={e => {
                        setPassword(e.target.value);
                        setError("");
                        setIsPasswordInvalid(false);
                    }}/>
                    <div className={"error-box"}>
                        {isPasswordInvalid &&
                            <>
                                <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation} />
                                <span className={`error-text`}>Error : {error}</span>
                            </>
                        }
                    </div>
                </div>
                <button className="submit-button" type={"submit"}>
                    <span className="continue-text">Create account</span>
                </button>
            </form>
            <div>
                <a className={"type-change-button"} onClick={ChangeAccountType}>
                    <span className={"type-change-text"}>Wait, I am {accountType}</span>
                    <FontAwesomeIcon className="type-continue-arrow" icon={faArrowRightLong} />
                </a>
            </div>
        </div>
    </div>
)};

export default CreatePasswordForm;
