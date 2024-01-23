import React, { FC} from 'react';
import './BuildResumeLayout.scss';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";
import PageWrapWithHeader from "../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";
import useResumeBuild from "../../../../hooks/useResumeBuild";
import DialogWindow from "../../../../Components/DialogWindow/DialogWindow";

interface BuildResumeLayoutProps {}

const BuildResumeLayout: FC<BuildResumeLayoutProps> = () => {
    const {progressPercentage, saveFunc, showDialogWindow, setShowDialogWindow} = useResumeBuild();
    const navigate = useNavigate();
    const location = useLocation();
    const dialogTitle = "Are you sure you want to exit?";
    const dialogMainText = "We found an error on this page. You might be missing required information. Please review, or exit without saving.";
    const firstDialogButtonText = "Exit without saving";
    const secondDialogButtonText = "Return to page";
    const isPositiveDialog = true;
    function goBack() {
        navigate(-1)
    }

    async function saveInfo() {
        await saveFunc();
    }
    
    function goBackToProfilePage(){
        navigate("/my-profile")
    }

    const hasSomethingAfterPreview = location.pathname.match(/\/build\/preview\/(.+)/);

    return (
         hasSomethingAfterPreview ? <Outlet/> :
         <>
             <DialogWindow 
                 showDialog={showDialogWindow} 
                 setShowDialog={setShowDialogWindow}
                 firstButtonOnClick={goBackToProfilePage}
                 titleText={dialogTitle}
                 mainText={dialogMainText}
                 firstButtonText={firstDialogButtonText} 
                 secondButtonText={secondDialogButtonText}
                 positiveDialog={isPositiveDialog}
                ></DialogWindow>
             <PageWrapWithHeader>
                 <div className={"build-resume-sticky-panel"}>
                     <nav className={"build-resume-navigation"}>
                         <div className={"back-button"} onClick={goBack}>
                             <FontAwesomeIcon icon={faArrowLeftLong}/>
                         </div>
                         <div className={"bold-navigation-link"}>
                             <a onClick={saveInfo}>
                                 Save and exit
                             </a>
                         </div>
                     </nav>
                     <div className={"progress-bar"}>
                         <div className={"current-progress"} style={{
                            width : `${progressPercentage}%`
                         }}>
                            
                         </div>
                     </div>
                 </div>
                 <div className={"header-with-content-spacing"}></div>
                 <div className={"resume-info-container"}>
                     <Outlet/>
                 </div>
             </PageWrapWithHeader>
         </>
    )
};

export default BuildResumeLayout;