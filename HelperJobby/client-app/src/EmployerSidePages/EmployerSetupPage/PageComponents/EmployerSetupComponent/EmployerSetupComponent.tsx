import React, {FC, FormEvent, useRef, useState} from 'react';
import './EmployerSetupComponent.scss';
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import CustomSelectField from "../../../../Components/CustomSelectField/CustomSelectField";
import {numberOfEmployees} from "../../../../AppConstData/NumberOfEmployees";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import {EmployerAccountService} from "../../../../services/employerAccountService";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import WhiteLoadingSpinner from "../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {CreateEmployerAccountDTO} from "../../../../DTOs/accountDTOs/CreateEmployerAccountDTO";
import {useEmployer} from "../../../../hooks/useEmployer";
import {ServerError} from "../../../../ErrorDTOs/ServerErrorDTO";
import NotifyPopupWindow from "../../../../Components/NotifyPopupWindow/NotifyPopupWindow";
import {IsValidEmail, validatePhoneNumber} from "../../../../utils/validationLogic/authFormValidators";
import {Company} from "../../../../Components/Icons/icons";

interface EmployerSetupComponentProps {
}

const EmployerSetupComponent: FC<EmployerSetupComponentProps> = () => {
    const [companyName, setCompanyName] = useState("");
    const companyInputRef = useRef<HTMLInputElement>(null);
    const [numberOfEmployeesRange, setNumberOfEmployeesRange] = useState("");
    const [employerCredentials, setEmployerCredentials] = useState("");
    const credentialsInputRef = useRef<HTMLInputElement>(null);
    const [contactPhone, setContactPhone] = useState("");
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [employerEmail, setEmployerEmail] = useState("");
    const employerEmailInputRef = useRef<HTMLInputElement>(null);
    const [employerEmailError, setEmployerEmailError] = useState("");
    const [executeFormValidation, setExecuteFormValidation] = useState(false);
    const [requestInProgress, setRequestInProgress] = useState(false);
    const [requestError, setRequestError] = useState("");
    const [showPopupWindow, setShowPopupWindow] = useState(false);
    
    const {setEmployer} = useEmployer();
    const employerService = new EmployerAccountService();


    async function handleFormSubmit(e: FormEvent) {
        e.preventDefault();
        setExecuteFormValidation(true);
        let invalidDataProvided = false;
        if (!companyName) {
            companyInputRef.current?.focus();
            invalidDataProvided = true;
        }
        if (!employerCredentials) {
            credentialsInputRef.current?.focus();
            invalidDataProvided = true;
        }
        
        if (!IsValidEmail(employerEmail)){
            setEmployerEmailError("Error: Invalid email address");
            employerEmailInputRef.current?.focus();
            invalidDataProvided = true;
        }

        if (contactPhone) {
            const isValidPhoneNumber = validatePhoneNumber(contactPhone);
            if (isValidPhoneNumber) {
                setPhoneNumberError(isValidPhoneNumber);
                phoneInputRef.current?.focus();
                invalidDataProvided = true;
            }
        }
        
        if (invalidDataProvided){
            return;
        }

        try {
            setRequestInProgress(true);
            const createEmployerDTO : CreateEmployerAccountDTO = {
                organizationName : companyName,
                fullName : employerCredentials,
                email : employerEmail,
                contactNumber : contactPhone,
                numberOfEmployees : convertNumberOfEmployeesRange()
            }
            
            const retrievedEmployer = await employerService.createEmployerAccount(createEmployerDTO);
            setEmployer(retrievedEmployer);
        } catch (err) {
            logErrorInfo(err);
            if (err instanceof ServerError){
                setRequestError(err.ServerErrorDTO.detail);
                setShowPopupWindow(true);
            }
        } finally {
            setRequestInProgress(false);
        }
    }
    
    function convertNumberOfEmployeesRange() : number | null{
        if (!numberOfEmployeesRange){
            return null;
        }
        const splitNumberRangeValues = numberOfEmployeesRange.match(/\d+/);
        return Number.parseInt(splitNumberRangeValues![0]);
        
    }

    return (
        <div className={"employers-centralized-page-layout"}>
            <NotifyPopupWindow
                isSuccessful={false} 
                text={requestError}
                showNotify={showPopupWindow}
                setShowNotify={setShowPopupWindow}
            />
            <div className={"ems-title-with-img-fb"}>
                <div className={"ems-title-fb"}>
                    <span className={"dark-default-text ems-title"}>Create an employer account</span>
                </div>
                <div className={"ems-image-fb"}>
                    <Company/>
                </div>
            </div>
            <div className={"ems-content"}>
                <span className={"dark-default-text ems-sub-title"}>You haven't posted a job before, so you'll need to create an employer account.</span>
                <div className={"mt1rem"}>
                    <span className={"bold-navigation-link"}>Not here to post a job</span>
                </div>
                <div className="mt2rem"></div>
                <form className={"employers-side-form-fb"}>
                    {requestInProgress && <div className={"request-in-process-surface"}></div>}
                    <CustomInputField
                        fieldLabel={"Your company's name"}
                        isRequired={true}
                        inputFieldValue={companyName}
                        setInputFieldValue={setCompanyName}
                        inputRef={companyInputRef}
                        executeValidation={executeFormValidation}
                        setExecuteValidation={setExecuteFormValidation}
                    />
                    <CustomSelectField
                        fieldLabel={"Your company's number of employees"}
                        fieldValue={numberOfEmployeesRange}
                        setFieldValue={setNumberOfEmployeesRange}
                        optionsArr={numberOfEmployees}
                    />
                    <CustomInputField
                        fieldLabel={"Employer account email address"}
                        fieldSubtitle={"This address must be included in the company's employees' email list unless the company was not registered."}
                        isRequired={true}
                        inputFieldValue={employerEmail}
                        setInputFieldValue={setEmployerEmail}
                        inputRef={employerEmailInputRef}
                        customErrorMessage={employerEmailError}
                        setCustomErrorMessage={setEmployerEmailError}
                        executeValidation={executeFormValidation}
                        setExecuteValidation={setExecuteFormValidation}
                    />
                    <CustomInputField
                        fieldLabel={"Your first and last name"}
                        isRequired={true}
                        inputFieldValue={employerCredentials}
                        setInputFieldValue={setEmployerCredentials}
                        inputRef={credentialsInputRef}
                        executeValidation={executeFormValidation}
                        setExecuteValidation={setExecuteFormValidation}
                    />
                    <CustomInputField
                        fieldLabel={"Your phone number"}
                        fieldSubtitle={"Include country code (start with +). Phone number must contain only numbers without spaces or dashes. For account management communication. Not visible to job seekers."}
                        isRequired={false}
                        inputFieldValue={contactPhone}
                        setInputFieldValue={setContactPhone}
                        customErrorMessage={phoneNumberError}
                        setCustomErrorMessage={setPhoneNumberError}
                        inputRef={phoneInputRef}
                        executeValidation={executeFormValidation}
                        setExecuteValidation={setExecuteFormValidation}
                    />
                    <div className="mb2rem"></div>
                    <button
                        className="blue-button br-corner-button min-continue-button-size"
                        type={'submit'}
                        onClick={handleFormSubmit}
                    >
                        {requestInProgress ? <WhiteLoadingSpinner/>
                            :
                            <>
                                <span>Continue</span>
                                <FontAwesomeIcon className={'svg1rem ml05rem'} icon={faArrowRightLong}/>
                            </>
                        }
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EmployerSetupComponent;
