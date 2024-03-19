import React, {FC, useEffect, useRef, useState} from 'react';
import './AddAddressComponent.scss';
import {JobSeekerService} from "../../../../../services/jobSeekerService";
import CountrySelector from "../../../../EditContactInfoPage/PageComponents/CountrySelector/CountrySelector";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";
import AutocompleteResultsWindow
    from "../../../../EditContactInfoPage/PageComponents/AutocompleteResultsWindow/AutocompleteResultsWindow";
import WhiteLoadingSpinner from "../../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {updateJobSeekerDTO} from "../../../../../utils/jobSeekerDTOsCreator";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {useNavigate} from "react-router-dom";
import {UpdateAddressDTO} from "../../../../../DTOs/addressDTOs/UpdateAddressDTO";
import {ProgressPercentPerPage} from "../../../SharedComponents/ProgressPercentPerPage";
import {JobSeekerDTO} from "../../../../../DTOs/accountDTOs/JobSeekerDTO";
import LocationCustomInputField from "../../../../../Components/LocationCustomInputField/LocationCustomInputField";
import {AutocompleteWindowTypes} from "../../../../../enums/utilityEnums/AutocompleteWindowTypes";
import {useJobSeeker} from "../../../../../hooks/contextHooks/useJobSeeker";
import useResumeBuild from "../../../../../hooks/contextHooks/useResumeBuild";

interface ResumeAddressComponentProps {
}

const AddAddressComponent: FC<ResumeAddressComponentProps> = () => {
    const {
        setProgressPercentage, setSaveFunc,
        setShowDialogWindow
    } = useResumeBuild();
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const jobSeekerService = new JobSeekerService();
    const navigate = useNavigate();

    const [savingInfo, setSavingInfo] = useState(false);
    const [country, setCountry] = useState(jobSeeker!.address?.country || "");
    const countryRef = useRef<HTMLSelectElement>(null);
    const [streetAddress, setStreetAddress] = useState(jobSeeker!.address?.streetAddress || "");
    const streetAddressInputRef = useRef<HTMLInputElement>(null);
    const [city, setCity] = useState(jobSeeker!.address?.city || "");
    const cityInputRef = useRef<HTMLInputElement>(null);
    const [postalCode, setPostalCode] = useState(jobSeeker!.address?.postalCode || "");
    const postalCodeRef = useRef<HTMLInputElement>(null);
    const [showStreetsAutocomplete, setShowStreetsAutocomplete] = useState(false);
    const [showCityAutoComplete, setShowCityAutoComplete] = useState(false);
    const [executeFormValidation, setExecuteFormValidation] = useState(false);


    useEffect(() => {
        setProgressPercentage(ProgressPercentPerPage * 3);
    }, []);

    async function updateAddress(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        await updateJobSeekerAddress("/build/education/add", false);
    }

    useEffect(() => {
        setSaveFunc(() => customSaveFunc)
    }, [country, streetAddress, city, postalCode]);

    async function customSaveFunc() {
        await updateJobSeekerAddress("/my-profile", true)
    }

    async function updateJobSeekerAddress(resultPageURI: string, isSaveAndExitAction: boolean) {
        setExecuteFormValidation(true);

        if (!country || country.length > 45) {
            countryRef.current?.focus();
            if (isSaveAndExitAction) {
                setShowDialogWindow(true);
            }
            return;
        }
        if (!city || city.length > 30) {
            cityInputRef.current?.focus();
            if (isSaveAndExitAction) {
                setShowDialogWindow(true);
            }
            return;
        }

        if (streetAddress.length > 30 || postalCode.length > 10) {
            return;
        }


        try {
            setSavingInfo(true);
            const updatedAddress: UpdateAddressDTO = {
                streetAddress,
                country,
                city,
                postalCode
            }
            const updatedJobSeeker = updateJobSeekerDTO(jobSeeker!.firstName,
                jobSeeker!.lastName, jobSeeker!.phoneNumber, updatedAddress);
            const response = await jobSeekerService.putJobSeekerAccount(jobSeeker!.id, updatedJobSeeker);
            setJobSeeker((prevState) => {
                if (prevState) {

                    const updatedJobSeeker: JobSeekerDTO = {
                        ...prevState,
                        address: response.address
                    }
                    return updatedJobSeeker;
                }
                return prevState;
            })
            navigate(resultPageURI);

        } catch (e) {
            logErrorInfo(e);
        } finally {
            setSavingInfo(false);
        }
    }

    return (

        <div>
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
                fullLocationResult={false}
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
                fullLocationResult={false}
            />}
            <div className={"build-resume-form"}>
                {savingInfo && <div className={"request-in-process-surface"}></div>}
                <div className={"build-page-header subtitle-margin"}>
                    Where are you located?
                </div>
                <div className={"build-page-subtitle"}>
                    This helps match you with nearby jobs
                </div>
                <CountrySelector
                    country={country}
                    setCountry={setCountry}
                    selectRef={countryRef}
                />


                <LocationCustomInputField
                    fieldLabel={"Street address"}
                    inputValue={streetAddress}
                    setInputValue={setStreetAddress}
                    inputRef={streetAddressInputRef}
                    isRequired={false}
                    locationMaxLength={30}
                    setShowAutocompleteResults={setShowStreetsAutocomplete}/>

                <LocationCustomInputField
                    fieldLabel={"City, Province / Territory"}
                    inputValue={city}
                    setInputValue={setCity}
                    inputRef={cityInputRef}
                    isRequired={true}
                    setShowAutocompleteResults={setShowCityAutoComplete}
                    executeValidation={executeFormValidation}
                    setExecuteValidation={setExecuteFormValidation}
                    locationMaxLength={30}
                />

                <CustomInputField
                    fieldLabel={"Postal code"}
                    isRequired={false}
                    inputFieldValue={postalCode}
                    setInputFieldValue={setPostalCode}
                    inputRef={postalCodeRef}
                    maxInputLength={10}
                />
                <button className={"submit-form-button"} onClick={updateAddress}>
                    {savingInfo ?
                        <WhiteLoadingSpinner/>
                        :
                        <span>Continue</span>
                    }
                </button>

            </div>
        </div>
    )
}

export default AddAddressComponent;
