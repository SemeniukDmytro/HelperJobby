import React, {FC, useState} from 'react';
import './ChangeEmailComponent.scss';
import ChangeAccountInfoForm from "../../../SharedComponents/ChangeAccountInfoForm/ChangeAccountInfoForm";
import {useAuth} from "../../../../../hooks/useAuth";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";
import GoogleImage from "../../../../../Assets/pictures/google_on_white_hdpi.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faXmark} from "@fortawesome/free-solid-svg-icons";
import CustomPasswordInputField from "../../../../../Components/CustomPasswordInputField/CustomPasswordInputField";
import {UserService} from "../../../../../services/userService";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {UpdateUserWIthCurrentPasswordDTO} from "../../../../../DTOs/userRelatedDTOs/UpdateUserWIthCurrentPasswordDTO";
import {IsValidEmail} from "../../../../../utils/validationLogic/authFormValidators";
import {ChangedInfoTypes} from "../../../../../enums/ChangedInfoTypes";
import {useNavigate} from "react-router-dom";

interface ChangeEmailComponentProps {}

const ChangeEmailComponent: FC<ChangeEmailComponentProps> = () => {
    const {authUser, setAuthUser} = useAuth();
    const [emailFieldFocus, setEmailFieldFocus] = useState(false);
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [email, setEmail] = useState("");
    const [invalidEmailMsg, setInvalidEmailMsg] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [pwdError, setPwdError] = useState("");
    const userService = new UserService();
    const navigate = useNavigate();
    

    function handleEmailInputFocus() {
        setEmailFieldFocus(true);
    }

    function handleEmailInputBlur() {
        setEmailFieldFocus(false);
    }

    const changeEmailValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmailValue = event.target.value;
        setEmail(newEmailValue);
    };

    async function updateEmail() {
        if (!IsValidEmail(email)){
            setIsInvalidEmail(true);
            setInvalidEmailMsg(`Invalid email address: ${email}`)
            return;
        }
        else{
            setIsInvalidEmail(false);
        }

        try {
            const updatedUser : UpdateUserWIthCurrentPasswordDTO = {
                email : email,
                password : "",
                accountType : "",
                currentPassword : userPwd
            }
            const retrievedUser = await userService.updateUserVulnerableInfo(authUser!.user.id, updatedUser);
            setAuthUser((prev) => {
                return prev ? {
                    ...prev,
                    user : {
                        ...prev.user,
                        email : retrievedUser.email
                    }
                } :
                    null;
            })
            navigate(`/settings?msg=${ChangedInfoTypes.changedpemail}`)
        }
        catch (err){
            logErrorInfo(err)
            setPwdError("Password provided for specified email is wrong")
        }
    }

    function backToSettingsPage() {
        navigate("/settings");
    }

    return (
        <ChangeAccountInfoForm>
            <div className={"passpage-form-title-box"}>
                <span className={"form-title"}>Changing email address for {authUser?.user.email}</span>
            </div>
            <div className={"content-separation-margin"}>
            </div>
            <div className={"edit-form-field"}>
                <div className={`field-label ${isInvalidEmail ? "error-text" : ""}`}>
                    <span>New email address</span>
                </div>
                <div className={`field-input-container ${isInvalidEmail ? "red-field-focus" : ""}`}>
                    <div className={`border-lining ${emailFieldFocus ? "field-focus" : ""} ${isInvalidEmail ? "red-field-focus" : ""}`}>

                    </div>
                    <input className={`field-input`}
                           value={email}
                           type={"text"}
                           onChange={changeEmailValue}
                           onFocus={handleEmailInputFocus}
                           onBlur={handleEmailInputBlur}/>
                </div>
                <div className={"input-field-spacing"}>
                    {isInvalidEmail &&
                        <div className={"error-box"}>
                            <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                            <span className={"error-text"}>{invalidEmailMsg}</span>
                        </div>}
                </div>
            </div>
            <CustomPasswordInputField
                password={userPwd}
                setPassword={setUserPwd}
                fieldLabel={"Current password"}
                fieldError={pwdError}
                setFieldError={setPwdError}/>
            <div className={"passpage-button-container"}>
                <button className={"blue-button"} onClick={updateEmail}>
                    Save email
                </button>
                <button className={"transparent-button margin-left1rem"} onClick={backToSettingsPage}>
                    Cancel changes
                </button>
            </div>
        </ChangeAccountInfoForm>
    );
}

export default ChangeEmailComponent;
