import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import "./EditContactInfoForm.scss";
import PageWrapWithHeader from "../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";
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
import EditEmail from "../EditEmail/EditEmail";
import {useNavigate} from "react-router-dom";
import AutocompleteResultsWindow from "../AutocompleteResultsWindow/AutocompleteResultsWindow";
import {AutocompleteWindowTypes} from "../../../../enums/AutocompleteWindowTypes";

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
    const streetAddressInputRef = useRef<HTMLInputElement>(null);
    

    const [showStreetsAutocomplete, setShowStreetsAutocomplete] = useState(false);
    const [showCityAutoComplete, setShowCityAutoComplete] = useState(false);
    
    const jobSeekerService = new JobSeekerAccountService;
    
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
    function goBackToJobSeekerProfile() {
        navigate("/my-profile");
    }

    
    
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

    return (
        loading ? (<span>Loading...</span>) :
            (<PageWrapWithHeader>
                {showStreetsAutocomplete && <AutocompleteResultsWindow inputFieldRef={streetAddressInputRef}
                                                                       inputValue={streetAddress}
                                                                       setInputValue={setStreetAddress}
                                                                       cityInputValue={city}
                                                                       setCityInputValue={setCity}
                                                                       country={country}
                                                                       showResult={showStreetsAutocomplete}
                                                                       setShowResult={setShowStreetsAutocomplete}
                                                                       autocompleteWindowType={AutocompleteWindowTypes.streetAddress}/>}
                
                {showCityAutoComplete && <AutocompleteResultsWindow inputFieldRef={cityInputRef}
                                                                    inputValue={city}
                                                                    setInputValue={setCity}
                                                                    country={country}
                                                                    showResult={showCityAutoComplete}
                                                                    setShowResult={setShowCityAutoComplete}
                                                                    autocompleteWindowType={AutocompleteWindowTypes.city}/>}
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
                              <EditFormField fieldLabel={"Street address"} isRequired={false} inputFieldValue={streetAddress} setInputFieldValue={setStreetAddress}
                                             setShowAutocompleteWindow={setShowStreetsAutocomplete} inputRef={streetAddressInputRef}
                              fieldSubtitle={"Visible only to you"}/>
                              <EditFormField fieldLabel={"City, Province / Territory"} isRequired={true} inputFieldValue={city} inputRef={cityInputRef}
                                             setInputFieldValue={setCity}
                                             setShowAutocompleteWindow={setShowCityAutoComplete}/>
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
