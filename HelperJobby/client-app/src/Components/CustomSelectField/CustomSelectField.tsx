import React, {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './CustomSelectField.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faCircleExclamation} from "@fortawesome/free-solid-svg-icons";

interface CustomSelectFieldProps {
    fieldLabel: string;
    fieldValue: string;
    setFieldValue: Dispatch<SetStateAction<string>>;
    optionsArr: string[];
    isRequired: boolean;
    executeValidation?: boolean;
    setExecuteValidation?: Dispatch<SetStateAction<boolean>>;
    isInvalidSelect?: boolean;
    setIsInvalidSelect?: Dispatch<SetStateAction<boolean>>;
}

const CustomSelectField: FC<CustomSelectFieldProps> = ({
                                                           fieldLabel,
                                                           fieldValue,
                                                           setFieldValue,
                                                           optionsArr,
                                                           isRequired,
                                                           executeValidation,
                                                           setExecuteValidation,
                                                           isInvalidSelect,
                                                           setIsInvalidSelect
                                                       }) => {
    const [isInvalidValue, setIsInvalidValue] = useState(false);
    const [selectionError, setSelectionError] = useState("");

    useEffect(() => {
        if (executeValidation && setExecuteValidation) {
            isValidValueProvided();
        }
    }, [executeValidation]);

    function selectAnotherValue(e: ChangeEvent<HTMLSelectElement>) {
        setFieldValue(e.target.value);
        if (e.target.value) {
            setIsInvalidValue(false);
            if (setIsInvalidSelect) {
                setIsInvalidSelect(false);
            }
        }
    }

    function checkSelection() {
        isValidValueProvided();
    }

    function isValidValueProvided() {
        if (isRequired) {
            if (!optionsArr.includes(fieldValue)) {
                setIsInvalidValue(true);
                setSelectionError("Make a selection.")
                if (setIsInvalidSelect) {
                    setIsInvalidSelect(true);
                }
            } else {
                if (setIsInvalidSelect) {
                    setIsInvalidSelect(false);
                }
                setIsInvalidValue(false);
            }
        }
    }

    return (
        <div className={"edit-form-field"}>
            <div className={`field-label`}>
                <span>{fieldLabel}</span>
                {isRequired && <span className={"error-text"}>&nbsp;*</span>}
            </div>
            <div className={`field-input-container ${isInvalidValue ? "red-field-focus" : ""}`}>
                <div className={`border-lining ${isInvalidValue ? "red-field-focus" : ""}`}/>
                <select
                    className={"field-select"}
                    id="countries"
                    name="countries"
                    value={fieldValue}
                    onChange={selectAnotherValue}
                    onBlur={checkSelection}
                    placeholder={"select option"}
                >
                    <option value="" disabled>Select your option</option>
                    {optionsArr.map((opt, index) => (
                        <option key={index} value={opt}>{opt}</option>
                    ))}
                </select>
                <div className={"selectArrow"}>
                    <FontAwesomeIcon className={"svg1rem light-dark-svg"} icon={faChevronDown}/>
                </div>
            </div>
            <div className={"input-field-spacing"}>
                {(isInvalidValue && isRequired) &&
                    <div className={"error-box"}>
                        <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                        <span className={"error-text"}>{selectionError}</span>
                    </div>}
            </div>
        </div>
    )
}

export default CustomSelectField;
