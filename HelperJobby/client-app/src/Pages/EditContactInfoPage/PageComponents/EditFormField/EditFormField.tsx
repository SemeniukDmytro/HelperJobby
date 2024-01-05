import React, {ChangeEvent, Dispatch, FC, SetStateAction, useState} from 'react';
import './EditFormField.scss';

interface EditFormFieldProps {
    fieldLabel : string;
    isRequired : boolean;
    inputFieldValue : string;
    setInputFieldValue : Dispatch<SetStateAction<string>>
}

const EditFormField: FC<EditFormFieldProps> = ({ inputFieldValue, 
                                                   setInputFieldValue, 
                                                   fieldLabel, 
                                                   isRequired }) => {
    const [inputFocus, setInputFocus] = useState(false);

    function changeInputFieldValue(e: ChangeEvent<HTMLInputElement>) {
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
        <div className={"field-label"}>
            <span>{fieldLabel}&nbsp;</span>
            {isRequired && <span className={"required-mark"}>*</span>}
        </div>
        <div className={"field-input-container"}>
            <div className={`border-lining ${inputFocus ? "field-focus" : ""}`}>

            </div>
            <input className={"field-input"}
                   value={inputFieldValue}
                   type={"text"}
                   onChange={changeInputFieldValue}
                   onFocus={handleInputFocus}
                   onBlur={handleInputBlur}/>
        </div>
    </div>
)};

export default EditFormField;
