import React, {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './EditFormField.scss';
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {isNotEmpty} from "../../../../utils/commonValidators";
import GoogleImage from '../../../../Assets/pictures/google_on_white_hdpi.png'


interface EditFormFieldProps {
    fieldLabel : string;
    isRequired : boolean;
    inputFieldValue : string;
    setInputFieldValue : Dispatch<SetStateAction<string>>;
    inputRef?: React.RefObject<HTMLInputElement>;
    setShowAutocompleteWindow? : Dispatch<SetStateAction<boolean>>;
    fieldSubtitle? : string;
    displayGoogleLogo? : boolean;
}

const EditFormField: FC<EditFormFieldProps> = ({ inputFieldValue, 
                                               setInputFieldValue, 
                                               fieldLabel, 
                                               isRequired ,
                                               inputRef,
                                               setShowAutocompleteWindow,
                                               fieldSubtitle,
                                               displayGoogleLogo}) => {
    
    const [inputFocus, setInputFocus] = useState(false);
    const [isInvalidValue, setIsInvalidValue] = useState(false); 
    const [requiredMessage, setRequiredMessage] = useState("");

    useEffect(() => {
        if (!isNotEmpty(inputFieldValue) && isRequired){
            setIsInvalidValue(true);
            setRequiredMessage(`${fieldLabel} is required`);
        }
        else {
            setIsInvalidValue(false)
        }
    }, [inputFieldValue]);

    function changeInputFieldValue(e: ChangeEvent<HTMLInputElement>) {
        setIsInvalidValue(false);
        if (setShowAutocompleteWindow){
            setShowAutocompleteWindow(true);
        }
        setInputFieldValue(e.target.value);
    }

    function handleInputFocus() {
        setInputFocus(true);
    }

    function handleInputBlur() {
        setInputFocus(false);
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

export default EditFormField;
