import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './JobFullInfoComponent.scss';
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {thousandsDisplayHelper} from "../../../../utils/thousandsDisplayHelper";
import {useJobSeekerJobInteractions} from "../../../../hooks/useJobSeekerJobInteractions";
import DetailedJobInfo from "../../../../Components/DetailedJobInfo/DetailedJobInfo";
import {useJobSeeker} from "../../../../hooks/useJobSeeker";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import {faBookmark, faHeart as solidHeart} from "@fortawesome/free-solid-svg-icons";
import {JobSeekerAccountService} from "../../../../services/jobSeekerAccountService";
import {useJobActions} from "../../../../hooks/useJobActions";
import {JobActionFunction, ShowRemoveFromSavedSetter} from "../../../../hooks/customHooksTypes/UseJobActionsHookTypes";
import {logErrorInfo} from "../../../../utils/logErrorInfo";
import {useAuth} from "../../../../hooks/useAuth";
import {useNavigate} from "react-router-dom";

interface JobFullInfoComponentProps {
    job : JobDTO
}

const JobFullInfoComponent: FC<JobFullInfoComponentProps> = ({job}) => {
    const {jobSeeker, setJobSeeker,
        fetchJobSeekerJobApplies, fetchJobSeekerSavedJobs} = useJobSeeker();
    const [isApplied, setIsApplied] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const jobSeekerService = new JobSeekerAccountService();
    const {saveJob, removeSavedJob} = useJobActions(jobSeekerService, setJobSeeker, job);
    const {authUser} = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    
    
    useEffect(() => {
        fetchJobSeekerJobInteractions();
    }, []);

    useEffect(() => {
        isApplicationCreated();
        isJobSaved();
    }, [jobSeeker?.savedJobs, jobSeeker?.jobApplies]);
    
    async function fetchJobSeekerJobInteractions(){
        await fetchJobSeekerSavedJobs();
        await fetchJobSeekerJobApplies();
        setLoading(false);
    }
    
    function isApplicationCreated(){
        if (!jobSeeker?.jobApplies){
            return;
        }
        if (jobSeeker?.jobApplies.some(j => j.jobId === job.id)){
            setIsApplied(true);
        }
        else {
            setIsApplied(false);
        }
    }
    
    function isJobSaved(){
        if (!jobSeeker?.savedJobs){
            return;
        }
        if (jobSeeker?.savedJobs.some(j => j.jobId === job.id)){
            setIsSaved(true);
        }
        else {
            setIsSaved(false);
        }
    }

    async function handleJobInteraction(actionFunction : JobActionFunction, setIsSaved : Dispatch<SetStateAction<boolean>>) {
        try {
            if (!authUser) {
                navigate("/auth-page");
                return;
            }

            await actionFunction(job.id);
            setIsSaved(actionFunction !== removeSavedJob);
        } catch (err) {
            logErrorInfo(err);
        }
    }

    async function handleRemoveSavedJobClick() {
        await handleJobInteraction(removeSavedJob, setIsSaved);
    }

    async function handleSaveJobClick() {
        await handleJobInteraction(saveJob, setIsSaved);
    }
    

    return (
       (loading) ? <LoadingPage/> :
        <div className={"fji-layout"}>
            <div className={"fji-fb"}>
              <div className={"fji-job-container"}>
                  <div className={"fji-job-header-block"}>
                      <div className={"fji-job-title bold-text"}>{job.jobTitle}</div>
                      <div className={"fji-organization-name"}>{job.employerAccount.organization.name}</div>
                      <div className={"dark-default-text mb25rem"}>{job.location}</div>
                      <div
                          className={"dark-default-text mb1rem"}>${thousandsDisplayHelper(job.salary)} {job.salaryRate}</div>
                      <div className={"header-job-interactions-box"}>
                          <button className={"blue-button mr1rem"}
                                  disabled={isApplied}>{isApplied ? "Applied" : "Apply now"}</button>
                          {!isApplied ?
                              (!isSaved ? (
                                      <button className={"light-neutral-button-with-icon"}
                                              onClick={handleSaveJobClick}>
                                          <FontAwesomeIcon className={"medium-svg"} icon={faBookmark}/>
                                      </button>) : (
                                      <button className={"light-neutral-button"}
                                              onClick={handleRemoveSavedJobClick}>
                                          <FontAwesomeIcon className={"medium-svg"} icon={faBookmark}/>
                                          <span className={"dark-default-text bold-text ml05rem"}>Saved</span>
                                      </button>)
                              ) :
                              (<button className={"light-neutral-button"} disabled={isApplied}
                                       onClick={handleSaveJobClick}>
                                  <FontAwesomeIcon className={"medium-svg mr05rem"} icon={faBookmark}/>
                                  {isApplied && <span className={"dark-default-text bold-text"}>Applied</span>}
                              </button>)
                          }
                          
                      </div>
                  </div>
                  <DetailedJobInfo job={job}/>
              </div>
            </div>
        </div>
)
};

export default JobFullInfoComponent;