import React, {FC, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import '../AuthComponent/AuthComponent.scss'
import './AccountTypeForm.scss'
import CreatePasswordForm from "../CreatePasswordForm/CreatePasswordForm";
import AccountTypeContext from "../../Contexts/AccountTypeContext";

interface AccountTypeFormProps {}

const AccountTypeForm: FC<AccountTypeFormProps> = () =>
{
    const [renderCreatePasswordForm, setRenderCreatePasswordForm] = useState(false);
    
    let accountType = "Job seeker";
    function HandleEmployerTypeSelection() {
        accountType = "Employer"
        setRenderCreatePasswordForm(true);
    }

    function HandleJobSeekerTypeSelection() {
        accountType = "Job seeker";
        setRenderCreatePasswordForm(true);
    }
    
    
    return (
        <AccountTypeContext.Provider value={accountType}>
            {!renderCreatePasswordForm ? (
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
        ) :
             (
                 <CreatePasswordForm>
                 </CreatePasswordForm>
             )
            }
        </AccountTypeContext.Provider>
    )
        
};

export default AccountTypeForm;
