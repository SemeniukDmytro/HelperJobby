import React, {FC, useEffect, useState} from 'react';
import './ChangePhoneComponent.scss';
import ChangeAccountInfoForm from "../../../SharedComponents/ChangeAccountInfoForm/ChangeAccountInfoForm";
import {validatePhoneNumber} from "../../../../../utils/validationLogic/authFormValidators";
import CustomInputField from "../../../../../Components/EditFormField/CustomInputField";
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {UpdateJobSeekerDTO} from "../../../../../DTOs/accountDTOs/UpdateJobSeekerDTO";
import {JobSeekerService} from "../../../../../services/jobSeekerService";
import {useNavigate} from "react-router-dom";
import {ChangedInfoTypes} from "../../../../../enums/utilityEnums/ChangedInfoTypes";

interface ChangePhoneComponentProps {
}

const ChangePhoneComponent: FC<ChangePhoneComponentProps> = () => {
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const {jobSeeker, setJobSeeker, fetchJobSeeker} = useJobSeeker();
    const [loading, setLoading] = useState(true);
    const jobSeekerService = new JobSeekerService();
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobSeeker();
    }, []);

    useEffect(() => {
        if (jobSeeker) {
            setLoading(false);
        }
    }, [jobSeeker]);

    async function changePhoneNumber() {
        const validationMessage = validatePhoneNumber(phone);
        if (validationMessage) {
            setPhoneError(validationMessage);
            return;
        }
        try {
            const updatedJobSeeker: UpdateJobSeekerDTO = {
                phoneNumber: phone,
                firstName: jobSeeker!.firstName,
                lastName: jobSeeker!.lastName,
                address: jobSeeker!.address
            }
            const retrievedJobSeeker = await jobSeekerService.putJobSeekerAccount(jobSeeker!.userId, updatedJobSeeker);
            setJobSeeker((prev) => {
                return prev ? {
                    ...prev,
                    phoneNumber: retrievedJobSeeker.phoneNumber
                } : null;
            });
            navigate(`/settings?msg=${ChangedInfoTypes.changedphone}`)
        } catch (err) {
            logErrorInfo(err)
        }
    }

    function backToSettingsPage() {
        navigate(`/settings?msg=${ChangedInfoTypes.nothingchanged}`)
    }

    return (
        <ChangeAccountInfoForm>
            {loading ? <LoadingPage/> :
                <>
                    <div className={"passpage-form-title-box"}>
                        <span className={"form-title"}>Add your phone number </span>
                    </div>
                    <div className={"content-separation-margin"}>
                    </div>
                    <CustomInputField
                        fieldLabel={"Phone number"}
                        isRequired={false}
                        inputFieldValue={phone}
                        setInputFieldValue={setPhone}
                        fieldSubtitle={"Include country code (start with +). Phone number must contain only numbers without spaces or dashes"}
                        customErrorMessage={phoneError}
                        setCustomErrorMessage={setPhoneError}
                    />
                    <div className={"passpage-button-container"}>
                        <button className={"blue-button"} onClick={changePhoneNumber}>
                            Save phone number
                        </button>
                        <button className={"transparent-button margin-left1rem"} onClick={backToSettingsPage}>
                            Cancel
                        </button>
                    </div>
                </>}
        </ChangeAccountInfoForm>
    );
}

export default ChangePhoneComponent;
