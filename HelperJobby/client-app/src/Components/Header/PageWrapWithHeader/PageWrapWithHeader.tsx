import React, {FC, ReactNode} from 'react';
import "./PageWrapWithHeader.scss";
import HomePageHeaderLeftSide from "../HomePageHeaderLeftSide/HomePageHeaderLeftSide";
import AuthUserHomePageHeader from "../AuthUserHomePageHeader/AuthUserHomePageHeader";
import PublicHomePageHeader from "../PublicHomePageHeader/PublicHomePageHeader";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../hooks/contextHooks/useAuth";

interface HomePageHeaderProps {
    children: ReactNode;
    onHomeClick?: () => Promise<void>;
}

const PageWrapWithHeader: FC<HomePageHeaderProps> = ({children, onHomeClick}) => {
    const {authUser} = useAuth();
    const navigate = useNavigate();

    function navigateToHelperJobbyEmployers() {
        navigate("/employers/posting")
    }

    return (
        <div className={"page-layout"}>
            <div className={"header-container"}>
                <nav className={"header-block"}>
                    <HomePageHeaderLeftSide onHomeClick={onHomeClick}></HomePageHeaderLeftSide>
                    <div className={"header-right-side"}>
                        {authUser ? (<AuthUserHomePageHeader/>) : (<PublicHomePageHeader/>)}
                        <div className={"right-side-divider"}></div>
                        <div className={"employers-link-block"} onClick={navigateToHelperJobbyEmployers}>
                            <button className={"employers-page-button"}>
                                <span className={"employers-page-text"}>Employers/Post Job</span>
                            </button>
                            <div className={"underline"}></div>
                        </div>
                    </div>
                </nav>
            </div>
            {children}
        </div>
    )
}

export default PageWrapWithHeader;