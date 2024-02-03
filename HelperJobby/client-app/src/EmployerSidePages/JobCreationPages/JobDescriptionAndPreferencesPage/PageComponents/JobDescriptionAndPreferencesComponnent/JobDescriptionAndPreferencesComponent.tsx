import React, {FC, useState} from 'react';
import './JobDescriptionAndPreferencesComponnent.scss';
import PageTitleWithImage from "../../../../../EmployersSideComponents/PageTitleWithImage/PageTitleWithImage";
import TeamAnalysis from "../../../../../Components/Icons/TeamAnalysis";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";
import {useEmployer} from "../../../../../hooks/useEmployer";
import {resumeRequirements} from "../../../../../AppConstData/ResumeRequirements";
import JobCreateNavigationButtons
    from "../../../SharedComponents/JobCreateNavigationButtons/JobCreateNavigationButtons";
import {useNavigate} from "react-router-dom";
import employerPagesPaths from "../../../../../AppRoutes/Paths/EmployerPagesPaths";
import CustomSelectWindow from "../../../../../EmployersSideComponents/CustomSelectWindow/CustomSelectWindow";

interface JobDescriptionAndPreferencesComponentProps {}

const JobDescriptionAndPreferencesComponent: FC<JobDescriptionAndPreferencesComponentProps> = () => {
    const {employer} = useEmployer();
    const [jobDescription, setJobDescription] = useState("");
    const [isInvalidDescription, setIsInvalidDescription] = useState(false);
    const [descriptionError, setDescriptionError] = useState("");
    const [contactEmail, setContactEmail] = useState(employer!.email);
    const [emailError, setEmailError] = useState("");
    const [contactPhoneNumber, setContactPhoneNumber] = useState(employer!.contactNumber);
    const [phoneError, setPhoneError] = useState("");
    const [executeFormValidation, setExecuteFormValidation] = useState(false);
    const [isContactPhoneAvailable, setIsContactPhoneAvailable] = useState(false);
    const [isResumeRequired, setIsResumeRequired] = useState("");
    const navigate = useNavigate();
    function changeDescriptionValue(event: React.FormEvent<HTMLDivElement>) {
        validateDescription(event.currentTarget.innerHTML);
        setJobDescription(event.currentTarget.innerHTML);
    }
    
    function validateDescription(descriptionValue : string){
        if (descriptionValue.length < 30){
            setDescriptionError("Add a job description with a minimum of 30 characters.");
            setIsInvalidDescription(true);
        }
        else {
            setDescriptionError("");
            setIsInvalidDescription(false);
        }
    }

    function addAbilityToProvidePhone() {
        setIsContactPhoneAvailable(!isContactPhoneAvailable);
    }

    function handleDescriptionAndPreferencesSubmit() {
        
    }

    function navigateToPreviousPage() {
        navigate(employerPagesPaths.COMPENSATION_DETAILS);
    }

    return <div className={"employers-centralized-page-layout"}>
        <PageTitleWithImage imageElement={<TeamAnalysis/>}
                            title={"Add description and set preferences"}/>
        <div className={"crj-form-fb"}>
            <form className={"emp-form-fb"}>
                <div className={"description-container"}>
                    <div
                        className={`small-title horizontal-title ${isInvalidDescription ? "error-text" : ""}`}
                        style={{marginBottom: "0.25rem"}}
                    >
                        <span>Job description</span>
                        <span className={"error-text"}>&nbsp;*</span>
                    </div>
                    <div style={{position: "relative", marginTop: "0.5rem"}}>
                        <div
                            role={"textbox"}
                            contentEditable={true}
                            className={`description-input ${isInvalidDescription ? "red-field-focus" : ""}`}
                            onInput={changeDescriptionValue}
                            onBlur={() => validateDescription(jobDescription)}
                        >
                        </div>
                        <div className={`description-focused ${isInvalidDescription ? "red-field-focus" : ""}`}></div>
                    </div>
                    <div className={"mt15rem mb1rem"}>
                        <a className={"bold-navigation-link"}>Upload a PDF or DOCX</a>
                    </div>
                    {isInvalidDescription &&
                        <div className={"error-box"}>
                            <FontAwesomeIcon className={`error-text error-svg`} icon={faCircleExclamation}/>
                            <span className={"error-text"}>{descriptionError}</span>
                        </div>
                    }
                </div>
                <div className={"content-separation-line mt2rem mb3rem"}></div>
                <div className={"small-title"}>Communication preferences</div>
                <CustomInputField
                    fieldLabel={"Email for job seekers to contact with you"}
                    isRequired={true}
                    inputFieldValue={contactEmail}
                    setInputFieldValue={setContactEmail}
                    customErrorMessage={emailError}
                    setCustomErrorMessage={setEmailError}
                    executeValidation={executeFormValidation}
                    setExecuteValidation={setExecuteFormValidation}
                />
                <div className={"checkbox-container mb15rem"} onClick={addAbilityToProvidePhone}>
                    <input className={"checkbox"} checked={isContactPhoneAvailable} type={"checkbox"}/>
                    <span>Let potential candidates contact you by phone</span>
                </div>
                {isContactPhoneAvailable &&
                    <CustomInputField
                        fieldLabel={"Phone number for job seekers to contact with you"}
                        fieldSubtitle={"Include country code (start with +). Phone number must contain only numbers without spaces or dashes"}
                        isRequired={false}
                        inputFieldValue={contactPhoneNumber}
                        setInputFieldValue={setContactPhoneNumber}
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
                    optionsArr={resumeRequirements}
                />
                <JobCreateNavigationButtons
                    backButtonOnClick={navigateToPreviousPage}
                    nextPageButtonClick={handleDescriptionAndPreferencesSubmit}
                />
            </form>
        </div>
    </div>
}

export default JobDescriptionAndPreferencesComponent;
