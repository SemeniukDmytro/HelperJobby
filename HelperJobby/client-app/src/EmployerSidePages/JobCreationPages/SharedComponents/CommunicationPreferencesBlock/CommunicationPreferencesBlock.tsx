import React, {Dispatch, FC, SetStateAction} from 'react';
import './CommunicationPreferencesBlock.scss';
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import CustomSelectWindow from "../../../../EmployersSideComponents/CustomSelectWindow/CustomSelectWindow";
import {resumeRequirementOptionsMapData} from "../../../../AppConstData/ResumeRequirements";

interface CommunicationPreferencesBlockProps {
    contactEmail: string;
    setContactEmail: Dispatch<SetStateAction<string>>;
    emailInputRef: React.RefObject<HTMLInputElement>;
    emailError: string;
    setEmailError: Dispatch<SetStateAction<string>>;
    executeFormValidation: boolean;
    setExecuteFormValidation: Dispatch<SetStateAction<boolean>>;
    isContactPhoneAvailable: boolean;
    setIsContactPhoneAvailable: Dispatch<SetStateAction<boolean>>;
    contactPhoneNumber: string;
    setContactPhoneNumber: Dispatch<SetStateAction<string>>;
    phoneNumberInputRef: React.RefObject<HTMLInputElement>;
    phoneError: string;
    setPhoneError: Dispatch<SetStateAction<string>>;
    isResumeRequired: string;
    setIsResumeRequired: Dispatch<SetStateAction<string>>;
    includeWindowScrollForSelect: boolean;
}

const CommunicationPreferencesBlock: FC<CommunicationPreferencesBlockProps> = ({
                                                                                   contactEmail,
                                                                                   setContactEmail,
                                                                                   emailInputRef,
                                                                                   emailError,
                                                                                   setEmailError,
                                                                                   executeFormValidation,
                                                                                   setExecuteFormValidation,
                                                                                   isContactPhoneAvailable,
                                                                                   setIsContactPhoneAvailable,
                                                                                   contactPhoneNumber,
                                                                                   setContactPhoneNumber,
                                                                                   phoneNumberInputRef,
                                                                                   phoneError,
                                                                                   setPhoneError,
                                                                                   isResumeRequired,
                                                                                   setIsResumeRequired,
                                                                                   includeWindowScrollForSelect
                                                                               }) => {

    function addAbilityToProvidePhone() {
        setIsContactPhoneAvailable(!isContactPhoneAvailable);
    }

    return (
        <>
            <div className={"small-title"}>Communication preferences</div>
            <CustomInputField
                fieldLabel={"Email for job seekers to contact with you"}
                isRequired={true}
                inputFieldValue={contactEmail}
                setInputFieldValue={setContactEmail}
                inputRef={emailInputRef}
                customErrorMessage={emailError}
                setCustomErrorMessage={setEmailError}
                executeValidation={executeFormValidation}
                setExecuteValidation={setExecuteFormValidation}
            />
            <div className={"checkbox-container mb15rem"} onClick={addAbilityToProvidePhone}>
                <input className={"checkbox"} onChange={addAbilityToProvidePhone} checked={isContactPhoneAvailable}
                       type={"checkbox"}/>
                <span>Let potential candidates contact you by phone</span>
            </div>
            {isContactPhoneAvailable &&
                <CustomInputField
                    fieldLabel={"Phone number for job seekers to contact with you"}
                    fieldSubtitle={"Include country code (start with +). Phone number must contain only numbers without spaces or dashes"}
                    isRequired={false}
                    inputFieldValue={contactPhoneNumber}
                    setInputFieldValue={setContactPhoneNumber}
                    inputRef={phoneNumberInputRef}
                    customErrorMessage={phoneError}
                    setCustomErrorMessage={setPhoneError}
                    executeValidation={executeFormValidation}
                    setExecuteValidation={setExecuteFormValidation}
                />
            }
            <div className={"content-separation-line mt2rem mb3rem"}></div>
            <div className={"small-title"}>Application preferences</div>
            <CustomSelectWindow
                fieldLabel={"Ask potential candidates for a resume?"}
                selectedValue={isResumeRequired}
                setSelectedValue={setIsResumeRequired}
                optionsArr={resumeRequirementOptionsMapData.map(rr => rr.stringValue)}
                includeWindowScroll={includeWindowScrollForSelect}
            />
        </>
    )
}

export default CommunicationPreferencesBlock;
