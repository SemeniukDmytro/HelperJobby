import React, {FC, ReactNode} from 'react';
import './PreviewPagesHeader.scss';
import PageWrapWithHeader from "../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";
import NavigateBackHeader from "../../../../Components/NavigateBackHeader/NavigateBackHeader";
import {useNavigate} from "react-router-dom";

interface PreviewPagesHeaderProps {
    children : ReactNode
}

const PreviewPagesHeader: FC<PreviewPagesHeaderProps> = ({children}) => {
    const navigate = useNavigate();
    
    function navigateToResumePreviewPage() {
        navigate("/build/preview")   
    }
    
    return (
        <PageWrapWithHeader>
            <div className={"page-with-centered-content-layout"}>
                <NavigateBackHeader onBackButtonClick={navigateToResumePreviewPage}/>
                {children}
            </div>
        </PageWrapWithHeader>
    )
}

export default PreviewPagesHeader;
