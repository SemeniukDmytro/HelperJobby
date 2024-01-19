import React, {FC, useEffect, useRef, useState} from 'react';
import './AddNameComponent.scss';
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import useResumeBuild from "../../../../../hooks/useResumeBuild";
import {useNavigate} from "react-router-dom";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";
import {JobSeekerAccountService} from "../../../../../services/jobSeekerAccountService";
import {ServerError} from "../../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {useAuth} from "../../../../../hooks/useAuth";
import WhiteLoadingSpinner from "../../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {updateJobSeekerDTO} from "../../../../../utils/jobSeekerDTOsCreator";
import {ProgressPercentPerPage} from "../../../SharedComponents/ProgressPercentPerPage";
import {isNotEmpty} from "../../../../../utils/validationLogic/isNotEmptyString";
import {JobSeekerAccountDTO} from "../../../../../DTOs/accountDTOs/JobSeekerAccountDTO";

interface ResumeNameComponentProps {}

const AddNameComponent: FC<ResumeNameComponentProps> = () => {
    const {
        setProgressPercentage,
        setSaveFunc,
        setShowDialogWindow} = useResumeBuild();
    const jobSeekerService = new JobSeekerAccountService();
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const {authUser} = useAuth();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(jobSeeker!.firstName);
    const [lastName, setLastName] = useState(jobSeeker!.lastName)
    const [savingInfo, setSavingInfo] = useState(false);
    const firstNameInputRef = useRef<HTMLInputElement>(null);
    const lastNameInputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        if (!firstName){
            firstNameInputRef.current?.focus();
        }
        else if (!lastName){
            lastNameInputRef.current?.focus();
        }
        setProgressPercentage(ProgressPercentPerPage);
    }, []);

    useEffect(() => {
        setSaveFunc(() => customSaveFunc);
    }, [firstName, lastName]);
    async function customSaveFunc(){
        await updateJobSeekerCredentials("/my-profile", true)
    }

    async function moveToPhonePage(e: React.MouseEvent<HTMLButtonElement> ) {
        e.preventDefault();
        await updateJobSeekerCredentials("/build/phone", false);
    }
    async function updateJobSeekerCredentials(resultPageURI : string, isSaveAndExitAction : boolean){
        if(!isNotEmpty(firstName)){
            if (firstNameInputRef.current) {
                firstNameInputRef.current.focus();
                if (isSaveAndExitAction){
                    setShowDialogWindow(true);
                }
                return;
            }
        }
        if (!isNotEmpty(lastName))
        {
            if(lastNameInputRef.current){
                lastNameInputRef.current.focus();
                if (isSaveAndExitAction){
                    setShowDialogWindow(true);
                }
                return;
            }
        }
        try {
            setSavingInfo(true);
            const updatedJobSeeker = updateJobSeekerDTO(firstName, lastName, jobSeeker!.phoneNumber, 
                jobSeeker!.address);
            const response = await jobSeekerService.putJobSeekerAccount(authUser!.user.id, updatedJobSeeker);
            setJobSeeker((prevState) => {
                if (prevState){

                    const updatedJobSeeker : JobSeekerAccountDTO = {
                        ...prevState,
                        firstName : response.firstName,
                        lastName : response.lastName,
                    }
                    return updatedJobSeeker;
                }
                return prevState;
            })
            navigate(resultPageURI);

        }
        catch (e) {
            if (e instanceof ServerError){
                logErrorInfo(e)
            }
        }
        finally {
            setSavingInfo(false);
        }
    }

    return (
        <form className={"build-resume-form"}>
            {savingInfo && <div className={"saving-in-progress-surface"}></div>}
            <div className={"build-page-header"}>
                What is your name?
            </div>
            <CustomInputField fieldLabel={"First name"}
                              isRequired={true}
                              inputFieldValue={firstName} 
                              setInputFieldValue={setFirstName}
                              inputRef={firstNameInputRef}/>
            <CustomInputField fieldLabel={"Last name"}
                              isRequired={true}
                              inputFieldValue={lastName}
                              setInputFieldValue={setLastName}
                              inputRef={lastNameInputRef}/>
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
