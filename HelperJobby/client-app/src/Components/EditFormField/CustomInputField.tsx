import React, {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './CustomInputField.scss';
import {faCircleExclamation, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GoogleImage from '../../Assets/pictures/google_on_white_hdpi.png'
import {isNotEmpty} from "../../utils/validationLogic/isNotEmptyString";


interface EditFormFieldProps {
    fieldLabel : string;
    isRequired : boolean;
    inputFieldValue : string;
    setInputFieldValue : Dispatch<SetStateAction<string>>;
    inputRef?: React.RefObject<HTMLInputElement>;
    setShowAutocompleteWindow? : Dispatch<SetStateAction<boolean>>;
    fieldSubtitle? : string;
    displayGoogleLogo? : boolean;
    notShowErrorInitially? : boolean;
    executeValidation? : boolean;
    setExecuteValidation? : Dispatch<SetStateAction<boolean>>;
    customErrorMessage? : string;
    setCustomErrorMessage ? : Dispatch<SetStateAction<string>>;
}

const CustomInputField: FC<EditFormFieldProps> = ({ inputFieldValue, 
                                               setInputFieldValue, 
                                               fieldLabel, 
                                               isRequired ,
                                               inputRef,
                                               setShowAutocompleteWindow,
                                               fieldSubtitle,
                                               displayGoogleLogo, 
                                               notShowErrorInitially, 
                                               executeValidation,
                                               setExecuteValidation,
                                               customErrorMessage,
                                               setCustomErrorMessage}) => {
    
    const [inputFocus, setInputFocus] = useState(false);
    const [isInvalidValue, setIsInvalidValue] = useState(false); 
    const [requiredMessage, setRequiredMessage] = useState("");
    const [showEraseJobBtn, setShowEraseButton] = useState(inputFieldValue.length > 0);

    useEffect(() => {
        validateInputValue();
        if (inputFieldValue.length>0){
            setShowEraseButton(true);
        }
    }, [inputFieldValue]);

    useEffect(() => {
        if (customErrorMessage){
            setIsInvalidValue(true);
            setRequiredMessage("");
        }
        else {
            setIsInvalidValue(false);
        }
    }, [customErrorMessage]);

    useEffect(() => {
        if (notShowErrorInitially){
            setIsInvalidValue(false);
        }
    }, []);

    useEffect(() => {
        if (executeValidation && setExecuteValidation){
            validateInputValue();
            setExecuteValidation(false);
        }
    }, [executeValidation]);
    
    function validateInputValue(){
        if (!isNotEmpty(inputFieldValue) && isRequired && !setCustomErrorMessage){
            setIsInvalidValue(true);
            setRequiredMessage(`${fieldLabel} is required`);
        }
        else {
            setIsInvalidValue(false);
        }
    }

    function changeInputFieldValue(e: ChangeEvent<HTMLInputElement>) {
        setIsInvalidValue(false);
        if (setCustomErrorMessage){
            setCustomErrorMessage("");
        }
        if (setShowAutocompleteWindow){
            setShowAutocompleteWindow(true);
        }
        if (e.target.value.length == 0){
            setShowEraseButton(false);
        }
        else {
            setShowEraseButton(true)
        }
        setInputFieldValue(e.target.value);
    }

    function handleInputFocus() {
        setInputFocus(true);
    }

    function handleInputBlur() {
        setInputFocus(false);
    }

    function eraseInput() {
        setInputFieldValue("");
        if (setCustomErrorMessage){
            setCustomErrorMessage("");
        }
        inputRef?.current?.focus();
        setShowEraseButton(false);
    }

    return (
    <div className={"edit-form-field"}>
        <div className={`field-label ${isInvalidValue ? "error-text" : ""}`}>
            <span>{fieldLabel}&nbsp;</span>
            {isRequired && <span className={"error-text"}>*</span>}
        </div>
        {fieldSubtitle && <div className={"field-label-subtitle"}>
            {fieldSubtitle}
        </div>}
        <div className={`field-input-container ${isInvalidValue ? "red-field-focus" : ""}`}>
            <div className={`border-lining ${inputFocus ? "field-focus" : ""} ${isInvalidValue ? "red-field-focus" : ""}`}>

            </div>
            <input className={`field-input`}
                   value={inputFieldValue}
                   type={"text"}
                   onChange={changeInputFieldValue}
                   onFocus={handleInputFocus}
                   onBlur={handleInputBlur}
                   ref={inputRef}/>
            {displayGoogleLogo && <img className={"google-logo"} src={GoogleImage} alt={""}></img>}
            {showEraseJobBtn &&<div className={"input-button-box"} onClick={eraseInput}>
                <button type={"button"} className={"input-field-button"}>
                    <FontAwesomeIcon className={"small-svg"} icon={faXmark}/>
                </button>
            </div>}
        </div>
        <div className={"input-field-spacing"}>
            {(isInvalidValue && isRequired && requiredMessage) &&
                <div className={"error-box"}>
                    <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                    <span className={"error-text"}>{requiredMessage}</span>
                </div>}
            {customErrorMessage &&
                <div className={"error-box"}>
                    <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                    <span className={"error-text"}>{customErrorMessage}</span>
                </div>}
        </div>
    </div>
)};

export default CustomInputField;
