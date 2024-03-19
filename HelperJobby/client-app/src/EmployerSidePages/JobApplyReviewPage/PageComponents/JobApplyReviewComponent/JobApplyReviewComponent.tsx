import React, {FC, useEffect, useState} from 'react';
import './JobApplyReviewComponent.scss';
import {JobApplyDTO} from "../../../../DTOs/userJobInteractionsDTOs/JobApplyDTO";
import {useNavigate, useParams} from "react-router-dom";
import {JobApplyService} from "../../../../services/jobApplyService";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {isNanAfterIntParse} from "../../../../utils/validationLogic/numbersValidators";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import EmployerPagesPaths from "../../../../AppRoutes/Paths/EmployerPagesPaths";
import JobApplyStatusButtons from "../../../../EmployersSideComponents/JobApplyStatusButtons/JobApplyStatusButtons";
import CustomInputField from "../../../../Components/EditFormField/CustomInputField";
import CustomSelectWindow from "../../../../EmployersSideComponents/CustomSelectWindow/CustomSelectWindow";
import {dayTimes} from "../../../../AppConstData/DayTimes";
import {InterviewTypes} from "../../../../enums/modelDataEnums/InterviewTypes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faMessage} from "@fortawesome/free-solid-svg-icons";
import {InterviewService} from "../../../../services/interviewService";
import {CreateInterviewDTO} from "../../../../DTOs/userJobInteractionsDTOs/CreateInterviewDTO";

interface JobApplyReviewComponentProps {
}

const JobApplyReviewComponent: FC<JobApplyReviewComponentProps> = () => {
    const [jobApply, setJobApply] = useState<JobApplyDTO>();
    const {candidateId, jobId} = useParams();
    const jobApplyService = new JobApplyService();
    const [loading, setLoading] = useState(true);
    const [requestInProgress, setRequestInProgress] = useState(false);
    const [interviewDate, setInterviewDate] = useState("");
    const [interviewStartTime, setInterviewStartTime] = useState("");
    const [interviewEndTime, setInterviewEndTime] = useState("");
    const [interviewType, setInterviewType] = useState(InterviewTypes.Video);
    const [interviewMessage, setInterviewMessage] = useState("");
    const navigate = useNavigate();
    const [isInvalidTimeProvided, setIsInvalidTimeProvided] = useState(false);
    const interviewService = new InterviewService();

    useEffect(() => {
        if (!jobId || !candidateId || isNanAfterIntParse(jobId) || isNanAfterIntParse(candidateId)) {
            navigate(EmployerPagesPaths.CANDIDATES);
            return;
        }
        fetchInitialPageData();
    }, []);

    async function fetchInitialPageData() {
        try {
            setLoading(true);
            const retrievedJobApply = await jobApplyService.getJobApplyByJobSeekerIdAndJobId(parseInt(candidateId!), parseInt(jobId!));
            setJobApply(retrievedJobApply);
        } catch (err) {
            logErrorInfo(err)
        } finally {
            setLoading(false)
        }
    }


    async function handleInterviewCreation() {
        if (requestInProgress || !jobApply) {
            return;
        }

        setRequestInProgress(true);
        try {
            const interviewStartDate = new Date(`${interviewDate} ${interviewStartTime}`);
            const interviewEndDate = new Date(`${interviewDate} ${interviewEndTime}`);

            if (!interviewStartTime || !interviewEndTime || isNaN(interviewStartDate.getDate())) {
                setIsInvalidTimeProvided(true);
                return;
            } else {
                setIsInvalidTimeProvided(false);
            }

            if (interviewEndDate <= interviewStartDate) {
                interviewEndDate.setDate(interviewEndDate.getDate() + 1);
            }

            const formattedStartDate: string = formatDate(interviewStartDate);
            const formattedEndTime: string = `${formatTime(interviewEndDate)}.0000000`;
            if (interviewMessage.length > 200) {
                return;
            }
            const interviewDetails: CreateInterviewDTO = {
                interviewStart: formattedStartDate,
                interviewEnd: formattedEndTime,
                interviewType: interviewType,
                appointmentInfo: interviewMessage,
            };

            await interviewService.createInterview(jobApply!.jobId, jobApply!.jobSeekerId, interviewDetails);
            navigate(EmployerPagesPaths.EMPLOYER_INTERVIEWS);

        } catch (error) {
            logErrorInfo(error)
        } finally {
            setRequestInProgress(false);
        }
    }

    function formatDate(date: Date) {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${formatTime(date)}`;
    }

    function formatTime(date: Date) {
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    }

    function goBackToCandidates() {
        navigate(`${EmployerPagesPaths.CANDIDATES}/?jobId=${jobApply!.jobId}`)
    }

    function navigateToConversationWithCandidate() {
        navigate(`${EmployerPagesPaths.MESSAGES}?jobId=${jobApply!.jobId}&jobSeekerId=${jobApply!.jobSeekerId}`)
    }

    return (
        loading ? <LoadingPage/> :
            !jobApply ? null :
                <div className={"light-grey-page-background"}>
                    <div className={"emp-pages-layout padding-top-remove"}>
                        <div className={"employers-centralized-page-layout"}>
                            <div className={"emp-main-info-container-with-pdng"}>
                                <div className={'job-apply-review-header-container'}>
                                    <div className={"job-review-page-header"}>
                                        <div className={"flex-column"}>
                                            <div className={"job-review-candidate-name"}>
                                                {jobApply?.jobSeeker.firstName} {jobApply?.jobSeeker.lastName}
                                            </div>
                                            <div className={"job-seeker-email"}>
                                                {jobApply?.jobSeeker.user.email}
                                            </div>
                                            <div className={"dark-small-text"}>
                                                Applied to {jobApply?.job.jobTitle} - {jobApply?.job.location}
                                            </div>
                                        </div>
                                        <JobApplyStatusButtons jobApply={jobApply!}
                                                               setJobApply={setJobApply}
                                                               setRequestInProgress={setRequestInProgress}
                                        />
                                    </div>
                                    <div className={'br-corner-button'}>
                                        <button
                                            onClick={navigateToConversationWithCandidate}
                                            className={"blue-button"}>
                                            <FontAwesomeIcon className={"svg1rem icon-right-margin"}
                                                             icon={faMessage}/>
                                            Message
                                        </button>
                                    </div>
                                </div>

                                <div className={"content-separation-line mt1rem mb1rem"}/>
                                <div className={"create-interview-layout"}>
                                    <div className={"small-title"}>
                                        Arrange an interview
                                    </div>
                                    <div className={"interview-time-fb"}>
                                        <CustomInputField fieldLabel={"Date"}
                                                          fieldSubtitle={"In format MM/DD/YYYY"}
                                                          isRequired={false}
                                                          inputFieldValue={interviewDate}
                                                          setInputFieldValue={setInterviewDate}
                                                          maxInputLength={10}
                                        />
                                        <CustomSelectWindow
                                            fieldLabel={"Start time"}
                                            selectedValue={interviewStartTime}
                                            setSelectedValue={setInterviewStartTime}
                                            optionsArr={dayTimes}
                                            includeWindowScroll={true}/>
                                        <div className={"bold-text mt1rem"}>
                                            to
                                        </div>
                                        <CustomSelectWindow
                                            fieldLabel={"End time"}
                                            selectedValue={interviewEndTime}
                                            setSelectedValue={setInterviewEndTime}
                                            optionsArr={dayTimes}
                                            includeWindowScroll={true}/>
                                    </div>
                                    {isInvalidTimeProvided &&
                                        <div className={"error-box mb1rem"}>
                                            <FontAwesomeIcon className={`error-text error-svg`}
                                                             icon={faCircleExclamation}/>
                                            <span className={"error-text"}>Invalid interview time provided</span>
                                        </div>}
                                    <div className={"bold-text mb1rem"}>
                                        Interview type
                                    </div>
                                    <div className={"flex-row mb1rem"}>
                                        <button
                                            onClick={() => setInterviewType(InterviewTypes.Video)}
                                            className={`transparent-button ${interviewType == InterviewTypes.Video ? "selected-light-button" : ""}`}>
                                            Video
                                        </button>
                                        <button
                                            onClick={() => setInterviewType(InterviewTypes.Phone)}
                                            className={`transparent-button ${interviewType == InterviewTypes.Phone ? "selected-light-button" : ""}`}>
                                            Phone
                                        </button>
                                        <button
                                            onClick={() => setInterviewType(InterviewTypes.InPerson)}
                                            className={`transparent-button ${interviewType == InterviewTypes.InPerson ? "selected-light-button" : ""}`}>
                                            In person
                                        </button>
                                    </div>
                                    <CustomInputField
                                        fieldLabel={`Message to ${jobApply.jobSeeker.firstName} ${jobApply.jobSeeker.lastName}`}
                                        isRequired={false}
                                        inputFieldValue={interviewMessage}
                                        setInputFieldValue={setInterviewMessage}
                                        maxInputLength={200}
                                    />
                                    <div className={"flex-row"}>
                                        <button
                                            className={"blue-button mr1rem"} disabled={requestInProgress}
                                            onClick={handleInterviewCreation}
                                        >
                                            Send Invitation
                                        </button>
                                        <button className={"transparent-button"}
                                                onClick={goBackToCandidates}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default JobApplyReviewComponent;
