import React, { FC } from 'react';
import "./HomePageHeader.scss";

interface HomePageHeaderProps {}

const HomePageHeader: FC<HomePageHeaderProps> = () => {
    
    return (
        <div className={"header-container"}>
            <div className={"header-block"}>
                <div className={"header-left-side"}>
                    <div className={"logo-block"}>
                        <button className={"logo-button"}>
                            <span className={"logo-text"}>HelperJobby</span>
                        </button>
                    </div>
                    <div className={"logo-content-divider"}/>
                    <a className={"home-link-block"}>
                        Home
                    </a>
                </div>
                <div className={"header-right-side"}>
                    <div className={"sign-in-block"}>
                        <button className={"sign-in-button"}>
                            <span className={"sign-in-text"}>Sign in</span>
                        </button>
                    </div>
                    <div className={"right-side-divider"}></div>
                    <div className={"employers-link-block"}>
                        <button className={"employers-page-button"}>
                            <span className={"employers-page-text"}>Employers/Post Job</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePageHeader;
