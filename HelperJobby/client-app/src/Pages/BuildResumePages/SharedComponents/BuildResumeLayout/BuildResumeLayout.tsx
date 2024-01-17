import React, { FC, useEffect, useState } from 'react';
import './BuildResumeLayout.scss';
import {Outlet, useNavigate} from 'react-router-dom';
import { useJobSeeker } from '../../../../hooks/useJobSeeker';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";
import PageWrapWithHeader from "../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";
import useResumeBuild from "../../../../hooks/useResumeBuild";
import DialogWindow from "../../../../Components/DialogWindow/DialogWindow";

interface BuildResumeLayoutProps {}

const BuildResumeLayout: FC<BuildResumeLayoutProps> = () => {
    const {progressPercentage, saveFunc} = useResumeBuild();
    const navigate = useNavigate();
    

    function goBack() {
        navigate(-1)
    }

    async function saveInfo() {
        await saveFunc();
    }

    return (
         <>
             <DialogWindow></DialogWindow>
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
                 <div className={"resume-info-container"}>
                     <Outlet/>
                 </div>
             </PageWrapWithHeader>
         </>
    )
};

export default BuildResumeLayout;