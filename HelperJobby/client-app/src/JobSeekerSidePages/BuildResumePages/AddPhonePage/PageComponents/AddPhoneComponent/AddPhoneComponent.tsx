import React, {FC, useEffect, useRef, useState} from 'react';
import './AddPhoneComponent.scss';
import WhiteLoadingSpinner from "../../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {updateJobSeekerDTO} from "../../../../../utils/jobSeekerDTOsCreator";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {JobSeekerService} from "../../../../../services/jobSeekerService";
import {useNavigate} from "react-router-dom";
import {ProgressPercentPerPage} from "../../../SharedComponents/ProgressPercentPerPage";
import {JobSeekerDTO} from "../../../../../DTOs/accountDTOs/JobSeekerDTO";
import {validatePhoneNumber} from "../../../../../utils/validationLogic/authFormValidators";
import useResumeBuild from "../../../../../hooks/contextHooks/useResumeBuild";
import {useJobSeeker} from "../../../../../hooks/contextHooks/useJobSeeker";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";

interface ResumePhoneComponentProps {
}

const AddPhoneComponent: FC<ResumePhoneComponentProps> = () => {
    const [savingInfo, setSavingInfo] = useState(false);
    const {setProgressPercentage, setSaveFunc} = useResumeBuild();
    const jobSeekerService = new JobSeekerService();
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState(jobSeeker!.phoneNumber);
    const phoneNumberInputRef = useRef<HTMLInputElement>(null);
    const [phoneNumberError, setPhoneNumberError] = useState("");

    useEffect(() => {
        setProgressPercentage(ProgressPercentPerPage * 2);
    }, []);

    useEffect(() => {
        setSaveFunc(() => customSaveFunc)
    }, [phoneNumber]);

    async function customSaveFunc() {
        await updateJobSeekerInfo("/my-profile")
    }

    async function updatePhoneNumber(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        await updateJobSeekerInfo("/build/address")
    }

    async function updateJobSeekerInfo(resultPageURI: string) {
        try {
            if (phoneNumber) {
                const isValidPhoneNumber = validatePhoneNumber(phoneNumber);
                if (isValidPhoneNumber) {
                    setPhoneNumberError(isValidPhoneNumber);
                    phoneNumberInputRef.current?.focus();
                    return;
                }
            }
            
            setSavingInfo(true);
            const updatedJobSeeker = updateJobSeekerDTO(jobSeeker!.firstName,
                jobSeeker!.lastName, phoneNumber, jobSeeker!.address);
            const response = await jobSeekerService.putJobSeekerAccount(jobSeeker!.id, updatedJobSeeker);
            setJobSeeker((prevState) => {
                if (prevState) {

                    const updatedJobSeeker: JobSeekerDTO = {
                        ...prevState,
                        phoneNumber: response.phoneNumber
                    }
                    return updatedJobSeeker;
                }
                return prevState;
            })
            navigate(resultPageURI);

        } catch (error) {
            logErrorInfo(error)
        } 
        finally {
            setSavingInfo(false);
        }
    }

    return (
        <form className={"build-resume-form"}>
            {savingInfo && <div className={"request-in-process-surface"}></div>}
            <div className={"build-page-header"}>
                Would you like to add a phone number to your resume?
            </div>
            <div className={"phone-page-disclaimer"}>
                Only provided to employers you apply or respond to
            </div>
            <CustomInputField
                fieldLabel={"Phone number"}
                isRequired={false}
                inputFieldValue={phoneNumber}
                setInputFieldValue={setPhoneNumber}
                fieldSubtitle={"Include country code (start with +). Phone number must contain only numbers without spaces or dashes"}
                inputRef={phoneNumberInputRef}
                customErrorMessage={phoneNumberError}
                setCustomErrorMessage={setPhoneNumberError}
            />
            <div className={"phone-page-disclaimer"}>
                By submitting the form with this box checked, you confirm that you are the primary user and subscriber
                to the telephone number provided, and you agree to receive calls (including using artificial or
                pre-recorded voice), texts, and WhatsApp messages from employers who use HelperJobby at the telephone
                number provided above.
            </div>
            <button className={"submit-form-button"} onClick={updatePhoneNumber}>
                {savingInfo ?
                    <WhiteLoadingSpinner/>
                    :
                    <span>Continue</span>
                }
            </button>
        </form>
    )
}

export default AddPhoneComponent;
