import React, { FC } from 'react';
import "./PublicHomePageHeader.scss";
import HomePageHeaderLeftSide from "../HomePageHeaderLeftSide/HomePageHeaderLeftSide";
import {useNavigate} from "react-router-dom";

interface HomePageHeaderProps {}

const PublicHomePageHeader: FC<HomePageHeaderProps> = () => {
    const navigate = useNavigate();
    
    function navigateToAuthPage(){
        navigate("/auth-page")
    }
    
    return (
        <div className={"header-container"}>
            <nav className={"header-block"}>
                <HomePageHeaderLeftSide></HomePageHeaderLeftSide>
                <div className={"header-right-side"}>
                    <div className={"sign-in-block"} onClick={navigateToAuthPage}>
                        <button className={"sign-in-button"}>
                            <span className={"sign-in-text"}>Sign in</span>
                        </button>
                        <div className={"underline"}></div>
                    </div>
                    <div className={"right-side-divider"}></div>
                    <div className={"employers-link-block"}>
                        <button className={"employers-page-button"}>
                            <span className={"employers-page-text"}>Employers/Post Job</span>
                        </button>
                        <div className={"underline"}></div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default PublicHomePageHeader;