import React, {FC, FormEvent, useRef, useState} from 'react';
import './EmployerSetupComponent.scss';
import CompanyBuilding from "../../../../Components/icons/CompanyBuilding";
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import CustomSelectField from "../../../../Components/CustomSelectField/CustomSelectField";
import {numberOfEmployees} from "../../../../AppConstData/NumberOfEmployees";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import {EmployerAccountService} from "../../../../services/employerAccountService";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import WhiteLoadingSpinner from "../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {CreateEmployerAccountDTO} from "../../../../DTOs/accountDTOs/CreateEmployerAccountDTO";
import {useAuth} from "../../../../hooks/useAuth";
import {useEmployer} from "../../../../hooks/useEmployer";
import {ServerError} from "../../../../ErrorDTOs/ServerErrorDTO";
import NotifyPopupWindow from "../../../../Components/NotifyPopupWindow/NotifyPopupWindow";

interface EmployerSetupComponentProps {
}

const EmployerSetupComponent: FC<EmployerSetupComponentProps> = () => {
    const [companyName, setCompanyName] = useState("");
    const companyInputRef = useRef<HTMLInputElement>(null);
    const [numberOfEmployeesRange, setNumberOfEmployeesRange] = useState("");
    const [employerCredentials, setEmployerCredentials] = useState("");
    const credentialsInputRef = useRef<HTMLInputElement>(null);
    const [contactPhone, setContactPhone] = useState("");
    const [executeFormValidation, setExecuteFormValidation] = useState(false);
    const [requestInProgress, setRequestInProgress] = useState(false);
    const [requestError, setRequestError] = useState("");
    const [showPopupWindow, setShowPopupWindow] = useState(false);
    
    const {authUser} = useAuth();
    const {setEmployer} = useEmployer();
    const employerService = new EmployerAccountService();


    async function handleFormSubmit(e: FormEvent) {
        e.preventDefault();
        setExecuteFormValidation(true);
        if (!companyName) {
            companyInputRef.current?.focus();
            return;
        }
        if (!employerCredentials) {
            credentialsInputRef.current?.focus();
            return;
        }

        try {
            setRequestInProgress(true);
            const createEmployerDTO : CreateEmployerAccountDTO = {
                organizationName : companyName,
                fullName : employerCredentials,
                email : authUser!.user.email,
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
                    <CompanyBuilding/>
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
                        fieldSubtitle={"For account management communication. Not visible to job seekers.\n"}
                        isRequired={false}
                        inputFieldValue={contactPhone}
                        setInputFieldValue={setContactPhone}
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
