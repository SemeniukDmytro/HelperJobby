import React, { FC } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import '../AuthComponent/AuthComponent.scss'
import './AccountTypeForm.scss'

interface AccountTypeFormProps {}

const AccountTypeForm: FC<AccountTypeFormProps> = () =>
{ 
    return (
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
                    <button className={"account-type-button"}>
                        <span className={"account-type"}>Employer</span>
                    </button>
                </div>
                <div className={"job-seeker-button-box"}>
                    <button className={"account-type-button"}>
                        <span className={"account-type"}>Job seeker</span>
                    </button>
                </div>
                
            </div>
        </div>
    )
};

export default AccountTypeForm;
