import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark as solidBookmark, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {faBookmark as regularBookmark} from "@fortawesome/free-regular-svg-icons";
import "./ShortJobDescriptionBlock.scss";
import JobFeatureBox from "../JobFeatureBox/JobFeatureBox";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../../hooks/useAuth";
import {JobSeekerAccountService} from "../../../../services/jobSeekerAccountService";
import {descriptionSplitter} from "../../../../utils/descriptionSplitter";
import {ServerError} from "../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import NotifyPopupWindow from "../../../../Components/NotifyPopupWindow/NotifyPopupWindow";
import {thousandsDisplayHelper} from "../../../../utils/thousandsDisplayHelper";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {useJobSeeker} from "../../../../hooks/useJobSeeker";
import {jobTypesEnumToStringMap, schedulesEnumToStringMap} from "../../../../utils/convertLogic/enumToStringConverter";

interface ShortJobDescriptionBlockProps {
    job: JobDTO;
    selectedJob: JobDTO | null;
    setSelectedJob: Dispatch<SetStateAction<JobDTO | null>>;
}

const ShortJobDescriptionBlock: FC<ShortJobDescriptionBlockProps> = (props: ShortJobDescriptionBlockProps) => {
    const {job, selectedJob, setSelectedJob} = props;
    const currentComponentRef = useRef<HTMLDivElement | null>(null);

    const {authUser} = useAuth();
    const {jobSeeker, setJobSeeker} = useJobSeeker();
    const navigate = useNavigate();

    const [shortDescription, setShortDescription] = useState<string[]>([]);
    const [isNewJob, setIsNewJob] = useState(false);
    const [moreOptionsVisible, setMoreOptionsVisible] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isSuccessfulPopup, setIsSuccessfulPopup] = useState(true);
    const [popUpText, setPopUpText] = useState("");
    const [jobPostDaysDifference, setJobPostDaysDifference] = useState(0);
    const [isJobSaved, setIsJobSaved] = useState(false);
    const [saveJobButtonText, setSaveJobButtonText] = useState("");
    const [isSelected, setIsSelected] = useState(false);

    const jobSeekerService = new JobSeekerAccountService();

    useEffect(() => {
        setShortDescription(descriptionSplitter(job.description));
        checkIsNewJob();

    }, []);

    useEffect(() => {
        if (job.id == selectedJob?.id) {
            setIsSelected(true);
        } else {
            setIsSelected(false)
        }
    }, [selectedJob]);


    useEffect(() => {
        setShortDescription(descriptionSplitter(job.description));
        checkIsNewJob();
        checkIsJobSaved();
    }, [job, jobSeeker?.savedJobs]);


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (currentComponentRef.current && !currentComponentRef.current.contains(event.target as Node)) {
                setMoreOptionsVisible(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [currentComponentRef]);


    function checkIsNewJob(): void {
        const currentDate = new Date();
        const postedDate = new Date(job.datePosted);
        const timeDifference = currentDate.getTime() - postedDate.getTime();
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24)
        setJobPostDaysDifference(Math.floor(daysDifference));
        if (daysDifference < 7) {
            setIsNewJob(true);
        }
    }

    function checkIsJobSaved() {
        if (jobSeeker?.savedJobs) {
            const isSaved = jobSeeker.savedJobs.some(savedJob => savedJob.jobId === props.job.id);
            setIsJobSaved(isSaved);
            if (isSaved) {
                setSaveJobButtonText("Remove from saved");
            } else {
                setSaveJobButtonText("Save job")
            }
        }
    }

    async function saveJob() {
        if (authUser === undefined || authUser === null) {
            navigate('/auth-page')
            return;
        }
        try {
            if (isJobSaved) {
                await jobSeekerService.deleteSavedJob(job.id);
                setSaveJobButtonText("Save job");
                setIsJobSaved(!isJobSaved);
                setJobSeeker(prevJobSeeker => {
                    return prevJobSeeker && {
                        ...prevJobSeeker,
                        savedJobs: prevJobSeeker.savedJobs.filter(savedJob => savedJob.jobId !== job.id)
                    }
                });
            } else {
                const retrievedSavedJob = await jobSeekerService.saveJob(job.id);
                setSaveJobButtonText("Remove job from saved")
                setIsJobSaved(!isJobSaved);
                setIsSuccessfulPopup(true);
                setPopUpText("Job successfully saved!");
                setShowPopup(true);
                setJobSeeker(prevJobSeeker => {
                    return prevJobSeeker && {
                        ...prevJobSeeker,
                        savedJobs: [...prevJobSeeker.savedJobs, retrievedSavedJob]
                    };
                });
            }
        } catch (error) {
            if (error instanceof ServerError) {
                logErrorInfo(error)
            }
        }
    }

    function showMoreOptions() {
        setMoreOptionsVisible(!moreOptionsVisible);
    }


    function handleJobClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const isMoreOptionsClick =
            event.target instanceof Element &&
            (event.target.classList.contains("more-options-box") || event.target.closest(".more-options-button"));
        if (isMoreOptionsClick) {
            return;
        }
        setSelectedJob(job);
    }

    return (
        <div
            ref={currentComponentRef}
            className={`short-job-description-component-box ${isSelected ? "job-selected-border" : ""}`}
            onClick={handleJobClick}
        >
            {showPopup && <NotifyPopupWindow
                isSuccessful={isSuccessfulPopup}
                text={popUpText}
                showNotify={showPopup}
                setShowNotify={setShowPopup}
            />}
            <div className={"more-options-absolute-container"}>
                <button className={"more-options-button"} onClick={showMoreOptions}>
                    <FontAwesomeIcon className={"svg125rem"} icon={faEllipsisVertical}/>
                </button>
                {moreOptionsVisible && <div className={"more-options-bar"}>
                    <div className={"more-options-window-absolute-container"}>
                        <div className={"more-options-window"}>
                            <button className={"first-option"} onClick={saveJob}>
                                {!isJobSaved ? (<FontAwesomeIcon
                                        className={"svg125rem icon-right-margin"}
                                        icon={regularBookmark}
                                    />) :
                                    (<FontAwesomeIcon className={"svg125rem icon-right-margin"} icon={solidBookmark}/>)}
                                <span className={"save-job-text"}>{saveJobButtonText}</span>
                            </button>
                        </div>
                    </div>
                </div>}
            </div>
            <div className={"short-description-content-box"}>
                <div className={"description-content"}>
                    {isNewJob && <div className={"new-job-container"}>
                        <span>New</span>
                    </div>}
                    <a className={"job-title"}>
                        {job.jobTitle}
                    </a>
                    <a className={"medium-description-text"}>
                        {job.employerAccount.organization.name}
                    </a>

                    <div className={"medium-description-text"}>
                        <span>{job.location}</span>
                    </div>

                    <div className={"job-features-info"}>
                        <JobFeatureBox
                            featureName={`$${thousandsDisplayHelper(job.salary)} ${job.salaryRate}`}
                            moreFeaturesAmount={0}
                        />
                        {job.jobType.length != 0 && <JobFeatureBox
                            featureName={`${jobTypesEnumToStringMap(job.jobType[0])}`}
                            moreFeaturesAmount={job.jobType.length - 1}
                        />}
                        {job.schedule.length != 0 && <JobFeatureBox
                            featureName={`${schedulesEnumToStringMap(job.schedule[0])}`}
                            moreFeaturesAmount={job.schedule.length - 1}
                        />}
                    </div>
                    <div className={"short-description-content"}>
                        <ul className={"short-description-list"}>
                            {shortDescription.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    {isNewJob && <div className={"date-posted"}>
                        <span>Posted {jobPostDaysDifference} days ago</span>
                    </div>}
                </div>
            </div>
        </div>
    )
};

export default ShortJobDescriptionBlock;
