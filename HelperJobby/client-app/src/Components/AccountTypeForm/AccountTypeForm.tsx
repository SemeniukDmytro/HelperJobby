import React, {FC, useState} from 'react'
import './AccountTypeForm.scss'
import CreatePasswordForm from "../CreatePasswordForm/CreatePasswordForm";
import AppLogo from "../AppLogo/AppLogo";
import "../../Assets/scssSharedStyles/AuthFormBox.scss";
import {AccountTypeProvider} from "../../context/AccountTypeContext";
import {useAccountType} from "../../hooks/useAccountType";

interface AccountTypeFormProps {}

const AccountTypeForm: FC<AccountTypeFormProps> = () =>
{
    const [renderCreatePasswordForm, setRenderCreatePasswordForm] = useState(false);
    const {accountType, setAccountType} = useAccountType();
    function HandleEmployerTypeSelection() {
        setAccountType("Employer");
        setRenderCreatePasswordForm(true);
    }

    function HandleJobSeekerTypeSelection() {
        setAccountType("Job seeker");
        setRenderCreatePasswordForm(true);
    }

    
    return (
            !renderCreatePasswordForm ? (
                <AppLogo>
                    <div className="form-box">
                        <div className="auth-form-container">
                            <div className="greeting-box">
                                <span className="greeting">Welcome!</span>
                            </div>
                            <div className="auth-form-title-box type-form-title-box">
                                <span className="form-title type-form-title">Ready for the next step?</span>
                            </div>
                            <div className="auth-form-subtitle-box type-form-subtitle-subtitle-box">
                                <span className="form-subtitle type-form-subtitle">Create an account for tools to help you</span>
                            </div>
                            <div className={"employer-button-box"}>
                                <button className={"account-type-button"} onClick={HandleEmployerTypeSelection}>
                                    <span className={"account-type"}>Employer</span>
                                </button>
                            </div>
                            <div className={"job-seeker-button-box"}>
                                <button className={"account-type-button"} onClick={HandleJobSeekerTypeSelection}>
                                    <span className={"account-type"}>Job seeker</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </AppLogo>
             ) :
             (
                 <CreatePasswordForm>
                 </CreatePasswordForm>
             )
    )
        
};

export default AccountTypeForm;
