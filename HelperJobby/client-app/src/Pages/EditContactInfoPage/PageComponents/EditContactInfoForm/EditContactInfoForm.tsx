import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import "./EditContactInfoForm.scss";
import PageWrapWithHeader from "../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";
import {faArrowLeftLong, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAuth} from "../../../../hooks/useAuth";
import {useJobSeeker} from "../../../../hooks/useJobSeeker";
import EditFormField from "../EditFormField/EditFormField";
import {ServerError} from "../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {JobSeekerAccountService} from "../../../../services/jobSeekerAccountService";
import {isNotEmpty} from "../../../../utils/commonValidators";
import {JobSeekerAccountDTO} from "../../../../DTOs/accountDTOs/JobSeekerAccountDTO";
import {UpdateJobSeekerAccountDTO} from "../../../../DTOs/accountDTOs/UpdateEmployerAccountDTO";
import CountrySelector from "../CountrySelector/CountrySelector";
import {LocationAutocompleteService} from "../../../../services/locationAutocompleteService";
import {mapCountryWithTld} from "../../../../utils/countryWithTldMapper";
import EditEmail from "../EditEmail/EditEmail";
import {useNavigate} from "react-router-dom";

interface EditContactInfoFormProps {}

const EditContactInfoForm: FC<EditContactInfoFormProps> = () => {
    const {authUser} = useAuth();
    const navigate = useNavigate();
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("");
    const [country, setCountry] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [loading, setLoading] = useState(true);
    
    const firstNameInputRef = useRef<HTMLInputElement>(null);
    const lastNameInputRef = useRef<HTMLInputElement>(null);
    const countryInputRef = useRef<HTMLInputElement>(null);
    const cityInputRef = useRef<HTMLInputElement>(null);
    
    const jobSeekerService = new JobSeekerAccountService;
    const locationAutocompleteService = new LocationAutocompleteService();

    const [streetAddressInputFocus, setStreetAddressInputFocus] = useState(false);
    const [streetAddressAutocompleteResults, setStreetAddressAutocompleteResults] = useState<string[][]>([])
    const streetAddressInputRef = useRef<HTMLInputElement>(null);
    const streetsAutoCompleteRef = useRef<HTMLDivElement | null>(null);
    const [showStreetsAutoComplete, setShowStreetsAutoComplete] = useState(false);
    const [delayedStreetAddress, setDelayedStreetAddress] = useState("");
    const [autoCompleteSelected, setAutoCompleteSelected] = useState(false);
    
    let newJobSeekerInstanceWasLoaded = false;
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (jobSeeker === null){
                    const retrievedJobSeeker = await jobSeekerService.getCurrentJobSeekerAllInfo();
                    setJobSeeker(retrievedJobSeeker);
                    setJobSeekerValues(retrievedJobSeeker);
                    newJobSeekerInstanceWasLoaded = true;
                }
            }
            catch (error){
                if (error instanceof ServerError){
                    logErrorInfo(error);
                }
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!autoCompleteSelected){
                setDelayedStreetAddress(streetAddress);
            }
        }, 300);
        return () => clearTimeout(timeout)
    }, [streetAddress]);

    useEffect(() => {
        const fetchData = async () => {
            if (delayedStreetAddress.length <= 0 || streetAddress.length<=0) {
                return;
            }
            try {
                const response = await locationAutocompleteService.GetAutocompletesForStreetAddress(
                    delayedStreetAddress,
                    mapCountryWithTld(country)
                );
                const separatedValues = response.map((result) => result.split(', '));
                const autoCompleteResults = separatedValues.map((values) => values.slice(0, values.length - 1));
                if (autoCompleteResults.length > 0) {
                    setShowStreetsAutoComplete(true);
                } else {
                    setShowStreetsAutoComplete(false);
                }
                setStreetAddressAutocompleteResults(autoCompleteResults);
            } catch (error) {
                if (error instanceof ServerError) {
                    logErrorInfo(error);
                }
            }
        }
        fetchData();
    }, [delayedStreetAddress]);

    useEffect(() => {
        if (jobSeeker && !newJobSeekerInstanceWasLoaded){
            setJobSeekerValues(jobSeeker);
        }
    }, [jobSeeker]);
    function goBackToJobSeekerProfile() {
        navigate("/my-profile");
    }

    const getTopPosition = () => {
        if (!streetAddressInputRef.current || !streetsAutoCompleteRef.current) {
            return;
        }

        const streetInputRect = streetAddressInputRef.current?.getBoundingClientRect();
        streetsAutoCompleteRef.current.style.left = `${streetInputRect.left}px`;

        const windowScrollY = window.scrollY;
        const viewPortHeight = window.innerHeight;

        if (viewPortHeight - streetInputRect.bottom > 250) {
            streetsAutoCompleteRef.current.style.top = `${streetInputRect.bottom + windowScrollY + 3}px`;
        } else {
            streetsAutoCompleteRef.current.style.top = `${streetInputRect.top + windowScrollY - streetsAutoCompleteRef.current!.clientHeight - 6}px`;
        }
    };

    useEffect(() => {
        getTopPosition();

        const handleResize = () => {
            getTopPosition();
        };

        window.addEventListener('scroll', getTopPosition);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', getTopPosition);
            window.removeEventListener('resize', handleResize);
        };
    }, [streetsAutoCompleteRef, streetAddressInputRef, streetAddressAutocompleteResults]);

    const closeAutocomplete = () => {
        setShowStreetsAutoComplete(false);
    };

    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            const clickedElement = e.target as HTMLElement;
            if (!streetAddressInputRef.current?.contains(clickedElement)) {
                closeAutocomplete();
            }
        };
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);
    
    function setJobSeekerValues(jobSeeker : JobSeekerAccountDTO){
        setFirstName(jobSeeker.firstName);
        setLastName(jobSeeker.lastName);
        setPhoneNumber(jobSeeker.phoneNumber);
        setCountry(jobSeeker.address.country);
        setStreetAddress(jobSeeker.address.streetAddress);
        setCity(jobSeeker.address.city);
        setPostalCode(jobSeeker.address.postalCode);
    }

    async function saveUpdatedInfo(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(!isNotEmpty(firstName)){
            if (firstNameInputRef.current) {
                firstNameInputRef.current.focus();
                return;
            }
        }
        if (!isNotEmpty(lastName))
        {
            if(lastNameInputRef.current){
                lastNameInputRef.current.focus();
                return; 
            }
        }
        if(!isNotEmpty(country)){
            if (countryInputRef.current) {
                countryInputRef.current.focus();
                return;
            }
        }
        if (!isNotEmpty(city))
        {
            if(cityInputRef.current){
                cityInputRef.current.focus();
                return;
            }
        }
        const updateJobSeekerInfo : UpdateJobSeekerAccountDTO = {
            firstName : firstName,
            lastName : lastName,
            phoneNumber : phoneNumber,
            address : {
                country : country,
                streetAddress : streetAddress,
                city : city,
                postalCode : postalCode
            }
        };
        
        try {
            const updatedJobSeeker = await jobSeekerService.putJobSeekerAccount(authUser!.user.id, updateJobSeekerInfo);
            setJobSeeker(updatedJobSeeker);
        }
        catch (error){
            if (error instanceof ServerError){
                logErrorInfo(error)
            }
        }
        finally {
            goBackToJobSeekerProfile();
        }
        
    }

    async function streetAddressChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setAutoCompleteSelected(false);
        setStreetAddress(e.target.value);
    }

    function handleInputFocus() {
        setStreetAddressInputFocus(true);
    }

    function handleInputBlur() {
        setStreetAddressInputFocus(false);
    }


    function handleStreetSelect(locationResult : string[]) {
        const citySeparated = locationResult.slice(locationResult.length-2, locationResult.length);
        const streetAddressSeparated = locationResult.slice(0, locationResult.length-2);
        const lastElement = citySeparated[0];
        if (/\d/.test(lastElement)){
            citySeparated.shift();
            streetAddressSeparated.push(lastElement);
        }
        setCity(citySeparated.join(", "));
        setStreetAddress(streetAddressSeparated.join(", "))
        setAutoCompleteSelected(true);
    }
    

    return (
        loading ? (<span>Loading...</span>) :
            (<PageWrapWithHeader>
                {showStreetsAutoComplete && 
                    <div className={"autocomplete-results"} ref={streetsAutoCompleteRef}>
                    {streetAddressAutocompleteResults.map((locationResult, index)  => (
                        <div className={"autocomplete-result"} key={index} onClick={() => handleStreetSelect(locationResult)}>{locationResult.join(', ')}</div>))}
                    </div>
                }
                <div className={"edit-contact-layout"}>
                  
                  <div className={"back-button-header"}>
                      <button className={"back-button"} onClick={goBackToJobSeekerProfile}>
                          <FontAwesomeIcon icon={faArrowLeftLong}/>
                      </button>
                  </div>
                  <div className={"edit-form-layout"}>
                      <form className={"edit-contact-form"} onSubmit={saveUpdatedInfo}>
                          <div className={"edit-contact-form-header"}>
                              <span>Contact information</span>
                          </div>
                          <EditFormField fieldLabel={"First name"} isRequired={true} inputFieldValue={firstName}
                                         setInputFieldValue={setFirstName} inputRef={firstNameInputRef}/>
                          <EditFormField fieldLabel={"Last name"} isRequired={true} inputFieldValue={lastName}
                                         setInputFieldValue={setLastName} inputRef={lastNameInputRef}/>
                          <EditFormField fieldLabel={"Phone"} isRequired={false} inputFieldValue={phoneNumber}
                                         setInputFieldValue={setPhoneNumber}/>
                          <EditEmail/>
                          <div className={"edit-location-layout"}>
                              <div className={"edit-location-label"}>
                                  Location
                              </div>
                              <div className={"edit-location-subtitle"}>
                                  This helps match you with nearby jobs.
                              </div>
                              <CountrySelector country={country} setCountry={setCountry}></CountrySelector>
                              <div className={"edit-form-field"}>
                                  <div className={`field-label`}>
                                      <span>Street address&nbsp;</span>
                                  </div>
                                  <div className={"field-label-subtitle"}>
                                      Visible only to you
                                  </div>
                                  <div className={"field-input-container"}>
                                      <div className={`border-lining ${streetAddressInputFocus ? "field-focus" : ""}`}>
                                      </div>
                                      <input className={`field-input`}
                                             value={streetAddress}
                                             type={"text"}
                                             onChange={streetAddressChangeHandler}
                                             onFocus={handleInputFocus}
                                             onBlur={handleInputBlur}
                                             ref={streetAddressInputRef}/>
                                  </div>
                                  <div className={"input-field-spacing"}>
                                  </div>
                              </div>
                              <EditFormField fieldLabel={"City"} isRequired={true} inputFieldValue={city}
                                             setInputFieldValue={setCity} inputRef={cityInputRef}/>
                              <EditFormField fieldLabel={"Postal code"} isRequired={false} inputFieldValue={postalCode}
                                             setInputFieldValue={setPostalCode}/>
                          </div>
                          <div className={"edit-form-submit-button-container"}>
                              <button className={"edit-form-submit-button"} type={"submit"}>Save</button>
                          </div>
                      </form>
                  </div>
              </div>
        </PageWrapWithHeader>)
)
};

export default EditContactInfoForm;
