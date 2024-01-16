import React, {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './CustomInputField.scss';
import {faCircleExclamation, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {isNotEmpty} from "../../utils/commonValidators";
import GoogleImage from '../../Assets/pictures/google_on_white_hdpi.png'


interface EditFormFieldProps {
    fieldLabel : string;
    isRequired : boolean;
    inputFieldValue : string;
    setInputFieldValue : Dispatch<SetStateAction<string>>;
    inputRef?: React.RefObject<HTMLInputElement>;
    setShowAutocompleteWindow? : Dispatch<SetStateAction<boolean>>;
    fieldSubtitle? : string;
    displayGoogleLogo? : boolean;
    showErrorInitially? : boolean;
}

const CustomInputField: FC<EditFormFieldProps> = ({ inputFieldValue, 
                                               setInputFieldValue, 
                                               fieldLabel, 
                                               isRequired ,
                                               inputRef,
                                               setShowAutocompleteWindow,
                                               fieldSubtitle,
                                               displayGoogleLogo, 
                                               showErrorInitially}) => {
    
    const [inputFocus, setInputFocus] = useState(false);
    const [isInvalidValue, setIsInvalidValue] = useState(false); 
    const [requiredMessage, setRequiredMessage] = useState("");
    const [showEraseJobBtn, setShowEraseButton] = useState(inputFieldValue.length > 0);

    useEffect(() => {
        if (!isNotEmpty(inputFieldValue) && isRequired){
            setIsInvalidValue(true);
            setRequiredMessage(`${fieldLabel} is required`);
        }
        else {
            setIsInvalidValue(false)
        }
    }, [inputFieldValue]);

    useEffect(() => {
        if (showErrorInitially){
            setIsInvalidValue(false);
        }
    }, []);

    function changeInputFieldValue(e: ChangeEvent<HTMLInputElement>) {
        setIsInvalidValue(false);
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
        inputRef?.current?.focus();
        setShowEraseButton(false);
    }

    return (
    <div className={"edit-form-field"}>
        <div className={`field-label ${isInvalidValue ? "error-text" : ""}`}>
            <span>{fieldLabel}&nbsp;</span>
            {isRequired && <span className={"required-mark"}>*</span>}
        </div>
        {fieldSubtitle && <div className={"field-label-subtitle"}>
            {fieldSubtitle}
        </div>}
        <div className={"field-input-container"}>
            <div className={`border-lining ${inputFocus ? "field-focus" : ""} ${isInvalidValue ? "red-field-focus" : ""}`}>

            </div>
            <input className={`field-input ${isInvalidValue ? "red-field-focus" : ""}`}
                   value={inputFieldValue}
                   type={"text"}
                   onChange={changeInputFieldValue}
                   onFocus={handleInputFocus}
                   onBlur={handleInputBlur}
                   ref={inputRef}/>
            {displayGoogleLogo && <img className={"google-logo"} src={GoogleImage} alt={""}></img>}
            {showEraseJobBtn &&<div className={"erase-button-box"} onClick={eraseInput}>
                <button className={"cross-outline"}>
                    <FontAwesomeIcon className={"cross-icon"} icon={faXmark}/>
                </button>
            </div>}
        </div>
        <div className={"input-field-spacing"}>
            {isInvalidValue && isRequired &&
                <div className={"error-box"}>
                    <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                    <span className={"error-text"}>{requiredMessage}</span>
                </div>}
        </div>
    </div>
)};

export default CustomInputField;
