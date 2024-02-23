import React, {FC, FormEvent, useRef, useState} from 'react';
import './EmployerSetupComponent.scss';
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import CustomSelectField from "../../../../Components/CustomSelectField/CustomSelectField";
import {numberOfEmployees} from "../../../../AppConstData/NumberOfEmployees";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import {EmployerService} from "../../../../services/employerService";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import WhiteLoadingSpinner from "../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {CreateEmployerDTO} from "../../../../DTOs/accountDTOs/CreateEmployerDTO";
import {useEmployer} from "../../../../hooks/useEmployer";
import NotifyPopupWindow from "../../../../Components/NotifyPopupWindow/NotifyPopupWindow";
import {IsValidEmail, validatePhoneNumber} from "../../../../utils/validationLogic/authFormValidators";
import {UpdateEmployerDTO} from "../../../../DTOs/accountDTOs/UpdateEmployerDTO";
import {EmployerDTO} from "../../../../DTOs/accountDTOs/EmployerDTO";
import {useAuth} from "../../../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import employerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import Company from "../../../../Components/Icons/Company";
import PageTitleWithImage from "../../../../EmployersSideComponents/PageTitleWithImage/PageTitleWithImage";
import {ServerError} from "../../../../DTOs/errorDTOs/ServerErrorDTO";
import AuthService from "../../../../services/authService";
import {setAuthToken} from "../../../../utils/authTokenInteraction";

interface EmployerSetupComponentProps {
}

const EmployerSetupComponent: FC<EmployerSetupComponentProps> = () => {
    const authService = new AuthService();
    const {employer, setEmployer} = useEmployer();
    const [companyName, setCompanyName] = useState(employer?.organization.name || "");
    const companyInputRef = useRef<HTMLInputElement>(null);
    const [numberOfEmployeesRange, setNumberOfEmployeesRange] = useState("");
    const [employerCredentials, setEmployerCredentials] = useState(employer?.fullName || "");
    const credentialsInputRef = useRef<HTMLInputElement>(null);
    const [contactPhone, setContactPhone] = useState(employer?.contactNumber || "");
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [employerEmail, setEmployerEmail] = useState(employer?.email || "");
    const employerEmailInputRef = useRef<HTMLInputElement>(null);
    const [employerEmailError, setEmployerEmailError] = useState("");
    const [executeFormValidation, setExecuteFormValidation] = useState(false);
    const [requestInProgress, setRequestInProgress] = useState(false);
    const [requestError, setRequestError] = useState("");
    const [showPopupWindow, setShowPopupWindow] = useState(false);
    
    const employerService = new EmployerService();
    const {authUser, setAuthUser} = useAuth();
    const navigate = useNavigate();

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

            let retrievedEmployer : EmployerDTO;
            
            if (employer){
                const updateEmployerDTO : UpdateEmployerDTO = {
                    email : employerEmail,
                    contactNumber : contactPhone
                }
                retrievedEmployer = await employerService.updateEmployerAccount(authUser!.user.id, updateEmployerDTO);
                setEmployer(prev => {
                    return  prev ? {
                        ...prev,
                        contactNumber : retrievedEmployer.contactNumber,
                        email : retrievedEmployer.email
                    } : retrievedEmployer;
                })
            }
            else {
                const createEmployerDTO : CreateEmployerDTO = {
                    organizationName : companyName,
                    fullName : employerCredentials,
                    email : employerEmail,
                    contactNumber : contactPhone,
                    numberOfEmployees : convertNumberOfEmployeesRange()
                }
                retrievedEmployer = await employerService.createEmployerAccount(createEmployerDTO);
                setEmployer(retrievedEmployer);
                const userWithRefreshedToken = await authService.refreshToken();
                setAuthToken(userWithRefreshedToken.token);
                setAuthUser(authUser);
            }
            navigate(employerPagesPaths.ADD_JOB_BASICS)

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
            <PageTitleWithImage imageElement={<Company/>} title={"Create employer account"}/>
            <div className={"ems-content"}>
                <span className={"semi-dark-default-text ems-sub-title"}>You haven't posted a job before, so you'll need to create an employer account.</span>
                <div className={"mt1rem"}>
                    <span className={"bold-navigation-link"}>Not here to post a job</span>
                </div>
                <div className="mt2rem"></div>
                <form className={"emp-form"}>
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
                        isRequired={false}
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
                        className="blue-button br-corner-button min-8chr-btn-width"
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
