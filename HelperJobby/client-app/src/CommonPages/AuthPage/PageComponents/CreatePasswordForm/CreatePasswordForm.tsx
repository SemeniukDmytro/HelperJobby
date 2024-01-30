import React, {FC, useContext, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong, faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import "./CreatePasswordForm.scss"
import AppLogo from "../AppLogo/AppLogo";
import {useLocation, useNavigate} from "react-router-dom";
import EmailForm from "../EmailForm/EmailForm";
import {useEmail} from "../../../../hooks/useEmail";
import {useAccountType} from "../../../../hooks/useAccountType";
import {useAuth} from "../../../../hooks/useAuth";
import AuthService from "../../../../services/authService";
import {CreateUpdateUserDTO} from "../../../../DTOs/userRelatedDTOs/CreateUpdateUserDTO";
import {
    IsValidPasswordMaximalLength,
    IsValidPasswordMinimalLength
} from "../../../../utils/validationLogic/authFormValidators";
import CustomPasswordInputField from "../../../../Components/CustomPasswordInputField/CustomPasswordInputField";


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
    const location = useLocation();
    const from = location.state?.from.pathname || "/";
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
            setAuthUser(newUser);
        } catch (error) {
            console.error("Error creating user:", error);
        }
        finally {
            navigate(from);
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
            <div className="passpage-form-layout">
                <div className="passpage-form-box">
                    <div className="passpage-form-title-box">
                        <span className="form-title">{formTitle}</span>
                    </div>
                    <div className="passpage-form-subtitle-box subtitle-font-size">
                        <span className="form-subtitle">Signing up as&nbsp;</span>
                        <span className={"user-email"}>{email}</span>
                        <button className={"return-button"} onClick={goToInitialAuthPage}>
                            <span className={"return-button-text"}>(not you?)</span>
                        </button>
                    </div>
                    <div className={"content-separation-margin"}/>
                    <form className="passpage-form" onSubmit={HandleAccountCreation}>
                        <CustomPasswordInputField
                            password={password}
                            setPassword={setPassword}
                            fieldLabel={"Enter your password"}
                            fieldError={error}
                            setFieldError={setError}
                            showRequiredMark={true}/>
                        <button className="blue-button" type={"submit"}>
                            <span>Create account</span>
                        </button>
                    </form>
                    <div>
                        <a className={"type-change-button"} onClick={ChangeAccountType}>
                            <span className={"type-change-text"}>Wait, I am {accountTypeChanger}</span>
                            <FontAwesomeIcon className="type-continue-arrow svg125rem" icon={faArrowRightLong}/>
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
