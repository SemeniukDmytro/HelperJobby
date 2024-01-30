import React, {FC, useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark, faFileLines, faGear, faMessage, faUser} from "@fortawesome/free-solid-svg-icons";
import "./AuthUserHomePageHeader.scss";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth";
import AuthService from "../../../services/authService";
import {removeAuthToken} from "../../../utils/authTokenInteraction";
import {logErrorInfo} from "../../../utils/logErrorInfo";
import {ServerError} from "../../../ErrorDTOs/ServerErrorDTO";

interface AuthUserHomePageHeaderProps {}

const AuthUserHomePageHeader: FC<AuthUserHomePageHeaderProps> = () => {
    const {authUser, setAuthUser} = useAuth();
    const [displayMoreOptions, setDisplayMoreOptions] = useState(false);
    const profileButtonRef = useRef<HTMLButtonElement | null>(null);
    const moreOptionsComponentRef = useRef<HTMLDivElement | null>(null);
    
    const authService = new AuthService();
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileButtonRef.current && !profileButtonRef.current.contains(event.target as Node) &&
            moreOptionsComponentRef.current && !moreOptionsComponentRef.current?.contains(event.target as Node)) {
                setDisplayMoreOptions(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [profileButtonRef]);
    function showProfileOptions() {
        setDisplayMoreOptions(!displayMoreOptions);
    }

    async function signOut() {
        try {
            await authService.revokeToken();
            removeAuthToken();
            window.location.reload();
            setAuthUser(null);
            
        }
        catch (error){
            if (error instanceof ServerError){
                logErrorInfo(error);
            }
        }
    }

    function navigateToJobSeekerProfile() {
        navigate("/my-profile");
    }
    
    function navigateToSettingsPage() {
        navigate("/settings")
    }
    
    function navigateToSavedJobsPage(){
        navigate("/saved")
    }

    return (
        <div className={"nav-buttons-block"}>
            <div className={"nav-button-box"}>
                <button className={"nav-button"}>
                    <FontAwesomeIcon className={"svg125rem"} icon={faMessage} />
                </button>
                <div className={"underline"}></div>
            </div>
            <div className={"nav-button-box"}>
                <button className={"nav-button"} onClick={showProfileOptions} ref={profileButtonRef}>
                    <FontAwesomeIcon className={"svg125rem"} icon={faUser} />
                </button>
                <div className={"underline"}></div>
                {displayMoreOptions && <div className={"profile-more-options-line"}>
                    <div className={"profile-more-options"} ref={moreOptionsComponentRef}>
                        <div className={"user-email-info"}>
                            <span>{authUser?.user.email}</span>
                        </div>
                        <button className={"more-profile-option-button"} onClick={navigateToJobSeekerProfile}>
                            <FontAwesomeIcon className={"icon-box big-icon"} icon={faFileLines}/>
                            <div>Profile</div>
                        </button>
                        <button className={"more-profile-option-button"} onClick={navigateToSavedJobsPage}>
                            <FontAwesomeIcon className={"icon-box big-icon"} icon={faBookmark}/>
                            <div>My jobs</div>
                        </button>
                        <button className={"more-profile-option-button"} onClick={navigateToSettingsPage}>
                            <FontAwesomeIcon className={"icon-box big-icon"} icon={faGear}/>
                            <div>Settings</div>
                        </button>
                        <div className={"more-options-dividing-line"}>
                        </div>
                        <button className={"sign-out-button"} onClick={signOut}>
                            Sign out
                        </button>
                    </div>
                </div>}
            </div>
        </div>)
};

export default AuthUserHomePageHeader;
