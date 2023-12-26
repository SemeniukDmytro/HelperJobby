import React, { FC } from 'react';
import "./HomePageHeaderLeftSide.scss";

interface HomePageHeaderLeftSideProps {}

const HomePageHeaderLeftSide: FC<HomePageHeaderLeftSideProps> = () => {
    return (
        <div className={"header-left-side"}>
            <div className={"logo-block"}>
                <button className={"logo-button"}>
                    <span className={"logo-text"}>HelperJobby</span>
                </button>
            </div>
            <div className={"logo-content-divider"}/>
            <div className={"home-link-block"}>
                <a className={"home-link"}>
                    Home
                </a>
                <div className={"underline"}></div>
            </div>

        </div>
    )
};

export default HomePageHeaderLeftSide;
