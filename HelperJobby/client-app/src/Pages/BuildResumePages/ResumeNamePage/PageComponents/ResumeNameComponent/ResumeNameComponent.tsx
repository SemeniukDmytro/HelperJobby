import React, {FC, useEffect, useRef, useState} from 'react';
import './ResumeNameComponent.scss';
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import useResumeBuild from "../../../../../hooks/useResumeBuild";
import {useNavigate} from "react-router-dom";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";
import {isNotEmpty} from "../../../../../utils/commonValidators";
import {JobSeekerAccountService} from "../../../../../services/jobSeekerAccountService";
import {ServerError} from "../../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {useAuth} from "../../../../../hooks/useAuth";
import WhiteLoadingSpinner from "../../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {createUpdateJobSeekerDTO} from "../../../../../utils/jobSeekerDTOsCreator";

interface ResumeNameComponentProps {}

const ResumeNameComponent: FC<ResumeNameComponentProps> = () => {
    const {
        setProgressPercentage,
        setSaveFunc,} = useResumeBuild();
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
        setProgressPercentage(17);
    }, []);

    useEffect(() => {
        setSaveFunc(() => customSaveFunc);
    }, [firstName, lastName]);
    async function customSaveFunc(){
        await updateJobSeekerCredentials("/my-profile")
    }

    async function moveToPhonePage(e: React.MouseEvent<HTMLButtonElement> ) {
        e.preventDefault();
        await updateJobSeekerCredentials("/build/phone");
    }
    
    async function updateJobSeekerCredentials(resultPageURI : string){
        if(!isNotEmpty(firstName)){
            if (firstNameInputRef.current) {
                firstNameInputRef.current.focus();
                return;
            }
        }
        if (!isNotEmpty(lastName))
        {
            if(lastNameInputRef.current){
                lastNameInputRef.current.focus();
                return;
            }
        }
        try {
            setSavingInfo(true);
            const updatedJobSeeker = createUpdateJobSeekerDTO(firstName, lastName, jobSeeker!.phoneNumber, jobSeeker!.address);
            const response = await jobSeekerService.putJobSeekerAccount(authUser!.user.id, updatedJobSeeker);
            setJobSeeker(response);
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
            {savingInfo && <div className={"saving-surface"}></div>}
            <div className={"build-page-header"}>
                What is your name?
            </div>
            <CustomInputField fieldLabel={"First name"}
                              isRequired={true}
                              inputFieldValue={firstName} 
                              setInputFieldValue={setFirstName}
                              inputRef={lastNameInputRef}/>
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

export default ResumeNameComponent;
