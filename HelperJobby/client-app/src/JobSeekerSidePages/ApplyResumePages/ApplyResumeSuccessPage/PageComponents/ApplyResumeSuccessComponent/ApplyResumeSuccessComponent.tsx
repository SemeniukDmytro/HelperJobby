import React, {FC} from 'react';
import './ApplyResumeSuccessComponent.scss';
import Resume from "../../../../../Components/Icons/Resume";
import useCurrentJobApplication from "../../../../../hooks/contextHooks/useCurrentJobApplication";
import {useNavigate} from "react-router-dom";

interface ApplyResumeSuccessComponentProps {
}

const ApplyResumeSuccessComponent: FC<ApplyResumeSuccessComponentProps> = () => {
    const {job} = useCurrentJobApplication();
    const navigate = useNavigate();

    function navigateToResumeApplyPage() {
        if (!job) {
            navigate("/my-profile");
        } else {
            navigate(`/job-apply/${job?.id}/resume`);
        }
    }

    function navigateToResumePage() {
        if (!job) {
            navigate("/resume")
        } else {
            navigate(`/resume?from=job-apply&jobId=${job?.id}`);
        }
    }

    return (
        <div className={"page-with-centered-content-layout ai-center"}>
            <div className={"flex-row jc-center"}>
                <Resume/>
            </div>
            <div className={"edit-contact-form-header"}>
                Help employers get to know you better
            </div>
            <div className={"success-resume-sub-header"}>
                You may catch the employer’s attention by adding more details about yourself.
            </div>
            <div className={"success-resume-buttons-container"}>
                <button onClick={navigateToResumePage} className={"blue-button success-resume-button"}>
                    Continue adding details
                </button>
                <button
                    onClick={navigateToResumeApplyPage}
                    className={"light-button-with-margin success-resume-button mr0"}>
                    Apply with this resume
                </button>
            </div>
        </div>
    )
}

export default ApplyResumeSuccessComponent;
