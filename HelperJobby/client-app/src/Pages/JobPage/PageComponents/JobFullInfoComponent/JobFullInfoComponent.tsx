import React, {FC, useEffect, useState} from 'react';
import './JobFullInfoComponent.scss';
import {JobDTO} from "../../../../DTOs/jobRelatetedDTOs/JobDTO";
import {thousandsDisplayHelper} from "../../../../utils/thousandsDisplayHelper";
import {useJobSeekerJobInteractions} from "../../../../hooks/useJobSeekerJobInteractions";
import DetailedJobInfo from "../../../../Components/DetailedJobInfo/DetailedJobInfo";
import {useJobSeeker} from "../../../../hooks/useJobSeeker";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import {faHeart as solidHeart} from "@fortawesome/free-solid-svg-icons";

interface JobFullInfoComponentProps {
    job : JobDTO
}

const JobFullInfoComponent: FC<JobFullInfoComponentProps> = ({job}) => {
    const {jobSeekerSavedJobs, jobSeekerJobApplies,
        fetchJobSeekerJobApplies, fetchJobSeekerSavedJobs} = useJobSeeker();
    const [isApplied, setIsApplied] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    
    
    
    useEffect(() => {
        if (!jobSeekerSavedJobs || !jobSeekerJobApplies){
            fetchJobSeekerSavedJobs();
            fetchJobSeekerJobApplies();
        }
    }, []);

    useEffect(() => {
        isApplicationCreated();
        isJobSaved();
    }, [jobSeekerSavedJobs, jobSeekerJobApplies]);
    
    function isApplicationCreated(){
        if (!jobSeekerJobApplies){
            return;
        }
        if (jobSeekerJobApplies.some(j => j.jobId === job.id)){
            setIsApplied(true);
        }
        else {
            setIsApplied(false);
        }
    }
    
    function isJobSaved(){
        if (!jobSeekerSavedJobs){
            return;
        }
        if (jobSeekerSavedJobs.some(j => j.jobId === job.id)){
            setIsSaved(true);
        }
        else {
            setIsSaved(false);
        }
    }

    function handleSaveJobClick() {
        
    }

    function handleRemoveSavedJobClick() {
        
    }

    return (
       (!jobSeekerSavedJobs || !jobSeekerJobApplies) ? <LoadingPage/> :
        <div className={"fji-layout"}>
            <div className={"fji-fb"}>
              <div className={"fji-job-container"}>
                  <div className={"fji-job-header-block"}>
                      <div className={"fji-job-title bold-text"}>{job.jobTitle}</div>
                      <div className={"fji-organization-name"}>{job.employerAccount.organization.name}</div>
                      <div className={"light-dark-default-text"}>{job.location}</div>
                      <div className={"dark-default-text mb1rem"}>${thousandsDisplayHelper(job.salary)} {job.salaryRate}</div>
                      <div className={"header-job-interactions-box"}>
                          <button className={"blue-button mr1rem"} disabled={isApplied}>{isApplied ? "Applied" : "Apply now"}</button>
                          {!isApplied ?  
                              (!isJobSaved ?  (
                                  <button className={"save-job-button"} onClick={handleSaveJobClick}>
                                      <FontAwesomeIcon className={"medium-svg ml1rem"} icon={regularHeart} />
                                  </button>) : (
                                  <button className={"save-job-button saved-job-button margin-left1rem"} onClick={handleRemoveSavedJobClick}>
                                      <FontAwesomeIcon className={"medium-svg"} icon={solidHeart} />
                                  </button>)
                              ) :
                              (<button className={"save-job-button margin-left1rem"} disabled={isApplied} onClick={handleSaveJobClick}>
                                  <FontAwesomeIcon className={"medium-svg mr05rem"} icon={regularHeart} />
                                  {isApplied && <span className={"dark-default-text"}>Applied</span>}
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
