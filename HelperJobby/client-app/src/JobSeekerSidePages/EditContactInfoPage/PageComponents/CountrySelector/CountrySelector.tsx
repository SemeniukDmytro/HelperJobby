import React, {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './CountrySelector.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {countries} from "../../../../AppConstData/CountriesData";
import {isNotEmpty} from "../../../../utils/validationLogic/isNotEmptyString";

interface CountrySelectorProps {
    country: string;
    setCountry: Dispatch<SetStateAction<string>>;
    selectRef: React.RefObject<HTMLSelectElement>;
}

const CountrySelector: FC<CountrySelectorProps> = ({
                                                       country,
                                                       setCountry,
                                                       selectRef
                                                   }) => {
    const [showCountrySelector, setShowCountrySelector] = useState(false);

    useEffect(() => {
        if (!isNotEmpty(country)) {
            setCountry("Canada")
        }
    }, [country]);

    function selectAnotherCountry(e: ChangeEvent<HTMLSelectElement>) {
        setCountry(e.target.value);
    }

    function showChangeCountrySelector() {
        setShowCountrySelector(true);
        if (country == "") {
            setCountry("Canada");
        }
    }

    return (
        <div className={"edit-form-field"}>
            <div className={`field-label`}>
                <span>Country&nbsp;</span>
            </div>
            {!showCountrySelector ? (<div className={"default-country-container"}>
                    <div className={""}>
                        <span>{country || "Canada"}</span>
                    </div>
                    <a className={"bold-navigation-link"} onClick={showChangeCountrySelector}>
                        Change
                    </a>
                </div>)
                :
                (<div className={"field-input-container"}>
                    <div className={`border-lining`}>

                    </div>
                    <select
                        className={"field-select"}
                        id="countries"
                        name="countries"
                        value={country}
                        onChange={selectAnotherCountry}
                        ref={selectRef}
                    >
                        <option placeholder={"Select country"} disabled={true}>Select country</option>
                        {countries.map((country) => (
                            <option key={country.name} value={country.name}>{country.name}</option>
                        ))}
                    </select>
                    <div className={"selectArrow"}>
                        <FontAwesomeIcon className={"svg1rem light-dark-svg"} icon={faChevronDown}/>
                    </div>
                </div>)}
            <div className={"input-field-spacing"}>
            </div>
        </div>
    )
};

export default CountrySelector;
