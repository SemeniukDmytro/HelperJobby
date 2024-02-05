import React, {FC, useEffect, useState} from 'react';
import './AccountSettingsComponent.scss';
import PageWrapWithHeader from "../../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";
import SettingsChangeField from "../SettingsFieldtToChange/SettingsFieldToChange";
import {useAuth} from "../../../../../hooks/useAuth";
import {useJobSeeker} from "../../../../../hooks/useJobSeeker";
import LoadingPage from "../../../../../Components/LoadingPage/LoadingPage";
import {removeAuthToken} from "../../../../../utils/authTokenInteraction";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import AuthService from "../../../../../services/authService";
import {useSearchParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import {ChangedInfoTypes} from "../../../../../enums/utilityEnums/ChangedInfoTypes";

interface AccountSettingsComponentProps {
}

const AccountSettingsComponent: FC<AccountSettingsComponentProps> = () => {
    const {authUser, setAuthUser} = useAuth();
    const {jobSeeker, fetchJobSeeker} = useJobSeeker();
    const [loading, setLoading] = useState(true);
    const authService = new AuthService();
    const [changedInfoMsg, setChangedInfoMsg] = useState("");
    const [searchParams] = useSearchParams();
    const [showChangeInfoMsg, setShowChangeInfoMsg] = useState(false);

    useEffect(() => {
        fetchJobSeeker();
        setInformationAboutChange();
    }, []);

    useEffect(() => {
        if (jobSeeker) {
            setLoading(false);
        }
    }, [jobSeeker]);

    async function signOut() {
        try {
            setLoading(true);
            await authService.revokeToken();
            removeAuthToken();
            setAuthUser(null);
        } catch (error) {
            logErrorInfo(error)
        } finally {
            setLoading(false);
        }
    }

    function setInformationAboutChange() {
        const changedInfoType = searchParams.get("msg");
        if (!changedInfoType) {
            return;
        }
        switch (changedInfoType) {
            case ChangedInfoTypes.changedusertype :
                setChangedInfoMsg("Your account type has been saved.");
                break;
            case ChangedInfoTypes.changedpemail :
                setChangedInfoMsg("Your email has been saved.");
                break;
            case ChangedInfoTypes.changedpassword :
                setChangedInfoMsg("Your password has been saved.");
                break;
            case ChangedInfoTypes.changedphone :
                setChangedInfoMsg("Your phone has been saved.");
                break;
            case ChangedInfoTypes.nothingchanged :
                setChangedInfoMsg("No changes were made to your account.");
                break;
            default :
                return;
        }
        setShowChangeInfoMsg(true);
    }

    return (
        <PageWrapWithHeader>
            <div className={"page-with-centered-content-layout"}>
                {loading ? <LoadingPage/> :
                    <div className={"form-layout"}>
                        {showChangeInfoMsg &&
                            <>
                                <div className={"content-separation-margin"}></div>
                                <div className={"info-notify-container green-notify-container"}>
                                    <div className={"notify-container-message-fb"}>
                                        <div className={"successful-pop-up-icon"}>
                                            <FontAwesomeIcon icon={faCircleCheck}/>
                                        </div>
                                        <div className={"dark-default-text bold-text"}>
                                            {changedInfoMsg}
                                        </div>
                                    </div>
                                    <button
                                        className={"small-interaction-button"}
                                        onClick={() => setShowChangeInfoMsg(false)}
                                    >
                                        <FontAwesomeIcon className={"svg1rem"} icon={faXmark}/>
                                    </button>
                                </div>
                            </>
                        }
                        <div className={"content-separation-margin"}></div>
                        <div className={"build-page-header"}>Account Settings</div>
                        <div className={"content-separation-line"}></div>
                        <SettingsChangeField
                            fieldLabel={"Account type:"}
                            fieldValue={authUser!.user.accountType}
                            fieldButtonText={"Change account type"}
                            changeFieldPagePath={"/account/change-type"}
                        />
                        <SettingsChangeField
                            fieldLabel={"Email"}
                            fieldValue={authUser!.user.email}
                            fieldButtonText={"Change email"}
                            changeFieldPagePath={"/account/change-email"}
                        />
                        <SettingsChangeField
                            fieldLabel={"Password"}
                            fieldValue={"••••••••"}
                            fieldButtonText={"Change password"}
                            changeFieldPagePath={"/account/change-password"}
                        />
                        <SettingsChangeField
                            fieldLabel={"Phone number"}
                            fieldValue={jobSeeker!.phoneNumber}
                            fieldButtonText={"Change phone number"}
                            changeFieldPagePath={"/account/change-phone"}
                        />
                        <div className={"content-separation-margin"}/>
                        <div className={"settings-field-layout"}>
                            <div className={"semi-dark-default-text"}>
                                {authUser?.user.email}
                            </div>
                            <button className={"light-button-with-margin button-without-margin"} onClick={signOut}>
                                Sign out
                            </button>
                        </div>
                        <div className={"content-separation-line"}></div>
                    </div>}
            </div>
        </PageWrapWithHeader>
    )
};

export default AccountSettingsComponent;
