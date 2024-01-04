import React, { FC } from 'react';
import {useNavigate} from "react-router-dom";
import "./PublicHomePageHeader.scss";

interface PublicHomePageHeaderProps {}

const PublicHomePageHeader: FC<PublicHomePageHeaderProps> = () => {
    const navigate = useNavigate();

    function navigateToAuthPage(){
        navigate("/auth-page")
    }
    
    return (
        <div className={"sign-in-block"} onClick={navigateToAuthPage}>
            <button className={"sign-in-button"}>
                <span className={"sign-in-text"}>Sign in</span>
            </button>
            <div className={"underline"}></div>
        </div>
    )
}

export default PublicHomePageHeader;
