import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './AddOrganizationUserDialog.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import WhiteLoadingSpinner from "../../../../Components/WhiteLoadingSpinner/WhiteLoadingSpinner";
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import {OrganizationService} from "../../../../services/organizationService";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {IsValidEmail} from "../../../../utils/validationLogic/authFormValidators";
import {useEmployer} from "../../../../hooks/contextHooks/useEmployer";

interface AddOrganizationUserDialogProps {
    showDialog : boolean;
    setShowDialog : Dispatch<SetStateAction<boolean>>
}

const AddOrganizationUserDialog: FC<AddOrganizationUserDialogProps> = ({
    showDialog,
    setShowDialog
                                                                       }) => {
    const [requestInProgress, setRequestInProgress] = useState(false);
    const {employer, setEmployer} = useEmployer();
    const organizationService = new OrganizationService();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    
    
    async function addNewEmployee(){
        if (!IsValidEmail(email)){
            setEmailError("Invalid email address provided")
            return;
        }
        try {
            setRequestInProgress(true);
            const retrievedEmail = await organizationService.addEmployeeEmail(employer!.organizationId, {email});
            setEmployer(prev => {
                return prev && {
                    ...prev,
                    organization : {
                        ...prev.organization,
                        employeeEmails : [...prev.organization.employeeEmails, retrievedEmail]
                    }
                }
            });
            setShowDialog(false);
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
            setRequestInProgress(false);
        }
    }
    
    useEffect(() => {
        if (showDialog) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = "";
            document.body.style.paddingRight = '';
        }
    }, [showDialog]);

    function closeDialog() {
        setShowDialog(false);
    }

    return (
        !showDialog ? null :
            <div className={"dialog-window"}>
                <div className={"dialog-content-container"}>
                    <div className={"dialog-header-box"}>
                        <span className={"bold-text"}>Add users</span>
                        <button className={"small-interaction-button"} onClick={closeDialog}>
                            <FontAwesomeIcon className={"svg1rem"} icon={faXmark}/>
                        </button>
                    </div>
                    <div className={"dialog-separation-line"}></div>
                    <div className={"dialog-main-content"}>
                        <CustomInputField
                            fieldLabel={"Email address"}
                            isRequired={true}
                            inputFieldValue={email}
                            setInputFieldValue={setEmail}
                            customErrorMessage={emailError}
                            setCustomErrorMessage={setEmailError}
                        />
                    </div>
                    <div className={"dialog-separation-line"}></div>
                    <div className={"dialog-buttons"}>
                        <button
                            className={"light-button-with-margin"}
                            onClick={closeDialog}
                        >
                            Cancel
                        </button>
                        <button
                            className={"blue-button"}
                            onClick={addNewEmployee}
                        >
                            {requestInProgress ? <WhiteLoadingSpinner/> : 
                                <span>Save</span>
                            }
                        </button>
                    </div>
                </div>
                <div className={"background-overlay"} onClick={closeDialog}>

                </div>
            </div>
    )
}
export default AddOrganizationUserDialog;
