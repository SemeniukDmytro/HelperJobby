import React, {ChangeEvent, Dispatch, FC, SetStateAction} from 'react';
import './SalaryAmountInputField.scss';

interface SalaryAmountInputFieldProps {
    fieldLabel: string;
    inputValue: string;
    setInputValue: Dispatch<SetStateAction<string>>;
    currency: string;
    isInvalidValue: boolean;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
}

const SalaryAmountInputField: FC<SalaryAmountInputFieldProps> = ({
                                                                     fieldLabel,
                                                                     inputValue,
                                                                     currency,
                                                                     isInvalidValue,
                                                                     onInputChange,
                                                                     onBlur
                                                                 }) => {

    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <div className={"edit-form-field"}>
            <div className={`field-label ${isInvalidValue ? "error-text" : ""}`}>
                <span>{fieldLabel}&nbsp;</span>
            </div>
            <div className={`field-input-container ${isInvalidValue ? "red-field-focus" : ""}`}>
                <div className={`border-lining ${isInvalidValue ? "red-field-focus" : ""}`}>
                </div>
                <div className={"currency-container"}>
                    <span>{currency}</span>
                </div>
                <input
                    className={`field-input`}
                    value={inputValue}
                    type={"text"}
                    onChange={onInputChange}
                    onBlur={onBlur}
                    onKeyDown={handleEnterPress}
                />
            </div>
        </div>
    )
}

export default SalaryAmountInputField;
