import React, {FC, ReactNode, useEffect, useState} from 'react';
import './ResumeInfoPagesHeader.scss';
import NavigateBackHeader from "../../../../Components/NavigateBackHeader/NavigateBackHeader";
import {useNavigate} from "react-router-dom";

interface PreviewPagesHeaderProps {
    children: ReactNode
}

const ResumeInfoPagesHeader: FC<PreviewPagesHeaderProps> = ({children}) => {
    const navigate = useNavigate();
    const [previousPagePath, setPreviousPagePath] = useState("");

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath.includes("/preview")) {
            setPreviousPagePath("/build/preview")
        } else if (currentPath.includes("/resume")) {
            setPreviousPagePath("/resume")
        }
    }, []);

    function navigateToParentPage() {
        navigate(previousPagePath)
    }

    return (
        <div className={"page-with-centered-content-layout"}>
            <NavigateBackHeader onBackButtonClick={navigateToParentPage}/>
            <div className={"form-layout"}>
                {children}
            </div>
        </div>
    )
}

export default ResumeInfoPagesHeader;
