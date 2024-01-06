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
import {useNavigate} from "react-router-dom";
import {UpdateJobSeekerAccountDTO} from "../../../../DTOs/accountDTOs/UpdateEmployerAccountDTO";
import CountrySelector from "../CountrySelector/CountrySelector";
import {countries} from "../../../../AppConstData/CountriesData";
import {LocationAutocompleteService} from "../../../../services/LocationAutocompleteService";

interface EditContactInfoFormProps {}

const EditContactInfoForm: FC<EditContactInfoFormProps> = () => {
    const {authUser} = useAuth();
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
    const navigate = useNavigate();

    const [streetAddressInputFocus, setStreetAddressInputFocus] = useState(false);
    const locationAutocompleteService = new LocationAutocompleteService();
    const [streetAddressAutocompleteResults, setStreetAddressAutocompleteResults] = useState<string[][]>([])
    const streetAddressInputRef = useRef<HTMLInputElement>(null);
    const [autocompleteTop, setAutocompleteTop] = useState<number | null>(null);
    const [autoCompleteLeft, setAutoCompleteLeft] = useState<number | null>(null);
    const autoCompleteRef = useRef<HTMLDivElement | null>(null);
    const [displayAutoCompleteStreetResults, setDisplayAutoCompleteStreetResults] = useState(false);
    let timeoutId: NodeJS.Timeout;
    
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
        if (jobSeeker && !newJobSeekerInstanceWasLoaded){
            setJobSeekerValues(jobSeeker);
        }
    }, [jobSeeker]);

    useEffect(() => {
        const getTopPosition = () => {
            const streetInputRect = streetAddressInputRef.current?.getBoundingClientRect();
            if (streetInputRect == undefined){
                return;
            }
            setAutoCompleteLeft(streetInputRect.left);
            const windowScrollY = window.scrollY;
            const viewPortHeight = window.innerHeight;
            if(viewPortHeight - streetInputRect.bottom > 250){
                setAutocompleteTop(streetInputRect.bottom+windowScrollY + 3)
            }
            else {
                if (autoCompleteRef.current){
                    setAutocompleteTop(streetInputRect.top+windowScrollY-autoCompleteRef.current!.clientHeight - 6)
                }
            }
        };
        getTopPosition();
        window.addEventListener('scroll', getTopPosition);
        return () => {
            window.removeEventListener('scroll', getTopPosition);
        };
    }, [window.scrollY, autoCompleteRef]);

    const closeAutocomplete = () => {
        setDisplayAutoCompleteStreetResults(false);
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
            navigate("/my-profile")
        }
        
    }
    function goBackToJobSeekerProfile() {
        navigate("/my-profile");
    }

    async function changeInputFieldValue(e: ChangeEvent<HTMLInputElement>) {
        setStreetAddress(e.target.value);
        clearTimeout(timeoutId);

        if(streetAddress){
            timeoutId = setTimeout(async () => {
                try {
                    const response = await locationAutocompleteService.GetAutocompletesForStreetAddress(e.target.value, mapCountryWithTld());
                    const autoCompleteResults = response.map((result) => result.split(',').slice(0, 2));
                    if (autoCompleteResults.length > 0){
                        setDisplayAutoCompleteStreetResults(true);
                    }
                    setStreetAddressAutocompleteResults(autoCompleteResults);
                    
                }
                catch (error){
                    if (error instanceof ServerError){
                        logErrorInfo(error)
                    }
                }
            }, 700);
        }
    }

    function mapCountryWithTld(){
        const countryObject = countries.find((c) => c.name === country);

        if (countryObject) {
            return countryObject.tld;
        } else {
            return '';
        }
    }

    function handleInputFocus() {
        setStreetAddressInputFocus(true);
    }

    function handleInputBlur() {
        setStreetAddressInputFocus(false);
    }
    

    return (
        loading ? (<span>Loading...</span>) :
            (<PageWrapWithHeader>
                {displayAutoCompleteStreetResults && <div className={"autocomplete-results"} ref={autoCompleteRef} style={{ top: `${autocompleteTop}px`,
                left: `${autoCompleteLeft}px`}}>
                    {streetAddressAutocompleteResults.map((locationResult, index)  => (
                        <div className={"autocomplete-result"} key={index}>{locationResult.join(',')}</div>
                    ))}
                </div>}
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
                          <div className={"edit-email-layout"}>
                              <div className={"edit-email-label"}>
                                  Email
                              </div>
                              <div className={"change-email-box"}>
                                  <div className={"current-email"}>
                                      {authUser?.user.email}
                                  </div>
                                  <a className={"change-email-link"}>
                                      <span className={"edit-link"}>Edit</span>
                                      <FontAwesomeIcon icon={faArrowRight}/>
                                  </a>
                              </div>
                          </div>
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
                                             onChange={changeInputFieldValue}
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
