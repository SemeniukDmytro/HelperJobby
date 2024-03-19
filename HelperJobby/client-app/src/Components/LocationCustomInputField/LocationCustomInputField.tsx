import React, {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './LocationCustomInputField.scss';
import GoogleImage from "../../Assets/pictures/google_on_white_hdpi.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faXmark} from "@fortawesome/free-solid-svg-icons";


interface LocationCustomInputFieldProps {
    fieldLabel: string;
    fieldSubtitle?: string;
    inputValue: string;
    setInputValue: Dispatch<SetStateAction<string>>;
    inputRef: React.RefObject<HTMLInputElement>;
    isRequired: boolean;
    setShowAutocompleteResults: Dispatch<SetStateAction<boolean>>;
    executeValidation?: boolean;
    setExecuteValidation?: Dispatch<SetStateAction<boolean>>;
    customErrorMessage?: string;
    setCustomErrorMessage?: Dispatch<SetStateAction<string>>;
    selectedFromSuggests?: boolean;
    setSelectedFromSuggests?: Dispatch<SetStateAction<boolean>>;
    locationMaxLength: number | null;
}


const LocationCustomInputField: FC<LocationCustomInputFieldProps> = ({
                                                                         fieldLabel,
                                                                         fieldSubtitle,
                                                                         inputValue,
                                                                         setInputValue,
                                                                         inputRef,
                                                                         isRequired,
                                                                         setShowAutocompleteResults,
                                                                         executeValidation,
                                                                         setExecuteValidation,
                                                                         customErrorMessage,
                                                                         setCustomErrorMessage,
                                                                         selectedFromSuggests,
                                                                         setSelectedFromSuggests,
                                                                         locationMaxLength
                                                                     }) => {

    const [isInvalidValue, setIsInvalidValue] = useState(false);
    const [showEraseButton, setShowEraseButton] = useState(!!inputValue);
    const [isInvalidLength, setIsInvalidLength] = useState(false);

    useEffect(() => {
        if (customErrorMessage) {
            setIsInvalidValue(true);
        } else {
            setIsInvalidValue(false);
        }
    }, [customErrorMessage]);


    useEffect(() => {
        checkIfSelectedFromSuggestions();
    }, [selectedFromSuggests]);


    useEffect(() => {
        if (executeValidation && setExecuteValidation) {
            validateInputValue(inputValue);
            setExecuteValidation(false);
        }
    }, [executeValidation]);


    function validateInputValue(value: string) {
        if ((!value && isRequired) || customErrorMessage) {
            setIsInvalidValue(true);
        } else if (locationMaxLength && value.length > locationMaxLength) {
            setIsInvalidLength(true);
        } else {
            setIsInvalidValue(false);
            setIsInvalidLength(false);
        }
    }

    function checkIfSelectedFromSuggestions() {
        if (!setCustomErrorMessage || !inputValue) {
            return;
        }
        if (selectedFromSuggests) {
            setCustomErrorMessage("");
        } else {
            setIsInvalidValue(true);
            setCustomErrorMessage("We don't recognize this address. Please select address from suggestions window");
        }
    }


    function changeInputFieldValue(e: ChangeEvent<HTMLInputElement>) {
        setIsInvalidValue(false);
        validateInputValue(e.target.value);
        if (customErrorMessage == "Add an address") {
            setCustomErrorMessage && setCustomErrorMessage("");
        }
        setShowAutocompleteResults(true);
        e.target.value ? setShowEraseButton(true) : setShowEraseButton(false);
        setSelectedFromSuggests && setSelectedFromSuggests(false);
        checkIfSelectedFromSuggestions();
        setInputValue(e.target.value);
    }


    function eraseInput() {
        setInputValue("");
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
                {fieldSubtitle && <div className={"field-label-subtitle"}>
                    {fieldSubtitle}
                </div>}
            </div>
            <div className={`field-input-container ${isInvalidValue ? "red-field-focus" : ""}`}>
                <div className={`border-lining ${isInvalidValue ? "red-field-focus" : ""}`}>
                </div>
                <input
                    className={`field-input`}
                    value={inputValue}
                    type={"text"}
                    onChange={changeInputFieldValue}
                    onBlur={() => validateInputValue(inputValue)}
                    ref={inputRef}
                />
                <img className={"google-logo"} src={GoogleImage} alt={""}></img>
                {showEraseButton && <div className={"input-button-box"} onClick={eraseInput}>
                    <button type={"button"} className={"input-field-button"}>
                        <FontAwesomeIcon className={"svg1rem"} icon={faXmark}/>
                    </button>
                </div>}
            </div>
            <div className={"input-field-spacing"}>
                {(isInvalidValue && isRequired && !customErrorMessage) &&
                    <div className={"error-box"}>
                        <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                        <span
                            className={"error-text"}>{customErrorMessage !== undefined ? "Add an address" : `${fieldLabel} is required`}</span>
                    </div>}
                {customErrorMessage &&
                    <div className={"error-box"}>
                        <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                        <span className={"error-text"}>{customErrorMessage}</span>
                    </div>}
                {(isInvalidLength && !customErrorMessage && !isInvalidValue) &&
                    <div className={"error-box"}>
                        <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                        <span className={"error-text"}>{fieldLabel} exceeded max available length</span>
                    </div>}

            </div>
        </div>
    )
}


export default LocationCustomInputField;