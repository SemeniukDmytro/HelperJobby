import React, {FC} from 'react';
import "./HomePageHeaderLeftSide.scss";
import {useNavigate} from "react-router-dom";

interface HomePageHeaderLeftSideProps {
    onHomeClick?: () => Promise<void>;
}

const HomePageHeaderLeftSide: FC<HomePageHeaderLeftSideProps> = ({onHomeClick}) => {

    const navigate = useNavigate();

    function navigateToHomePage() {
        if (window.location.pathname != "/") {
            navigate("/");
        }
    }


    return (
        <div className={"header-left-side"}>
            <div className={"logo-block"}>
                <button className={"logo-button"} onClick={onHomeClick || navigateToHomePage}>
                    HelperJobby
                </button>
            </div>
            <div className={"logo-content-divider"}/>
            <div className={"home-link-block"}>
                <a className={"home-link"} onClick={onHomeClick || navigateToHomePage}>
                    Home
                </a>
                <div className={"underline"}></div>
            </div>

        </div>
    )
};

export default HomePageHeaderLeftSide;
