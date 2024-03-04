import React, {FC, useEffect, useRef, useState} from 'react';
import "./EditContactInfoForm.scss";
import PageWrapWithHeader from "../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {JobSeekerService} from "../../../../services/jobSeekerService";
import {JobSeekerDTO} from "../../../../DTOs/accountDTOs/JobSeekerDTO";
import {UpdateJobSeekerDTO} from "../../../../DTOs/accountDTOs/UpdateJobSeekerDTO";
import CountrySelector from "../CountrySelector/CountrySelector";
import EditEmail from "../EditEmail/EditEmail";
import {useLocation, useNavigate} from "react-router-dom";
import AutocompleteResultsWindow from "../AutocompleteResultsWindow/AutocompleteResultsWindow";
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import NavigateBackHeader from "../../../../Components/NavigateBackHeader/NavigateBackHeader";
import {validatePhoneNumber} from "../../../../utils/validationLogic/authFormValidators";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import LocationCustomInputField from "../../../../Components/LocationCustomInputField/LocationCustomInputField";
import {AutocompleteWindowTypes} from "../../../../enums/utilityEnums/AutocompleteWindowTypes";
import {useJobSeeker} from "../../../../hooks/contextHooks/useJobSeeker";

interface EditContactInfoFormProps {
}

const EditContactInfoForm: FC<EditContactInfoFormProps> = () => {
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
    const [executeFormValidation, setExecuteFormValidation] = useState(false);
    const location = useLocation();

    const firstNameInputRef = useRef<HTMLInputElement>(null);
    const lastNameInputRef = useRef<HTMLInputElement>(null);
    const countryInputRef = useRef<HTMLSelectElement>(null);
    const cityInputRef = useRef<HTMLInputElement>(null);
    const streetAddressInputRef = useRef<HTMLInputElement>(null);


    const [showStreetsAutocomplete, setShowStreetsAutocomplete] = useState(false);
    const [showCityAutoComplete, setShowCityAutoComplete] = useState(false);

    const jobSeekerService = new JobSeekerService;

    let newJobSeekerInstanceWasLoaded = false;

    useEffect(() => {
        fetchJobSeeker();
    }, []);


    useEffect(() => {
        if (jobSeeker) {
            setLoading(false);
        }
        if (jobSeeker && !newJobSeekerInstanceWasLoaded) {
            setJobSeekerValues(jobSeeker);
        }
    }, [jobSeeker]);

    function navigateToNextPage() {
        if (location.pathname.includes("/edit")) {
            navigate("/my-profile");
            return;
        } else if (location.pathname.includes("/resume")) {
            navigate("/resume");
            return;
        }
    }


    function setJobSeekerValues(jobSeeker: JobSeekerDTO) {
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
        setExecuteFormValidation(true);
        if (!firstName) {
            firstNameInputRef.current?.focus();
            return;
        }
        if (!lastName) {
            lastNameInputRef.current?.focus();
            return;
        }
        if (phoneNumber) {
            const isValidPhoneNumber = validatePhoneNumber(phoneNumber);
            if (isValidPhoneNumber) {
                setPhoneNumberError(isValidPhoneNumber);
                phoneNumberInputRef.current?.focus();
                return;
            }
        }
        
        if (!country) {
            countryInputRef.current?.focus();
            return;
        }
        if (!city) {
            cityInputRef.current?.focus();
            return;
        }
        
        const updateJobSeekerInfo: UpdateJobSeekerDTO = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            address: {
                country: country,
                streetAddress: streetAddress,
                city: city,
                postalCode: postalCode
            }
        };

        try {
            const response = await jobSeekerService.putJobSeekerAccount(jobSeeker!.id, updateJobSeekerInfo);
            setJobSeeker((prevState) => {
                if (prevState) {

                    const updatedJobSeeker: JobSeekerDTO = {
                        ...prevState,
                        firstName: response.firstName,
                        lastName: response.lastName,
                        phoneNumber: response.phoneNumber,
                        address: response.address
                    }
                    return updatedJobSeeker;
                }
                return prevState;
            })


        } catch (error) {
            logErrorInfo(error)
        } finally {
            navigateToNextPage();
        }
    }

    return (
        <PageWrapWithHeader>
            {loading ? <LoadingPage/> :
                <>
                    {showStreetsAutocomplete && <AutocompleteResultsWindow
                        inputFieldRef={streetAddressInputRef}
                        windowMaxWidth={"calc(602px - 2rem)"}
                        inputValue={streetAddress}
                        setInputValue={setStreetAddress}
                        cityInputValue={city}
                        setCityInputValue={setCity}
                        country={country}
                        showResult={showStreetsAutocomplete}
                        setShowResult={setShowStreetsAutocomplete}
                        autocompleteWindowType={AutocompleteWindowTypes.streetAddress}
                    />}

                    {showCityAutoComplete && <AutocompleteResultsWindow
                        inputFieldRef={cityInputRef}
                        windowMaxWidth={"calc(602px - 2rem)"}
                        inputValue={city}
                        setInputValue={setCity}
                        country={country}
                        showResult={showCityAutoComplete}
                        setShowResult={setShowCityAutoComplete}
                        autocompleteWindowType={AutocompleteWindowTypes.city}
                    />}
                    <div className={"page-with-centered-content-layout"}>

                        <NavigateBackHeader onBackButtonClick={navigateToNextPage}/>
                        <div className={"form-layout"}>
                            <form className={"edit-contact-form"} onSubmit={saveUpdatedInfo}>
                                <div className={"edit-contact-form-header"}>
                                    <span>Contact information</span>
                                </div>
                                <CustomInputField
                                    fieldLabel={"First name"} isRequired={true} inputFieldValue={firstName}
                                    setInputFieldValue={setFirstName} inputRef={firstNameInputRef}
                                    executeValidation={executeFormValidation} setExecuteValidation={setExecuteFormValidation}
                                />
                                <CustomInputField
                                    fieldLabel={"Last name"} isRequired={true} inputFieldValue={lastName}
                                    setInputFieldValue={setLastName} inputRef={lastNameInputRef}
                                    executeValidation={executeFormValidation} setExecuteValidation={setExecuteFormValidation}
                                />
                                <CustomInputField
                                    fieldLabel={"Phone"}
                                    fieldSubtitle={"Include country code (start with +). Phone number must contain only numbers without spaces or dashes"}
                                    isRequired={false}
                                    inputFieldValue={phoneNumber}
                                    setInputFieldValue={setPhoneNumber}
                                    customErrorMessage={phoneNumberError}
                                    setCustomErrorMessage={setPhoneNumberError}
                                    inputRef={phoneNumberInputRef}
                                />
                                <EditEmail/>
                                <div className={"edit-location-layout"}>
                                    <div className={"edit-location-label"}>
                                        Location
                                    </div>
                                    <div className={"edit-location-subtitle"}>
                                        This helps match you with nearby jobs.
                                    </div>
                                    <CountrySelector
                                        country={country}
                                        setCountry={setCountry}
                                        selectRef={countryInputRef}
                                    ></CountrySelector>
                                    
                                    <LocationCustomInputField
                                        fieldLabel={"Street address"}
                                        fieldSubtitle={"Visible only to you"}
                                        inputValue={streetAddress}
                                        setInputValue={setStreetAddress}
                                        inputRef={streetAddressInputRef}
                                        isRequired={false}
                                        setShowAutocompleteResults={setShowStreetsAutocomplete}
                                    />
                                    
                                    <LocationCustomInputField
                                        fieldLabel={"City, Province / Territory"}
                                        inputValue={city}
                                        setInputValue={setCity}
                                        inputRef={cityInputRef}
                                        isRequired={true}
                                        setShowAutocompleteResults={setShowCityAutoComplete}
                                        executeValidation={executeFormValidation}
                                        setExecuteValidation={setExecuteFormValidation}
                                    />
                                    <CustomInputField
                                        fieldLabel={"Postal code"} isRequired={false} inputFieldValue={postalCode}
                                        setInputFieldValue={setPostalCode}
                                    />
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
