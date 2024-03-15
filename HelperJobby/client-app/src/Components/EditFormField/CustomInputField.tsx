import React, {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './CustomInputField.scss';
import {faCircleExclamation, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


interface EditFormFieldProps {
    fieldLabel: string;
    isRequired: boolean;
    inputFieldValue: string;
    setInputFieldValue: Dispatch<SetStateAction<string>>;
    inputRef?: React.RefObject<HTMLInputElement>;
    fieldSubtitle?: string;
    executeValidation?: boolean;
    setExecuteValidation?: Dispatch<SetStateAction<boolean>>;
    customErrorMessage?: string;
    setCustomErrorMessage?: Dispatch<SetStateAction<string>>;
    placeholderText?: string;
}

const CustomInputField: FC<EditFormFieldProps> = ({
                                                      inputFieldValue,
                                                      setInputFieldValue,
                                                      fieldLabel,
                                                      isRequired,
                                                      inputRef,
                                                      fieldSubtitle,
                                                      executeValidation,
                                                      setExecuteValidation,
                                                      customErrorMessage,
                                                      setCustomErrorMessage,
                                                      placeholderText
                                                  }) => {

    const [isInvalidValue, setIsInvalidValue] = useState(false);
    const [requiredMessage, setRequiredMessage] = useState("");
    const [showEraseJobBtn, setShowEraseButton] = useState(inputFieldValue ? inputFieldValue.length > 0 : false);

    useEffect(() => {
        if (customErrorMessage) {
            setIsInvalidValue(true);
            setRequiredMessage("");
        } else {
            setIsInvalidValue(false);
        }
    }, [customErrorMessage]);


    useEffect(() => {
        if (executeValidation && setExecuteValidation) {
            validateInputValue(inputFieldValue);
            setExecuteValidation(false);
        }
    }, [executeValidation]);

    function validateInputValue(inputValue: string) {
        if (!inputValue && isRequired && !customErrorMessage) {
            setIsInvalidValue(true);
            setRequiredMessage(`${fieldLabel} is required`);
        } else if (customErrorMessage) {
            setIsInvalidValue(true);
        } else {
            setIsInvalidValue(false);
        }
    }

    function changeInputFieldValue(e: ChangeEvent<HTMLInputElement>) {
        setIsInvalidValue(false);
        validateInputValue(e.target.value);
        if (setCustomErrorMessage) {
            setCustomErrorMessage("");
        }
        e.target.value ? setShowEraseButton(true) : setShowEraseButton(false);
        setInputFieldValue(e.target.value);
    }

    function eraseInput() {
        setInputFieldValue("");
        if (setCustomErrorMessage) {
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
                <div className={`border-lining ${isInvalidValue ? "red-field-focus" : ""}`}>
                </div>
                <input
                    className={`field-input`}
                    value={inputFieldValue}
                    type={"text"}
                    onChange={changeInputFieldValue}
                    onBlur={() => validateInputValue(inputFieldValue)}
                    ref={inputRef}
                    placeholder={placeholderText}
                />
                {showEraseJobBtn && <div className={"input-button-box"} onClick={eraseInput}>
                    <button type={"button"} className={"input-field-button"}>
                        <FontAwesomeIcon className={"svg1rem"} icon={faXmark}/>
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
    )
};

export default CustomInputField;
