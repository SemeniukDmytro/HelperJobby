import React, {FC, useState} from 'react';
import './ChangeAccountTypeComponent.scss';
import ChangeAccountInfoForm from "../../../SharedComponents/ChangeAccountInfoForm/ChangeAccountInfoForm";
import {useAuth} from "../../../../../hooks/useAuth";
import {UserService} from "../../../../../services/userService";
import {useNavigate} from "react-router-dom";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import {CreateUpdateUserDTO} from "../../../../../DTOs/userRelatedDTOs/CreateUpdateUserDTO";
import {ChangedInfoTypes} from "../../../../../enums/ChangedInfoTypes";

interface ChangeAccountTypeComponentProps {}

const ChangeAccountTypeComponent: FC<ChangeAccountTypeComponentProps> = () => {
    const {authUser, setAuthUser} = useAuth(); 
    const [currentAccountType, setCurrentAccountType] = useState(authUser!.user.accountType);
    const userService = new UserService();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    function setJobSeekerAccountType() {
        setCurrentAccountType("Job seeker")    
    }

    function setEmployerAccountType() {
        setCurrentAccountType("Employer")
    }
    async function changeAccountType() {
        try {
            if (loading){
                return;
            }
            setLoading(true);
            const updatedUserInfo : CreateUpdateUserDTO = {
                email : "",
                password : "",
                accountType : currentAccountType
            }
            const updatedUser = await userService.updateUser(authUser!.user.id ,updatedUserInfo);
            setAuthUser((prev) => {
                return prev ? 
                    {...prev,
                        user : {...prev.user,
                               accountType : updatedUser.accountType}
                    } : null
            })
        }
        catch (err){
            logErrorInfo(err)
        }
        finally {
            setLoading(false);
            navigate(`/settings?msg=${ChangedInfoTypes.changedusertype}`)
        }
    }

    function backToSettingsPage() {
        navigate(`/settings?msg=${ChangedInfoTypes.nothingchanged}`)
    }

    return (
        <ChangeAccountInfoForm>
            <div className={"passpage-form-title-box"}>
                <span className={"form-title"}>Change account Type</span>
            </div>
            <div className={"content-separation-margin"}></div>
            <div className={"radio-input-option-box"} style={{marginBottom: "1rem"}}>
                <div className={"radio-input-info"} onClick={setJobSeekerAccountType}>
                    <input type={"radio"}
                           className={"custom-radio-input"}
                           checked={currentAccountType == "Job seeker"}
                           onChange={setJobSeekerAccountType}>
                    </input>
                    <span className={"semi-dark-default-text"}>
                        Job seeker (looking for a job)
                    </span>
                </div>
            </div>
            <div className={"radio-input-option-box"}>
                <div className={"radio-input-info"} onClick={setEmployerAccountType}>
                    <input type={"radio"}
                           className={"custom-radio-input"}
                           checked={currentAccountType == "Employer"}
                           onChange={setEmployerAccountType}>
                    </input>
                    <span className={"semi-dark-default-text"}>
                        Employer (hiring, sourcing candidates, or advertising jobs)
                    </span>
                </div>
            </div>
            <div className={"content-separation-margin"}/>
            <div className={"passpage-button-container"}>
                <button className={"blue-button"} onClick={changeAccountType}>
                    Save
                </button>
                <button className={"transparent-button margin-left1rem"} onClick={backToSettingsPage}>
                    Cancel
                </button>
            </div>
        </ChangeAccountInfoForm>
    );
}

export default ChangeAccountTypeComponent;
