import React, {FC, useState} from 'react';
import './InterviewComponent.scss';
import {InterviewDTO} from "../../../../../DTOs/userJobInteractionsDTOs/InterviewDTO";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding, faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import DialogWindow from "../../../../../Components/DialogWindow/DialogWindow";
import {logErrorInfo} from "../../../../../utils/logErrorInfo";
import {InterviewService} from "../../../../../services/interviewService";
import {useNavigate} from "react-router-dom";
import {useJobSeekerJobInteractions} from "../../../../../hooks/contextHooks/useJobSeekerJobInteractions";

interface InterviewComponentProps {
    interview: InterviewDTO
}

const InterviewComponent: FC<InterviewComponentProps> = ({interview}) => {
    const [appointmentInfoText, setAppointmentInfoText] = useState("Show appointment info");
    const [showAppointmentInfo, setShowAppointmentInfo] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const dialogTitle = "Confirm Interview Cancellation";
    const dialogMainText = "Are you sure you want to cancel this interview? Please be aware that this action cannot be undone. If you need to reschedule, consider contacting the interviewer directly instead of cancelling.";
    const firstDialogButtonText = "Keep Interview";
    const secondDialogButtonText = "Cancel Interview";
    const {setInterviews} = useJobSeekerJobInteractions();
    const [requestInProcess, setRequestInProcess] = useState(false);
    const interviewService = new InterviewService();
    const navigate = useNavigate();

    function navigateToJobPage() {
        navigate(`/viewjob/${interview.job.id}`);
    }

    const formatTimeRange = (start: string, end: string): string => {
        const dateOptions: Intl.DateTimeFormatOptions = {day: 'numeric', month: 'long'};
        const timeOptions: Intl.DateTimeFormatOptions = {hour: 'numeric', minute: 'numeric', hour12: true};

        const startDate = new Date(start);
        const endDate = new Date(start);
        const endTimeParts = end.split(':');

        if (endTimeParts.length === 2) {
            endDate.setHours(parseInt(endTimeParts[0]), parseInt(endTimeParts[1]));
        }

        const dateFormatted = new Intl.DateTimeFormat('en-US', dateOptions).format(startDate);
        const startTimeFormatted = new Intl.DateTimeFormat('en-US', timeOptions).format(startDate);
        const endTimeFormatted = new Intl.DateTimeFormat('en-US', timeOptions).format(endDate);

        return `${dateFormatted}, from ${startTimeFormatted} to ${endTimeFormatted}.`;
    };

    function toggleShowAppointmentInfo() {
        if (showAppointmentInfo) {
            setAppointmentInfoText("Show appointment info");
            setShowAppointmentInfo(false);
        } else {
            setAppointmentInfoText("Hide appointment info");
            setShowAppointmentInfo(true);
        }
    }

    function showCancelInterviewDialog() {
        setShowDialog(true);
    }

    async function cancelInterview() {
        try {
            if (requestInProcess) {
                return;
            }
            setRequestInProcess(true);
            await interviewService.jobSeekerCancelInterview(interview.jobId);
            setInterviews((prevInterviews) => prevInterviews!
                .filter(i => i.jobId !== interview.jobId));
        } catch (error) {
            logErrorInfo(error)
        } finally {
            setRequestInProcess(false);
        }
    }


    return (
        <>
            <DialogWindow
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                titleText={dialogTitle}
                mainText={dialogMainText}
                firstButtonText={firstDialogButtonText}
                secondButtonText={secondDialogButtonText}
                positiveDialog={false}
                secondButtonOnClick={cancelInterview}
                requestInProgress={requestInProcess}
            />
            <div className={"ji-job-block"}>
                <div className={"ji-job-layout"}>
                    <div className={"ji-job-fb"}>
                        <div className={"ji-job-icon-box"}>
                            <FontAwesomeIcon icon={faBuilding}/>
                        </div>

                        <div className={"ji-interview-info-fb"}>
                            <div className={"ji-job-info-box"} onClick={navigateToJobPage}>
                                <span className={"ji-job-title"}>{interview.job.jobTitle}</span>
                                <span
                                    className={"semi-dark-default-text"}
                                >{interview.job.employer.organization.name}</span>
                                <span className={"semi-dark-default-text"}>{interview.job.location}</span>
                                <div>
                                    <span className={"semi-dark-default-text"}>Interview format:&nbsp;</span>
                                    <span
                                        className={"semi-dark-default-text bold-text"}>{interview.interviewType}</span>
                                </div>
                                <div>
                                    <span className={"grey-small-text"}>Interview scheduled for&nbsp;</span>
                                    <span
                                        className={"grey-small-text bold-text"}
                                    >{formatTimeRange(interview.interviewStart, interview.interviewEnd)}</span>
                                </div>
                            </div>
                            <div className={"small-margin-bottom small-margin-top"}></div>
                            <div className={"bold-navigation-link"} onClick={toggleShowAppointmentInfo}>
                                <span className={"icon-right-margin"}>{appointmentInfoText}</span>
                                {!showAppointmentInfo ? <FontAwesomeIcon className={"svg1rem"} icon={faChevronDown}/> :
                                    <FontAwesomeIcon className={"svg1rem"} icon={faChevronUp}/>}
                            </div>
                            {showAppointmentInfo && <div className={"appointment-info"}>
                                <div className={"small-margin-bottom small-margin-top"}></div>
                                <div>
                                    {interview.interviewType === "Video" &&
                                        <div className={"appointment-info-container"}>
                                            <span
                                                className={"semi-dark-default-text"}>Video conference link:&nbsp;</span>
                                            <a
                                                style={{maxWidth: "100%"}}
                                                href={`${interview.appointmentInfo}`}
                                            >{interview.appointmentInfo}</a>
                                        </div>}
                                    {interview.interviewType === "Phone" &&
                                        <div className={"appointment-info-container"}>
                                            <span
                                                className={"semi-dark-default-text"}>Contact phone number:&nbsp;</span>
                                            <span
                                                className={"semi-dark-default-text bold-text"}>{interview.appointmentInfo}</span>
                                        </div>}
                                    {interview.interviewType === "In-person" &&
                                        <div className={"appointment-info-container"}>
                                            <span className={"semi-dark-default-text"}>Address:&nbsp;</span>
                                            <a
                                                style={{maxWidth: "100%"}}
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(interview.appointmentInfo)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {interview.appointmentInfo}
                                            </a>
                                        </div>}
                                </div>
                            </div>}
                        </div>
                    </div>
                    <div className={"ji-apply-fb"}>
                        <div>
                            <button
                                className={"light-button-with-margin button-without-margin"}
                                onClick={showCancelInterviewDialog}
                            >
                                Cancel interview
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"content-separation-line"}/>
        </>
    )
};

export default InterviewComponent;
