import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import "./EditContactInfoForm.scss";
import PageWrapWithHeader from "../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAuth} from "../../../../hooks/useAuth";
import {useJobSeeker} from "../../../../hooks/useJobSeeker";
import {ServerError} from "../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {JobSeekerAccountService} from "../../../../services/jobSeekerAccountService";
import {JobSeekerAccountDTO} from "../../../../DTOs/accountDTOs/JobSeekerAccountDTO";
import {UpdateJobSeekerAccountDTO} from "../../../../DTOs/accountDTOs/UpdateJobSeekerAccountDTO";
import CountrySelector from "../CountrySelector/CountrySelector";
import EditEmail from "../EditEmail/EditEmail";
import {useLocation, useNavigate} from "react-router-dom";
import AutocompleteResultsWindow from "../AutocompleteResultsWindow/AutocompleteResultsWindow";
import {AutocompleteWindowTypes} from "../../../../enums/AutocompleteWindowTypes";
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import {isNotEmpty} from "../../../../utils/validationLogic/isNotEmptyString";
import NavigateBackHeader from "../../../../Components/NavigateBackHeader/NavigateBackHeader";
import {validatePhoneNumber} from "../../../../utils/validationLogic/authFormValidators";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";

interface EditContactInfoFormProps {}

const EditContactInfoForm: FC<EditContactInfoFormProps> = () => {
    const {authUser} = useAuth();
    const navigate = useNavigate();
    const {jobSeeker, setJobSeeker, fetchJobSeeker} = useJobSeeker();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const phoneNumberInputRef = useRef<HTMLInputElement>(null);
    const [country, setCountry] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    
    const firstNameInputRef = useRef<HTMLInputElement>(null);
    const lastNameInputRef = useRef<HTMLInputElement>(null);
    const countryInputRef = useRef<HTMLSelectElement>(null);
    const cityInputRef = useRef<HTMLInputElement>(null);
    const streetAddressInputRef = useRef<HTMLInputElement>(null);
    

    const [showStreetsAutocomplete, setShowStreetsAutocomplete] = useState(false);
    const [showCityAutoComplete, setShowCityAutoComplete] = useState(false);
    
    const jobSeekerService = new JobSeekerAccountService;
    
    let newJobSeekerInstanceWasLoaded = false;
    
    useEffect(() => {
        fetchJobSeeker();
    }, []);

    

    useEffect(() => {
        if (jobSeeker){
            setLoading(false);
        }
        if (jobSeeker && !newJobSeekerInstanceWasLoaded){
            setJobSeekerValues(jobSeeker);
        }
    }, [jobSeeker]);
    function navigateToNextPage() {
        if (location.pathname.includes("/edit")){
            navigate("/my-profile");
            return;
        }
        else if (location.pathname.includes("/resume")){
            navigate("/resume");
            return;
        }
    }

    
    
    function setJobSeekerValues(jobSeeker : JobSeekerAccountDTO){
        setFirstName(jobSeeker.firstName);
        setLastName(jobSeeker.lastName);
        setPhoneNumber(jobSeeker.phoneNumber);
        setCountry(jobSeeker.address?.country || "");
        setStreetAddress(jobSeeker.address?.streetAddress || "");
        setCity(jobSeeker.address?.city || "");
        setPostalCode(jobSeeker.address?.postalCode || "");
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
        if (phoneNumber){
            const isValidPhoneNumber = validatePhoneNumber(phoneNumber);
            if (isValidPhoneNumber){
                setPhoneNumberError(isValidPhoneNumber);
                phoneNumberInputRef.current?.focus();
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
            const response = await jobSeekerService.putJobSeekerAccount(authUser!.user.id, updateJobSeekerInfo);
            setJobSeeker((prevState) => {
                if (prevState){

                    const updatedJobSeeker : JobSeekerAccountDTO = {
                        ...prevState,
                        firstName : response.firstName,
                        lastName : response.lastName,
                        phoneNumber : response.phoneNumber,
                        address : response.address
                    }
                    return updatedJobSeeker;
                }
                return prevState;
            })
            
            
        }
        catch (error){
            if (error instanceof ServerError){
                logErrorInfo(error)
            }
        }
        finally {
            navigateToNextPage();
        }
    }

    return (
        <PageWrapWithHeader>
            {loading ? <LoadingPage/> :
            <>
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
                <div className={"page-with-centered-content-layout"}>

                    <NavigateBackHeader onBackButtonClick={navigateToNextPage}/>
                    <div className={"form-layout"}>
                        <form className={"edit-contact-form"} onSubmit={saveUpdatedInfo}>
                            <div className={"edit-contact-form-header"}>
                                <span>Contact information</span>
                            </div>
                            <CustomInputField fieldLabel={"First name"} isRequired={true} inputFieldValue={firstName}
                                              setInputFieldValue={setFirstName} inputRef={firstNameInputRef}/>
                            <CustomInputField fieldLabel={"Last name"} isRequired={true} inputFieldValue={lastName}
                                              setInputFieldValue={setLastName} inputRef={lastNameInputRef}/>
                            <CustomInputField
                                fieldLabel={"Phone"}
                                fieldSubtitle={"Include country code (start with +). Phone number must contain only numbers without spaces or dashes"}
                                isRequired={false}
                                inputFieldValue={phoneNumber}
                                setInputFieldValue={setPhoneNumber}
                                customErrorMessage={phoneNumberError}
                                setCustomErrorMessage={setPhoneNumberError}
                                inputRef={phoneNumberInputRef}/>
                            <EditEmail/>
                            <div className={"edit-location-layout"}>
                                <div className={"edit-location-label"}>
                                    Location
                                </div>
                                <div className={"edit-location-subtitle"}>
                                    This helps match you with nearby jobs.
                                </div>
                                <CountrySelector country={country} setCountry={setCountry} selectRef={countryInputRef}></CountrySelector>
                                <CustomInputField fieldLabel={"Street address"} isRequired={false} inputFieldValue={streetAddress} setInputFieldValue={setStreetAddress}
                                                  setShowAutocompleteWindow={setShowStreetsAutocomplete} inputRef={streetAddressInputRef}
                                                  fieldSubtitle={"Visible only to you"} displayGoogleLogo={true}/>
                                <CustomInputField fieldLabel={"City, Province / Territory"} isRequired={true} inputFieldValue={city} inputRef={cityInputRef}
                                                  setInputFieldValue={setCity}
                                                  setShowAutocompleteWindow={setShowCityAutoComplete} displayGoogleLogo={true}/>
                                <CustomInputField fieldLabel={"Postal code"} isRequired={false} inputFieldValue={postalCode}
                                                  setInputFieldValue={setPostalCode}/>
                            </div>
                            <div className={"edit-form-submit-button-container"}>
                                <button className={"submit-form-button"} type={"submit"}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>}
    </PageWrapWithHeader>
)
};

export default EditContactInfoForm;