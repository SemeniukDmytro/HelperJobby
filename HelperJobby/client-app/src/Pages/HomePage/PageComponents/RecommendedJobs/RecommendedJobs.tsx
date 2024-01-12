import React, {FC, useEffect, useState} from 'react';
import ShortJobDescriptionBlock from "../ShortJobDescriptionBlock/ShortJobDescriptionBlock";
import JobDescriptionHeader from "../JobDescriptionHeader/JobDescriptionHeader";
import JobDetailsScrollWindow from "../JobDetailsScrollWindow/JobDetailsScrollWindow";
import "./RecommendedJobs.scss";
import {useHomePage} from "../../../../hooks/useHomePage";
import DetailedDescriptionColumn from "../DetailedDescriptionColumn/DetailedDescriptionColumn";

interface RecommendedJobsProps {}

const RecommendedJobs: FC<RecommendedJobsProps> = () => {
    const {recommendedJobs, selectedJob, setSelectedJob,
    isShortHeaderGridTemplate, setIsShortHeaderGridTemplate,
        isFullHeaderGridTemplate, setIsFullHeaderGridTemplate, mainContentReferenceForHome} = useHomePage();

    
  return  (
      <div className={"jobs-container"}>
          <div className={"short-job-descriptions-column"}>
              <div className={"title-container"}>
                  <span>Jobs based on your activity on indeed</span>
              </div>
              {recommendedJobs.map((job, index) => (
                  <ShortJobDescriptionBlock key={index} job={job}
                  selectedJob={selectedJob} setSelectedJob={setSelectedJob}></ShortJobDescriptionBlock>
              ))}
          </div>
          <DetailedDescriptionColumn isFullHeaderGridTemplate={isFullHeaderGridTemplate}
                                     setIsFullHeaderGridTemplate={setIsFullHeaderGridTemplate}
                                     isShortHeaderGridTemplate={isShortHeaderGridTemplate} 
                                     setIsShortHeaderGridTemplate={setIsShortHeaderGridTemplate} 
                                     mainContentReference={mainContentReferenceForHome}
                                     selectedJob={selectedJob}/>
      </div>
)};

export default RecommendedJobs;
