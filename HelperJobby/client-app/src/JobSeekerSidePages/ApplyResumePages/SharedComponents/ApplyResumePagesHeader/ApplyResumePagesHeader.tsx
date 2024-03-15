import React, {FC, ReactNode, useState} from 'react';
import './ApplyResumePagesHeader.scss';
import {faArrowLeftLong, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import DialogWindow from "../../../../Components/DialogWindow/DialogWindow";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useCurrentJobApplication from "../../../../hooks/contextHooks/useCurrentJobApplication";
import {useJobSeeker} from "../../../../hooks/contextHooks/useJobSeeker";

interface ApplyResumePagesHeaderProps {
    children: ReactNode;
}

const ApplyResumePagesHeader: FC<ApplyResumePagesHeaderProps> = ({children}) => {
    const {job} = useCurrentJobApplication();
    const {jobSeeker} = useJobSeeker();
    const [showDialogWindow, setShowDialogWindow] = useState(false);
    const navigate = useNavigate();
    const dialogTitle = "Are you sure you want to exit?";
    const dialogMainText = "We found an error on this page. You might be missing required information. Please review, or exit without saving.";
    const firstDialogButtonText = "Exit without saving";
    const secondDialogButtonText = "Return to page";
    const isPositiveDialog = true;

    function onBackButtonClick() {
        if ((!jobSeeker?.resume || jobSeeker.resume.educations.length === 0) && job){
            navigate(`/job-apply/${job.id}/resume`)
        }
        else {
            navigate(-1);
        }
    }

    function goBackToJobApply() {
        if (job) {
            navigate(`/job-apply/${job.id}/resume`)
        } else {
            navigate("/my-profile");
        }
    }

    return (
        <>
            <DialogWindow
                showDialog={showDialogWindow}
                setShowDialog={setShowDialogWindow}
                firstButtonOnClick={goBackToJobApply}
                titleText={dialogTitle}
                mainText={dialogMainText}
                firstButtonText={firstDialogButtonText}
                secondButtonText={secondDialogButtonText}
                positiveDialog={isPositiveDialog}
                requestInProgress={false}
            />
            <div className={"applying-resume-sticky-header"}>
                <button className={"back-button"} onClick={onBackButtonClick}>
                    <FontAwesomeIcon className={"svg125rem"} icon={faArrowLeftLong}/>
                </button>
                <button className={"small-interaction-button"} onClick={() => setShowDialogWindow(true)}>
                    <FontAwesomeIcon className={"svg125rem"} icon={faXmark}/>
                </button>
            </div>
            <div className={"page-with-centered-content-layout"}>
                {children}
            </div>
        </>
    )
}

export default ApplyResumePagesHeader;
