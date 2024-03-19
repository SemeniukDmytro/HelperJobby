import React, {FC, FormEvent, useRef, useState} from 'react';
import './EditEmployerInfoComponent.scss';
import PageTitleWithImage from "../../../../EmployersSideComponents/PageTitleWithImage/PageTitleWithImage";
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import {IsValidEmail, validatePhoneNumber} from "../../../../utils/validationLogic/authFormValidators";
import {EmployerService} from "../../../../services/employerService";
import {UpdateEmployerDTO} from "../../../../DTOs/accountDTOs/UpdateEmployerDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import WhiteLoadingSpinner from "../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import WomanWorking from "../../../../Components/Icons/WomanWorking";
import {useEmployer} from "../../../../hooks/contextHooks/useEmployer";

interface EditEmployerInfoComponentProps {
}

const EditEmployerInfoComponent: FC<EditEmployerInfoComponentProps> = () => {
    const {employer, setEmployer} = useEmployer();
    const [contactNumber, setContactNumber] = useState(employer?.contactNumber || "");
    const [employerEmail, setEmployerEmail] = useState(employer?.email || "");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const phoneNumberInputRef = useRef<HTMLInputElement>(null);
    const [emailError, setEmailError] = useState("");
    const emailRef = useRef<HTMLInputElement>(null);
    const employerService = new EmployerService();
    const [requestInProgress, setRequestInProgress] = useState(false);

    async function saveUpdatedInfo(e: FormEvent) {
        e.preventDefault()
        if (!IsValidEmail(employerEmail)) {
            setEmailError("Error: Invalid email address");
            return;
        } else {
            setEmailError("");
        }
        if (contactNumber) {
            const isValidPhoneNumber = validatePhoneNumber(contactNumber);
            if (isValidPhoneNumber) {
                setPhoneNumberError(isValidPhoneNumber);
                phoneNumberInputRef.current?.focus();
                return;
            }
        }
        try {
            setRequestInProgress(true)
            const updatedEmployer: UpdateEmployerDTO = {
                email: employerEmail,
                contactNumber
            }
            const updatedEmployerInfo = await employerService.updateEmployerAccount(employer!.id, updatedEmployer);
            setEmployer(prev => {
                return prev && {
                    ...prev,
                    email: updatedEmployerInfo.email,
                    contactNumber: updatedEmployerInfo.contactNumber
                }
            })
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setRequestInProgress(false)
        }


    }

    return (
        <div className={"light-grey-page-background"}>
            <div className={"employers-centralized-page-layout"}>
                <PageTitleWithImage imageElement={<WomanWorking/>} title={"Edit employer info"}/>
                <div className={"emp-form-fb"}>
                    <form className={"emp-form-fb"}>
                        <CustomInputField
                            fieldLabel={"Phone"}
                            fieldSubtitle={"Include country code (start with +). Phone number must contain only numbers without spaces or dashes"}
                            isRequired={false}
                            inputFieldValue={contactNumber}
                            setInputFieldValue={setContactNumber}
                            customErrorMessage={phoneNumberError}
                            setCustomErrorMessage={setPhoneNumberError}
                            inputRef={phoneNumberInputRef}
                            maxInputLength={15}
                        />
                        <CustomInputField
                            fieldLabel={"Email address"}
                            isRequired={true}
                            inputFieldValue={employerEmail}
                            setInputFieldValue={setEmployerEmail}
                            customErrorMessage={emailError}
                            setCustomErrorMessage={setEmailError}
                            inputRef={emailRef}
                            maxInputLength={50}
                        />
                        <button onClick={saveUpdatedInfo} className={"br-corner-button blue-button min-4chr-btn-width"}>
                            {requestInProgress ? <WhiteLoadingSpinner/> : <span>Save</span>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default EditEmployerInfoComponent;
