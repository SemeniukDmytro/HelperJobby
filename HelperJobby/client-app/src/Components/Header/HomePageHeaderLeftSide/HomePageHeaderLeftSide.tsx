import React, { FC } from 'react';
import "./HomePageHeaderLeftSide.scss";
import {useNavigate} from "react-router-dom";

interface HomePageHeaderLeftSideProps {}

const HomePageHeaderLeftSide: FC<HomePageHeaderLeftSideProps> = () => {
    
    const navigate = useNavigate();
    function navigateToHomePage() {
        navigate("/");
    }

    return (
        <div className={"header-left-side"}>
            <div className={"logo-block"}>
                <button className={"logo-button"}>
                   HelperJobby
                </button>
            </div>
            <div className={"logo-content-divider"}/>
            <div className={"home-link-block"}>
                <a className={"home-link"} onClick={navigateToHomePage}>
                    Home
                </a>
                <div className={"underline"}></div>
            </div>

        </div>
    )
};

export default HomePageHeaderLeftSide;
