import React, {Dispatch, FC, RefObject, SetStateAction, useEffect, useRef, useState} from 'react';
import './AutocompleteResultsWindow.scss';
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {LocationAutocompleteService} from "../../../../services/locationAutocompleteService";
import {mapCountryWithA2Code} from "../../../../utils/convertLogic/countryWithA2CodeMapper";
import useSelectWindowPosition from "../../../../hooks/useSelectWindowPosition";
import {AutocompleteWindowTypes} from "../../../../enums/utilityEnums/AutocompleteWindowTypes";

interface AutocompleteResultsWindowProps {
    inputFieldRef: RefObject<HTMLInputElement>;
    windowMaxWidth: string;
    inputValue: string;
    setInputValue: Dispatch<SetStateAction<string>>;
    cityInputValue?: string;
    setCityInputValue?: Dispatch<SetStateAction<string>>;
    country: string;
    showResult: boolean;
    setShowResult: Dispatch<SetStateAction<boolean>>;
    autocompleteWindowType: AutocompleteWindowTypes;
    locationSelected?: boolean;
    setLocationSelected?: Dispatch<SetStateAction<boolean>>;
    windowZIndex? : number;
    includeWindowScroll? : boolean;
}

const AutocompleteResultsWindow: FC<AutocompleteResultsWindowProps> = (props) => {

    const locationAutocompleteService = new LocationAutocompleteService();

    const autoCompleteRef = useRef<HTMLDivElement | null>(null);
    const [autoCompleteSelected, setAutoCompleteSelected] = useState(false);
    const [delayedInputValue, setDelayedInputValue] = useState("");
    const [autocompleteResults, setAutocompleteResults] = useState<string[][]>([]);
    const [loading, setLoading] = useState(true);
    const getAutocompleteWindowPosition = useSelectWindowPosition(props.inputFieldRef, autoCompleteRef, props.setShowResult, 
        props.includeWindowScroll !== undefined ? props.includeWindowScroll : true);

    useEffect(() => {
        getAutocompleteWindowPosition();
    }, [autocompleteResults]);


    useEffect(() => {
        setAutoCompleteSelected(false);
        const timeout = setTimeout(() => {
            if (!autoCompleteSelected) {
                setDelayedInputValue(props.inputValue);
            }
        }, 300);
        return () => clearTimeout(timeout)
    }, [props.inputValue]);


    useEffect(() => {
        const fetchData = async () => {
            if (delayedInputValue.length <= 0 || props.inputValue.length <= 0) {
                return;
            }
            try {
                setLoading(true);
                let response: string [];
                if (props.autocompleteWindowType == AutocompleteWindowTypes.streetAddress) {
                    response = await locationAutocompleteService.GetAutocompletesForStreetAddress(
                        delayedInputValue,
                        mapCountryWithA2Code(props.country)
                    );
                } else {
                    response = await locationAutocompleteService.GetAutocompletesForCities(
                        delayedInputValue,
                        mapCountryWithA2Code(props.country)
                    );
                }

                const separatedValues = response.map((result) => result.split(', '));
                const autoCompleteResults = separatedValues.map((values) => values.slice(0, values.length - 1));
                if (autoCompleteResults.length == 0) {
                    props.setShowResult(false);
                }
                setAutocompleteResults(autoCompleteResults);
            } catch (error) {
                logErrorInfo(error)
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [delayedInputValue]);


    function handleStreetSelect(locationResult: string[]) {
        const cityStreetSeparationIndex = Math.max(1, locationResult.length - 2);
        const streetAddressSeparated = locationResult.slice(0, cityStreetSeparationIndex);
        const citySeparated = locationResult.slice(cityStreetSeparationIndex, locationResult.length);
        const firstCitySeparatedElement = citySeparated[0];
        if (/\d/.test(firstCitySeparatedElement)) {
            citySeparated.shift();
            streetAddressSeparated.push(firstCitySeparatedElement);
        }
        if (props.setCityInputValue) {
            props.setCityInputValue(citySeparated.join(", "));
        }
        props.setInputValue(streetAddressSeparated.join(", "))
        setAutoCompleteSelected(true);
        if (props.setLocationSelected) {
            props.setLocationSelected(true)
        }

    }

    function handleCitySelect(locationResult: string[]) {
        props.setInputValue(locationResult.join(", "))
        setAutoCompleteSelected(true);
        if (props.setLocationSelected) {
            props.setLocationSelected(true)
        }
    }

    return (
        !props.setShowResult ? (<></>) :
            (loading ? <></> :
                    <div
                        className={"select-window-container"}
                        style={{
                            maxWidth: props.windowMaxWidth,
                            width: "100%",
                            zIndex : props.windowZIndex
                        }}
                        ref={autoCompleteRef}
                    >
                        {autocompleteResults.map((locationResult, index) => (
                            props.autocompleteWindowType == AutocompleteWindowTypes.streetAddress ?
                                (<div
                                    className={"select-option"}
                                    key={index}
                                    onClick={() => handleStreetSelect(locationResult)}
                                >
                                    {locationResult.join(', ')}
                                </div>)
                                : (<div
                                    className={"select-option"}
                                    key={index}
                                    onClick={() => handleCitySelect(locationResult)}
                                >
                                    {locationResult.join(', ')}
                                </div>)
                        ))}
                    </div>
            )


    )
};

export default AutocompleteResultsWindow;
