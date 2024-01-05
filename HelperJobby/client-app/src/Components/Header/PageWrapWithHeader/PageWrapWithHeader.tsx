import React, {FC, ReactNode} from 'react';
import "./PageWrapWithHeader.scss";
import HomePageHeaderLeftSide from "../HomePageHeaderLeftSide/HomePageHeaderLeftSide";
import AuthUserHomePageHeader from "../AuthUserHomePageHeader/AuthUserHomePageHeader";
import PublicHomePageHeader from "../PublicHomePageHeader/PublicHomePageHeader";
import {useAuth} from "../../../hooks/useAuth";

interface HomePageHeaderProps {
    children : ReactNode;
}

const PageWrapWithHeader: FC<HomePageHeaderProps> = (props) => {
    const {authUser} = useAuth();
    
    return (
        <div className={"page-layout"}>
            <div className={"header-container"}>
                <nav className={"header-block"}>
                    <HomePageHeaderLeftSide></HomePageHeaderLeftSide>
                    <div className={"header-right-side"}>
                        {authUser ? (<AuthUserHomePageHeader/>) : (<PublicHomePageHeader/>)}
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
            {props.children}
        </div>
    )
}

export default PageWrapWithHeader;