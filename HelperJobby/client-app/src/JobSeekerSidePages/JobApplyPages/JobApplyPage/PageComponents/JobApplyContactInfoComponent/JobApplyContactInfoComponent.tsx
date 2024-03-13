import React, {FC, useEffect, useRef, useState} from 'react';
import './JobApplyContactInfoComponent.scss';
import JobApplyJobInfoWrap from "../../../SharedComponents/JobApplyJobInfoWrap/JobApplyJobInfoWrap";
import AutocompleteResultsWindow
    from "../../../../EditContactInfoPage/PageComponents/AutocompleteResultsWindow/AutocompleteResultsWindow";
import {AutocompleteWindowTypes} from "../../../../../enums/utilityEnums/AutocompleteWindowTypes";
import {useJobSeeker} from "../../../../../hooks/contextHooks/useJobSeeker";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";
import {JobSeekerDTO} from "../../../../../DTOs/accountDTOs/JobSeekerDTO";
import {validatePhoneNumber} from "../../../../../utils/validationLogic/authFormValidators";
import {UpdateJobSeekerDTO} from "../../../../../DTOs/accountDTOs/UpdateJobSeekerDTO";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {JobSeekerService} from "../../../../../services/jobSeekerService";
import {useAuth} from "../../../../../hooks/contextHooks/useAuth";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LocationCustomInputField from "../../../../../Components/LocationCustomInputField/LocationCustomInputField";
import CustomSelectField from "../../../../../Components/CustomSelectField/CustomSelectField";
import {countries} from "../../../../../AppConstData/CountriesData";
import {useNavigate} from "react-router-dom";
import useCurrentJobApplication from "../../../../../hooks/contextHooks/useCurrentJobApplication";
import WhiteLoadingSpinner from "../../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";

interface JobApplyContactInfoComponentProps {
}

const JobApplyContactInfoComponent: FC<JobApplyContactInfoComponentProps> = () => {
    const {job} = useCurrentJobApplication();
    const {authUser} = useAuth();
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const [city, setCity] = useState(jobSeeker?.address?.city || "");
    const [showCityAutoComplete, setShowCityAutoComplete] = useState(false);
    const cityInputRef = useRef<HTMLInputElement>(null);
    const [firstName, setFirstName] = useState(jobSeeker?.firstName || "");
    const [lastName, setLastName] = useState(jobSeeker?.lastName || "")
    const [phoneNumber, setPhoneNumber] = useState("");
    const [country, setCountry] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const phoneNumberInputRef = useRef<HTMLInputElement>(null);
    const firstNameInputRef = useRef<HTMLInputElement>(null);
    const lastNameInputRef = useRef<HTMLInputElement>(null);
    const [executeFormValidation, setExecuteFormValidation] = useState(false);
    const [showEmailNotification, setShowEmailNotification] = useState(false);
    const [showCountrySelector, setShowCountrySelector] = useState(false);
    const jobSeekerService = new JobSeekerService();
    const navigate = useNavigate();
    const [requestInProgress, setRequestInProgress] = useState(false);

    useEffect(() => {
        if (jobSeeker) {
            setJobSeekerValues(jobSeeker);
        }
    }, [jobSeeker]);

    function setJobSeekerValues(jobSeeker: JobSeekerDTO) {
        setFirstName(jobSeeker.firstName);
        setLastName(jobSeeker.lastName);
        setPhoneNumber(jobSeeker.phoneNumber);
        setCountry(jobSeeker.address?.country || "");
        setCity(jobSeeker.address?.city || "");
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
                streetAddress: jobSeeker?.address?.streetAddress || "",
                city: city,
                postalCode: jobSeeker?.address?.postalCode || ""
            }
        };

        try {
            setRequestInProgress(true)
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
            navigate(`/job-apply/${job?.id}/resume`)

        } catch (error) {
            logErrorInfo(error)
        }
        finally {
            setRequestInProgress(false);
        }
    }

    return (
        <JobApplyJobInfoWrap>
            {showCityAutoComplete && <AutocompleteResultsWindow
                inputFieldRef={cityInputRef}
                windowMaxWidth={"calc(602px - 2rem)"}
                inputValue={city}
                setInputValue={setCity}
                country={jobSeeker?.address?.country || "Canada"}
                showResult={showCityAutoComplete}
                setShowResult={setShowCityAutoComplete}
                autocompleteWindowType={AutocompleteWindowTypes.city}
            />}
            <div className={"ja-contact-info-main"}>
                <div className={"progress-bar-and-exit-container mb15rem"}>
                    <div className={"flex-row jc-end bold-navigation-link"}>
                        Exit
                    </div>
                    <div className={"progress-bar-line mt05rem"}>
                        <div
                            style={{width: "33%"}}
                            className={"progress-bar-filled"}/>
                    </div>
                </div>
                <form
                    onSubmit={saveUpdatedInfo}
                    className={"ja-add-info-form"}>
                    <div className={"ja-contact-info-header"}>
                        Add contact info
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
                    <div className={"field-label"}>
                        Email
                    </div>
                    <div className={"add-info-email-container mb1rem"}>
                        <div className={"dark-default-text"}>
                            {authUser?.user.email}
                        </div>
                        <div
                            onMouseLeave={() => setShowEmailNotification(false)}
                            onMouseEnter={() => setShowEmailNotification(true)}
                            className={"dark-blue-color notification-hover-sign"}>
                            <FontAwesomeIcon
                                className={"svg125rem"}
                                icon={faCircleInfo}/>
                            <div
                                style={{opacity: `${showEmailNotification ? 1 : 0}`}}
                                className={"small-notify"}>
                                This is your account email address. To change it, go to account settings.
                            </div>
                        </div>
                    </div>
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

                    {showCountrySelector ? <CustomSelectField
                            fieldLabel={"Country"}
                            fieldValue={country}
                            setFieldValue={setCountry}
                            optionsArr={countries.map(c => c.name)}
                            isRequired={true}
                            executeValidation={executeFormValidation}
                            setExecuteValidation={setExecuteFormValidation}
                            isInvalidSelect={!country}
                        />
                        :
                        <div className={"grey-tiny-text mb1rem"}>
                            <span>Not in {jobSeeker?.address?.country || "Canada"}?</span>
                            <span
                                onClick={() => setShowCountrySelector(true)}
                                className={"dark-blue-color bold-text bold-navigation-link"}>&nbsp;Change country</span>
                        </div>
                    }
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
                    <div className={"change-resume-info-notify-container mb1rem"}>
                        <FontAwesomeIcon
                            className={"svg125rem icon-right-margin"}
                            icon={faCircleInfo}/>
                        <span className={"dark-small-text"}>
                            Your HelperJobby Resume will also be updated with this contact information.
                        </span>
                    </div>
                    <button
                        disabled={requestInProgress}
                        className={"blue-button min-8chr-btn-width"}
                        type={"submit"}>
                        {requestInProgress ? <WhiteLoadingSpinner/> : <>Continue</>}
                    </button>
                </form>
            </div>
        </JobApplyJobInfoWrap>
    )
}

export default JobApplyContactInfoComponent;
