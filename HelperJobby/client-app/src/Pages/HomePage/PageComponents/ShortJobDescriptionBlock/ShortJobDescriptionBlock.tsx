import React, {FC, useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {faBookmark as regularBookmark} from "@fortawesome/free-regular-svg-icons";
import {faBookmark as solidBookmark} from "@fortawesome/free-solid-svg-icons"
import "./ShortJobDescriptionBlock.scss";
import JobFeatureBox from "../JobFeatureBox/JobFeatureBox";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../../hooks/useAuth";
import {useHomePage} from "../../../../hooks/useHomePage";
import {JobSeekerAccountService} from "../../../../services/jobSeekerAccountService";
import {descriptionSplitter} from "../../../../utils/descriptionSplitter";
import {ServerError} from "../../../../ErrorDTOs/ServerErrorDTO";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import NotifyPopupWindow from "../../../../Components/NotifyPopupWindow/NotifyPopupWindow";
import {thousandsDisplayHelper} from "../../../../utils/thousandsDisplayHelper";
import {jobTypesConverter, schedulesEnumConverter} from "../../../../utils/enumToStringConverter";
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";

interface ShortJobDescriptionBlockProps {
    job : JobDTO;
}

const ShortJobDescriptionBlock: FC<ShortJobDescriptionBlockProps> = (props : ShortJobDescriptionBlockProps) => {
    const {job} = props;
    const currentComponentRef = useRef<HTMLDivElement | null>(null);

    const {authUser} = useAuth();
    const {userSavedJobs, setUserSavedJobs, selectedJob, setSelectedJob} = useHomePage();
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
        if (job.id == selectedJob?.id){
            setIsSelected(true);
        }
        else {
            setIsSelected(false)
        }
    }, [selectedJob]);
    

    useEffect(() => {
        setShortDescription(descriptionSplitter(job.description));
        checkIsNewJob();
        checkIsJobSaved();
    }, [job, userSavedJobs]);
    

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

    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showPopup]);
    
    function checkIsNewJob() : void {
        const currentDate = new Date();
        const postedDate = new Date(job.datePosted);
        const timeDifference = currentDate.getTime() - postedDate.getTime();

        setJobPostDaysDifference(Math.floor(timeDifference / (1000 * 60 * 60 * 24)));

        if (jobPostDaysDifference < 7) {
            setIsNewJob(true);
        }
    }

    function checkIsJobSaved() {
        if (userSavedJobs && userSavedJobs) {
            const isSaved = userSavedJobs.some(savedJob => savedJob.id === props.job.id);
            setIsJobSaved(isSaved);
            if (isSaved){
                setSaveJobButtonText("Remove from saved");
            }
            else {
                setSaveJobButtonText("Save job")
            }
        }
    }

    async function saveJob() {
        if (authUser === undefined || authUser === null){
            navigate('/auth-page')
            return;
        }
        try {
            if (isJobSaved){
                await jobSeekerService.deleteSavedJob(job.id);
                setSaveJobButtonText("Save job");
                setIsJobSaved(!isJobSaved);
                setUserSavedJobs((prevSavedJobs) => prevSavedJobs.filter(savedJob => savedJob.id !== job.id));
            }
            else {
                await jobSeekerService.saveJob(job.id);
                setSaveJobButtonText("Remove job from saved")
                setIsJobSaved(!isJobSaved);
                setIsSuccessfulPopup(true);
                setPopUpText("Job successfully saved!");
                setShowPopup(true);
                setUserSavedJobs((prevSavedJobs) => [...prevSavedJobs, job]);
            }
        }
        catch (error){
            if (error instanceof ServerError){
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
            (event.target.classList.contains("more-options-box") || event.target.closest(".more-options-box"));
        if (isMoreOptionsClick) {
            return;
        }
        setSelectedJob(job);
    }

    return (
       <div ref={currentComponentRef} className={`short-job-description-component-box ${isSelected ? "job-selected-border" : ""}`} onClick={handleJobClick}>
           {showPopup && <NotifyPopupWindow isSuccessful={isSuccessfulPopup} text={popUpText}/>}
           <div className={"more-options-absolute-container"}>
               <button className={"more-options-box"} onClick={showMoreOptions}>
                   <FontAwesomeIcon icon={faEllipsisVertical}/>
               </button>
               {moreOptionsVisible && <div className={"more-options-bar"}>
                   <div className={"more-options-window-absolute-container"}>
                       <div className={"more-options-window"}>
                           <button className={"first-option"} onClick={saveJob}>
                               {!isJobSaved ? (<FontAwesomeIcon className={"bookmark-icon"} icon={regularBookmark} />) :
                                   (<FontAwesomeIcon className={"bookmark-icon"} icon={solidBookmark} />)}
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
                       <span >{job.location}</span>
                   </div>

                   <div className={"job-features-info"}>
                       <JobFeatureBox featureName={`$${thousandsDisplayHelper(job.salary)} ${job.salaryRate}`} moreFeaturesAmount={0}/>
                       <JobFeatureBox featureName={`${jobTypesConverter(job.jobType[0])}`} moreFeaturesAmount={job.jobType.length - 1}/>
                       {job.schedule.length != 0 && <JobFeatureBox featureName={`${schedulesEnumConverter(job.schedule[0])}`} moreFeaturesAmount={job.schedule.length - 1}/>}
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
)};

export default ShortJobDescriptionBlock;
