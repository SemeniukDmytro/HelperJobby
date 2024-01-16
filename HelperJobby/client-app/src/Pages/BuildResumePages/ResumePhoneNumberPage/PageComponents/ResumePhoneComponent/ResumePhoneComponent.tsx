import React, {FC, useEffect, useRef, useState} from 'react';
import './ResumePhoneComponent.scss';
import useResumeBuild from "../../../../../hooks/useResumeBuild";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import WhiteLoadingSpinner from "../../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import {createUpdateJobSeekerDTO} from "../../../../../utils/jobSeekerDTOsCreator";
import {ServerError} from "../../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {JobSeekerAccountService} from "../../../../../services/jobSeekerAccountService";
import {useAuth} from "../../../../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {ProgressPercentPerPage} from "../../../SharedComponents/ProgressPercentPerPage";

interface ResumePhoneComponentProps {}

const ResumePhoneComponent: FC<ResumePhoneComponentProps> = () => {
    const [savingInfo, setSavingInfo] = useState(false);
    const {setProgressPercentage, setSaveFunc } = useResumeBuild();
    const jobSeekerService = new  JobSeekerAccountService();
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const {authUser} = useAuth();
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState(jobSeeker!.phoneNumber);
    const phoneNumberRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        setProgressPercentage(ProgressPercentPerPage * 2);
    }, []);

    useEffect(() => {
        setSaveFunc(() => customSaveFunc)
    }, [phoneNumber]);

    async function customSaveFunc(){
        await updateJobSeekerInfo("/my-profile")
    }
    
    async function updatePhoneNumber(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        await updateJobSeekerInfo("/build/address")
    }
    
    async function updateJobSeekerInfo(resultPageURI : string){
        try {
            setSavingInfo(true);
            const updatedJobSeeker = createUpdateJobSeekerDTO(jobSeeker!.firstName,
                jobSeeker!.lastName, phoneNumber, jobSeeker!.address);
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
            {savingInfo && <div className={"saving-in-progress-surface"}></div>}
            <div className={"build-page-header"}>
                Would you like to add a phone number to your resume?
            </div>
            <div className={"phone-page-disclaimer"}>
                Only provided to employers you apply or respond to
            </div>
            <CustomInputField fieldLabel={"Phone number"}
                              isRequired={false}
                              inputFieldValue={phoneNumber}
                              setInputFieldValue={setPhoneNumber}
                              inputRef={phoneNumberRef}/>
            <div className={"phone-page-disclaimer"}>
                By submitting the form with this box checked, you confirm that you are the primary user and subscriber to the telephone number provided, and you agree to receive calls (including using artificial or pre-recorded voice), texts, and WhatsApp messages from employers who use HelperJobby at the telephone number provided above.
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

export default ResumePhoneComponent;
