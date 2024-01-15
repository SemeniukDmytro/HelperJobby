import React, {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './CountrySelector.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import {countries} from "../../../../AppConstData/CountriesData";
import {isNotEmpty} from "../../../../utils/commonValidators";

interface CountrySelectorProps {
    country : string;
    setCountry : Dispatch<SetStateAction<string>>;
    selectRef : React.RefObject<HTMLSelectElement>;
}

const CountrySelector: FC<CountrySelectorProps> = ({country, setCountry, selectRef}) => {
    const [isInvalidValue, setIsInvalidValue] = useState(false);
    const [inputFocus, setSelectFocus] = useState(false);

    useEffect(() => {
        if (!isNotEmpty(country)){
            setIsInvalidValue(true);
        }
        else {
            setIsInvalidValue(false)
        }
    }, [country]);

    function selectAnotherCountry(e : ChangeEvent<HTMLSelectElement>) {
        setCountry(e.target.value);
    }

    function handleSelectFocus() {
        setSelectFocus(true);
    }

    function handleSelectBlur() {
        setSelectFocus(false);
    }

    return(
        <div className={"edit-form-field"}>
            <div className={`field-label ${isInvalidValue ? "error-text" : ""}`}>
                <span>County&nbsp;</span>
                <span className={"required-mark"}>*</span>
            </div>
            <div className={"field-input-container"}>
                <div className={`border-lining ${inputFocus ? "field-focus" : ""} ${isInvalidValue ? "red-field-focus" : ""}`}>

                </div>
                <select
                    className={"field-select"}
                    id="countries"
                    name="countries"
                    value={country}
                    onChange={selectAnotherCountry}
                    onFocus={handleSelectFocus}
                    onBlur={handleSelectBlur}
                    ref={selectRef}
                >
                    {countries.map((country) => (
                        <option key={country.name} value={country.name}>{country.name}</option>
                    ))}
                </select>
                <div className={"selectArrow"}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
            <div className={"input-field-spacing"}>
                {isInvalidValue &&
                    <div className={"error-box"}>
                        <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                        <span className={"error-text"}>Country is required</span>
                    </div>}
            </div>
        </div>
)};

export default CountrySelector;
