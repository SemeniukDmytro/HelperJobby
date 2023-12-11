import React, { FC } from 'react';
import './AuthComponent.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

interface AuthComponentProps {}

const AuthComponent: FC<AuthComponentProps> = () => {
    
    return (
        <div className="container">
            <div className="passpage-container">
                <div className="logo-container">
                    <span className="logo">HelperJobby</span>
                </div>
                <div className="form-box">
                    <div className="email-form-container">
                        <div className="email-form-title">
                            <span className="form-title">Ready to take next step?</span>
                        </div>
                        <div className="email-form-subtitle">
                            <span className="form-subtitle">Create an account or sign in.</span>
                        </div>
                        <div className="email-input-box">
                            <div className="input-label-box">
                                <label className="input-label">Email address
                                    <span className="required-mark"> *</span>
                                </label>
                            </div>
                            <div className="input-box">
                                <input className='email-input-field' />
                            </div>
                            <button className="submit-button">
                                <span className="continue-text">Continue</span>
                                <FontAwesomeIcon className="continue-arrow" icon={faArrowRightLong} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AuthComponent;
