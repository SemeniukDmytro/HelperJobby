import React, {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './CustomPasswordInputField.scss';
import {isNotEmpty} from "../../utils/validationLogic/isNotEmptyString";
import GoogleImage from "../../Assets/pictures/google_on_white_hdpi.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faEye, faEyeSlash, faXmark} from "@fortawesome/free-solid-svg-icons";

interface CustomPasswordInputFieldProps {
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    fieldLabel: string;
    fieldError: string;
    setFieldError: Dispatch<SetStateAction<string>>;
    showLengthError?: boolean;
    inputRef?: React.RefObject<HTMLInputElement>;
    executeValidation?: boolean;
    setExecuteValidation?: Dispatch<SetStateAction<boolean>>;
}

const CustomPasswordInputField: FC<CustomPasswordInputFieldProps> = ({
                                                                         password,
                                                                         setPassword,
                                                                         fieldLabel,
                                                                         inputRef,
                                                                         fieldError,
                                                                         setFieldError,
                                                                         showLengthError,
                                                                         executeValidation,
                                                                         setExecuteValidation
                                                                     }) => {

    const [inputFocus, setInputFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (executeValidation && setExecuteValidation) {
            validateInputValue();
            setExecuteValidation(false);
        }
    }, [executeValidation]);

    function validateInputValue() {
        if (showLengthError) {
            if (password.length < 8){
                setFieldError(`Password must be at least 8 characters long`);
            }
            else if (password.length > 25) {
                setFieldError(`Password must be at most 25 characters long`);
            }
        }
        else {
            setFieldError("");
        }
    }

    function changeInputFieldValue(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
        if(showLengthError && e.target.value.length >= 8 ){
            setFieldError("");
        }
    }

    function handleInputFocus() {
        setInputFocus(true);
    }

    function handleInputBlur() {
        if (password.length > 0 && !showLengthError) {
            setFieldError("");
        }
        else{
            validateInputValue();
        }
        setInputFocus(false);
    }

    function toggleShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <div className={"edit-form-field"}>
            <div className={`field-label ${fieldError ? "error-text" : ""}`}>
                <span>{fieldLabel}&nbsp;</span>
            </div>
            <div className={`field-input-container ${fieldError ? "red-field-focus" : ""}`}>
                <div
                    className={`border-lining ${inputFocus ? "field-focus" : ""} ${fieldError ? "red-field-focus" : ""}`}>

                </div>
                <input className={`field-input`}
                       value={password}
                       autoComplete={"new-password"}
                       type={`${showPassword ? "text" : "password"}`}
                       onChange={changeInputFieldValue}
                       onFocus={handleInputFocus}
                       onBlur={handleInputBlur}
                       ref={inputRef}/>
                <div className={"input-button-box"} onClick={toggleShowPassword}>
                    <button className={"input-field-button right-margin-remove"} style={{minWidth: "40px"}}>
                        {showPassword ? <FontAwesomeIcon icon={faEyeSlash}/> :
                                <FontAwesomeIcon icon={faEye}/>}
                    </button>
                </div>
            </div>
            <div className={"input-field-spacing"}>
                {fieldError &&
                    <div className={"error-box"}>
                        <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                        <span className={"error-text"}>{fieldError}</span>
                    </div>}
            </div>
        </div>
    )
};

export default CustomPasswordInputField;
