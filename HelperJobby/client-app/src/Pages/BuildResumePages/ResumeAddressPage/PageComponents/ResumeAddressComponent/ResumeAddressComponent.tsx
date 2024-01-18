import React, {FC, useEffect, useRef, useState} from 'react';
import './ResumeAddressComponent.scss';
import useResumeBuild from "../../../../../hooks/useResumeBuild";
import {useAuth} from "../../../../../hooks/useAuth";
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import {JobSeekerAccountService} from "../../../../../services/jobSeekerAccountService";
import CountrySelector from "../../../../EditContactInfoPage/PageComponents/CountrySelector/CountrySelector";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";
import AutocompleteResultsWindow
    from "../../../../EditContactInfoPage/PageComponents/AutocompleteResultsWindow/AutocompleteResultsWindow";
import {AutocompleteWindowTypes} from "../../../../../enums/AutocompleteWindowTypes";
import WhiteLoadingSpinner from "../../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {createUpdateJobSeekerDTO} from "../../../../../utils/jobSeekerDTOsCreator";
import {ServerError} from "../../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {useNavigate} from "react-router-dom";
import {UpdateAddressDTO} from "../../../../../DTOs/addressDTOs/UpdateAddressDTO";
import {ProgressPercentPerPage} from "../../../SharedComponents/ProgressPercentPerPage";
import {isNotEmpty} from "../../../../../utils/validationLogic/isNotEmptyString";
import {JobSeekerAccountDTO} from "../../../../../DTOs/accountDTOs/JobSeekerAccountDTO";

interface ResumeAddressComponentProps {}

const ResumeAddressComponent: FC<ResumeAddressComponentProps> = () => {
    const {setProgressPercentage, setSaveFunc,
        setShowDialogWindow} = useResumeBuild();
    const {authUser} = useAuth();
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const jobSeekerService = new JobSeekerAccountService();
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

    async function customSaveFunc(){
        await updateJobSeekerAddress("/my-profile", true)
    }

    async function updateJobSeekerAddress(resultPageURI : string, isSaveAndExitAction : boolean){
        if(!isNotEmpty(country)){
            if (countryRef.current) {
                countryRef.current.focus();
                if (isSaveAndExitAction){
                    setShowDialogWindow(true);
                }
                return;
            }
        }
        if (!isNotEmpty(city))
        {
            if(cityInputRef.current){
                cityInputRef.current.focus();
                if (isSaveAndExitAction){
                    setShowDialogWindow(true);
                }
                return;
            }
        }
        
        try {
            setSavingInfo(true);
            const updatedAddress : UpdateAddressDTO = {
                streetAddress,
                country,
                city,
                postalCode
            }
            const updatedJobSeeker = createUpdateJobSeekerDTO(jobSeeker!.firstName,
                jobSeeker!.lastName, jobSeeker!.phoneNumber, updatedAddress);
            const response = await jobSeekerService.putJobSeekerAccount(authUser!.user.id, updatedJobSeeker);
            setJobSeeker((prevState) => {
                if (prevState){

                    const updatedJobSeeker : JobSeekerAccountDTO = {
                        ...prevState,
                        address : response.address
                    }
                    return updatedJobSeeker;
                }
                return prevState;
            })
            navigate(resultPageURI);

        }
        catch (e) {
            logErrorInfo(e);
        }
        finally {
            setSavingInfo(false);
        }
    }

    return (

        <div>
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
            <div className={"build-resume-form"}>
                {savingInfo && <div className={"saving-in-progress-surface"}></div>}
                <div className={"build-page-header subtitle-margin"}>
                    Where are you located?
                </div>
                <div className={"build-page-subtitle"}>
                    This helps match you with nearby jobs
                </div>
                <CountrySelector country={country}
                                 setCountry={setCountry}
                                 selectRef={countryRef}/>

                <CustomInputField fieldLabel={"Street address"}
                                  isRequired={false}
                                  inputFieldValue={streetAddress}
                                  setInputFieldValue={setStreetAddress}
                                  displayGoogleLogo={true}
                                  inputRef={streetAddressInputRef} 
                                  setShowAutocompleteWindow={setShowStreetsAutocomplete}/>

                <CustomInputField fieldLabel={"City, Province / Territory"}
                                  isRequired={true}
                                  inputFieldValue={city}
                                  setInputFieldValue={setCity}
                                  inputRef={cityInputRef}
                                  displayGoogleLogo={true}
                                  setShowAutocompleteWindow={setShowCityAutoComplete}/>

                <CustomInputField fieldLabel={"Postal code"}
                                  isRequired={false}
                                  inputFieldValue={postalCode}
                                  setInputFieldValue={setPostalCode}
                                  inputRef={postalCodeRef}/>
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

export default ResumeAddressComponent;
