import React, {Dispatch, FC, RefObject, SetStateAction, useEffect, useRef, useState} from 'react';
import './AutocompleteResultsWindow.scss';
import {ServerError} from "../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {LocationAutocompleteService} from "../../../../services/locationAutocompleteService";
import {AutocompleteWindowTypes} from "../../../../enums/AutocompleteWindowTypes";
import {mapCountryWithA2Code} from "../../../../utils/convertLogic/countryWithA2CodeMapper";

interface AutocompleteResultsWindowProps {
    inputFieldRef : RefObject<HTMLInputElement>;
    inputValue : string;
    setInputValue : Dispatch<SetStateAction<string>>;
    cityInputValue?: string;
    setCityInputValue?: Dispatch<SetStateAction<string>>;
    country : string;
    showResult : boolean;
    setShowResult : Dispatch<SetStateAction<boolean>>;
    autocompleteWindowType: AutocompleteWindowTypes;
}

const AutocompleteResultsWindow: FC<AutocompleteResultsWindowProps> = (props) => {

    const locationAutocompleteService = new LocationAutocompleteService();

    const autoCompleteRef = useRef<HTMLDivElement | null>(null);
    const [autoCompleteSelected, setAutoCompleteSelected] = useState(false);
    const [delayedInputValue, setDelayedInputValue] = useState("");
    const [autocompleteResults, setAutocompleteResults] = useState<string[][]>([]);
    const [loading, setLoading] = useState(true);
    const getAutocompleteWindowPosition = () => {
        if (!props.inputFieldRef.current || !autoCompleteRef.current) {
            return;
        }

        const streetInputRect = props.inputFieldRef.current?.getBoundingClientRect();
        autoCompleteRef.current.style.left = `${streetInputRect.left}px`;

        const windowScrollY = window.scrollY;
        const viewPortHeight = window.innerHeight;

        if (viewPortHeight - streetInputRect.bottom > autoCompleteRef.current?.clientHeight) {
            autoCompleteRef.current.style.top = `${streetInputRect.bottom + windowScrollY + 3}px`;
        } else {
            autoCompleteRef.current.style.top = `${streetInputRect.top + windowScrollY - autoCompleteRef.current!.clientHeight - 6}px`;
        }
    };

    useEffect(() => {
        getAutocompleteWindowPosition();

        const handleResize = () => {
            getAutocompleteWindowPosition();
        };

        window.addEventListener('scroll', getAutocompleteWindowPosition);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', getAutocompleteWindowPosition);
            window.removeEventListener('resize', handleResize);
        };
    }, [autoCompleteRef, props.inputFieldRef, autocompleteResults]);
    

    useEffect(() => {
        setAutoCompleteSelected(false);
        const timeout = setTimeout(() => {
            if (!autoCompleteSelected){
                setDelayedInputValue(props.inputValue);
            }
        }, 300);
        return () => clearTimeout(timeout)
    }, [props.inputValue]);
    

    useEffect(() => {
        const fetchData = async () => {
            if (delayedInputValue.length <= 0 || props.inputValue.length<=0) {
                return;
            }
            try {
                setLoading(true);
                let response : string [];
                if (props.autocompleteWindowType == AutocompleteWindowTypes.streetAddress){
                    response = await locationAutocompleteService.GetAutocompletesForStreetAddress(
                        delayedInputValue,
                        mapCountryWithA2Code(props.country)
                    );
                }
                else {
                    response = await locationAutocompleteService.GetAutocompletesForCities(
                        delayedInputValue,
                        mapCountryWithA2Code(props.country)
                    );
                }
                
                const separatedValues = response.map((result) => result.split(', '));
                const autoCompleteResults = separatedValues.map((values) => values.slice(0, values.length - 1));
                if (autoCompleteResults.length == 0){
                    props.setShowResult(false);
                }
                setAutocompleteResults(autoCompleteResults);
            } catch (error) {
                if (error instanceof ServerError) {
                    logErrorInfo(error);
                }
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [delayedInputValue]);
    
    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            const clickedElement = e.target as HTMLElement;
            if (!props.inputFieldRef.current?.contains(clickedElement)) {
                props.setShowResult(false);
            }
        };
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);
    
    function handleStreetSelect(locationResult : string[]) {
        const cityStreetSeparationIndex = Math.max(1, locationResult.length-2);
        const streetAddressSeparated = locationResult.slice(0, cityStreetSeparationIndex);
        const citySeparated = locationResult.slice(cityStreetSeparationIndex, locationResult.length);
        const firstCitySeparatedElement = citySeparated[0];
        if (/\d/.test(firstCitySeparatedElement)){
            citySeparated.shift();
            streetAddressSeparated.push(firstCitySeparatedElement);
        }
        if (props.setCityInputValue){
            props.setCityInputValue(citySeparated.join(", "));
        }
        props.setInputValue (streetAddressSeparated.join(", "))
        setAutoCompleteSelected(true);
    }

    function handleCitySelect(locationResult: string[]) {
        props.setInputValue(locationResult.join(", "))
        setAutoCompleteSelected(true);
    }

    return (
        !props.setShowResult ? (<></>) :
            ( loading ? <></> : 
                <div className={"autocomplete-results"} ref={autoCompleteRef}>
                    {autocompleteResults.map((locationResult, index)  => (
                       props.autocompleteWindowType == AutocompleteWindowTypes.streetAddress ?
                           (<div className={"autocomplete-result"} key={index} onClick={() => handleStreetSelect(locationResult)}>
                               {locationResult.join(', ')}
                           </div>)
                           : (<div className={"autocomplete-result"} key={index} onClick={() => handleCitySelect(locationResult)}>
                               {locationResult.join(', ')}
                           </div>)
                    ))}
                </div>
            )
        
        
)};

export default AutocompleteResultsWindow;
