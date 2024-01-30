import React, {ChangeEvent, Dispatch, FC, SetStateAction} from 'react';
import './CustomSelectField.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

interface CustomSelectFieldProps {
    fieldLabel : string;
    fieldValue : string;
    setFieldValue : Dispatch<SetStateAction<string>>;
    optionsArr : string[];
}

const CustomSelectField: FC<CustomSelectFieldProps> = ({
    fieldLabel,
    fieldValue,
    setFieldValue,
    optionsArr
                                                       }) => {

    function selectAnotherValue(e: ChangeEvent<HTMLSelectElement>) {
        setFieldValue(e.target.value);
    }

    return(
        <div className={"edit-form-field"}>
            <div className={`field-label`}>
                <span>{fieldLabel}</span>
            </div>
                <div className={"field-input-container"}>
                    <div className={`border-lining`}>

                    </div>
                    <select
                        className={"field-select"}
                        id="countries"
                        name="countries"
                        value={fieldValue}
                        onChange={selectAnotherValue}
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
            </div>
        </div>
    )
}

export default CustomSelectField;
