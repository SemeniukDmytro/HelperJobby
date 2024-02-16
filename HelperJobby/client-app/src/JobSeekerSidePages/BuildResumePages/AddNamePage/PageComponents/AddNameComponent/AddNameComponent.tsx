import React, {FC, useEffect, useRef, useState} from 'react';
import './AddNameComponent.scss';
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import useResumeBuild from "../../../../../hooks/useResumeBuild";
import {useNavigate} from "react-router-dom";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";
import {JobSeekerService} from "../../../../../services/jobSeekerService";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import WhiteLoadingSpinner from "../../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {updateJobSeekerDTO} from "../../../../../utils/jobSeekerDTOsCreator";
import {ProgressPercentPerPage} from "../../../SharedComponents/ProgressPercentPerPage";
import {JobSeekerDTO} from "../../../../../DTOs/accountDTOs/JobSeekerDTO";

interface ResumeNameComponentProps {
}

const AddNameComponent: FC<ResumeNameComponentProps> = () => {
    const {
        setProgressPercentage,
        setSaveFunc,
        setShowDialogWindow
    } = useResumeBuild();
    const jobSeekerService = new JobSeekerService();
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(jobSeeker!.firstName);
    const [lastName, setLastName] = useState(jobSeeker!.lastName)
    const [savingInfo, setSavingInfo] = useState(false);
    const firstNameInputRef = useRef<HTMLInputElement>(null);
    const lastNameInputRef = useRef<HTMLInputElement>(null);
    const [executeFormValidation, setExecuteFormValidation] = useState(false);
    
    useEffect(() => {
        if (!firstName) {
            firstNameInputRef.current?.focus();
        } else if (!lastName) {
            lastNameInputRef.current?.focus();
        }
        setProgressPercentage(ProgressPercentPerPage);
    }, []);

    useEffect(() => {
        setSaveFunc(() => customSaveFunc);
    }, [firstName, lastName]);

    async function customSaveFunc() {
        await updateJobSeekerCredentials("/my-profile", true)
    }

    async function moveToPhonePage(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        await updateJobSeekerCredentials("/build/phone", false);
    }

    async function updateJobSeekerCredentials(resultPageURI: string, isSaveAndExitAction: boolean) {
        setExecuteFormValidation(true);

        if (!lastName) {
            if (lastNameInputRef.current) {
                lastNameInputRef.current.focus();
                if (isSaveAndExitAction) {
                    setShowDialogWindow(true);
                }
                return;
            }
        }
        
        if (!firstName) {
            if (firstNameInputRef.current) {
                firstNameInputRef.current.focus();
                if (isSaveAndExitAction) {
                    setShowDialogWindow(true);
                }
                return;
            }
        }
        
        try {
            setSavingInfo(true);
            const updatedJobSeeker = updateJobSeekerDTO(firstName, lastName, jobSeeker!.phoneNumber,
                jobSeeker!.address);
            const response = await jobSeekerService.putJobSeekerAccount(jobSeeker!.id, updatedJobSeeker);
            setJobSeeker((prevState) => {
                if (prevState) {

                    const updatedJobSeeker: JobSeekerDTO = {
                        ...prevState,
                        firstName: response.firstName,
                        lastName: response.lastName,
                    }
                    return updatedJobSeeker;
                }
                return prevState;
            })
            navigate(resultPageURI);

        } catch (error) {
            logErrorInfo(error)
        } finally {
            setSavingInfo(false);
        }
    }

    return (
        <form className={"build-resume-form"}>
            {savingInfo && <div className={"request-in-process-surface"}></div>}
            <div className={"build-page-header"}>
                What is your name?
            </div>
            <CustomInputField
                fieldLabel={"First name"}
                isRequired={true}
                inputFieldValue={firstName}
                setInputFieldValue={setFirstName}
                inputRef={firstNameInputRef}
                executeValidation={executeFormValidation}
                setExecuteValidation={setExecuteFormValidation}
            />
            <CustomInputField
                fieldLabel={"Last name"}
                isRequired={true}
                inputFieldValue={lastName}
                setInputFieldValue={setLastName}
                inputRef={lastNameInputRef}
                executeValidation={executeFormValidation}
                setExecuteValidation={setExecuteFormValidation}
            />
            <button className={"submit-form-button"} onClick={moveToPhonePage} disabled={savingInfo}>
                {savingInfo ?
                    <WhiteLoadingSpinner/>
                    :
                    <span>Continue</span>
                }
            </button>
        </form>

    )
};

export default AddNameComponent;
