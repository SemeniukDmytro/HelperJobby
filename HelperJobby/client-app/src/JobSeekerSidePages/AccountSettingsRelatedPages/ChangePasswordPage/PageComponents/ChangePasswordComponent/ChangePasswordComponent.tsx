import React, {FC, useRef, useState} from 'react';
import './ChangePasswordComponent.scss';
import ChangeAccountInfoForm from "../../../SharedComponents/ChangeAccountInfoForm/ChangeAccountInfoForm";
import {useAuth} from "../../../../../hooks/useAuth";
import CustomPasswordInputField from "../../../../../Components/CustomPasswordInputField/CustomPasswordInputField";
import {UserService} from "../../../../../services/userService";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {UpdateUserWIthCurrentPasswordDTO} from "../../../../../DTOs/userRelatedDTOs/UpdateUserWIthCurrentPasswordDTO";
import {ChangedInfoTypes} from "../../../../../enums/ChangedInfoTypes";
import {useNavigate} from "react-router-dom";

interface ChangePasswordComponentProps {
}

const ChangePasswordComponent: FC<ChangePasswordComponentProps> = () => {
    const {authUser, setAuthUser} = useAuth();
    const [currentPassword, setCurrentPassword] = useState("");
    const [currentPasswordError, setCurrentPasswordError] = useState("");
    const currentPasswordInputRef = useRef<HTMLInputElement>(null)
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const newPasswordInputRef = useRef<HTMLInputElement>(null);
    const userService = new UserService();
    const navigate = useNavigate();

    async function changePassword() {
        if (newPassword.length < 8 || newPassword.length > 25) {
            return;
        }
        try {
            const updatedUserInfo: UpdateUserWIthCurrentPasswordDTO = {
                password: newPassword,
                currentPassword: currentPassword,
                accountType: "",
                email: ""
            }
            const retrievedUser = await userService.updateUserVulnerableInfo(authUser!.user.id, updatedUserInfo);
            setAuthUser((prev) => {
                return prev ? {
                        ...prev,
                        user: {
                            ...prev.user,
                            password: retrievedUser.password
                        }
                    } :
                    null;
            })
            navigate(`/settings?msg=${ChangedInfoTypes.changedpassword}`)

        } catch (err) {
            logErrorInfo(err)
            setCurrentPasswordError("Password provided for specified email is wrong")
        }
    }

    function backToSettingsPage() {
        navigate(`/settings?msg=${ChangedInfoTypes.nothingchanged}`)
    }

    return (
        <ChangeAccountInfoForm>
            <div className={"passpage-form-title-box"}>
                <span className={"form-title"}>Changing password for {authUser?.user.email}</span>
            </div>
            <div className={"content-separation-margin"}/>
            <CustomPasswordInputField
                password={currentPassword}
                setPassword={setCurrentPassword}
                fieldLabel={"Current password"}
                fieldError={currentPasswordError}
                setFieldError={setCurrentPasswordError}
                inputRef={currentPasswordInputRef}
            />
            <CustomPasswordInputField
                password={newPassword}
                setPassword={setNewPassword}
                fieldLabel={"New password"}
                fieldError={newPasswordError}
                setFieldError={setNewPasswordError}
                showLengthError={true}
                inputRef={newPasswordInputRef}
            />
            <div className={"passpage-button-container"}>
                <button className={"blue-button"} onClick={changePassword}>
                    Save password
                </button>
                <button className={"transparent-button margin-left1rem"} onClick={backToSettingsPage}>
                    Cancel changes
                </button>
            </div>
        </ChangeAccountInfoForm>
    )
};

export default ChangePasswordComponent;
