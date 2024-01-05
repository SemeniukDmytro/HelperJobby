import React, {FC, useEffect, useState} from 'react';
import ShortJobDescriptionBlock from "../ShortJobDescriptionBlock/ShortJobDescriptionBlock";
import JobDescriptionHeader from "../JobDescriptionHeader/JobDescriptionHeader";
import JobDetailsScrollWindow from "../JobDetailsScrollWindow/JobDetailsScrollWindow";
import "./RecommendedJobs.scss";
import {useHomePage} from "../../../../hooks/useHomePage";

interface RecommendedJobsProps {}

const RecommendedJobs: FC<RecommendedJobsProps> = () => {
    const [stickyHeight, setStickyHeight] = useState(361.2);
    const {recommendedJobs} = useHomePage();

    useEffect(() => {
        updateStickyHeight();
        const handleScroll = () => {
            updateStickyHeight();
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [stickyHeight]);

    const updateStickyHeight = () => {
        let newHeight = 361.2 + window.scrollY;
        if (newHeight > 698){
            setStickyHeight(698)
        }
        else{
            setStickyHeight(newHeight);
        }
    };
    
  return  (
      <div className={"jobs-container"}>
          <div className={"short-job-descriptions-column"}>
              <div className={"title-container"}>
                  <span>Jobs based on your activity on indeed</span>
              </div>
              {recommendedJobs.map((job, index) => (
                  <ShortJobDescriptionBlock key={index} job={job}></ShortJobDescriptionBlock>
              ))}
          </div>
          <div className={"detailed-description-column"}>
              <div style={{height : `${stickyHeight}px`}} className={"detailed-description-sticky"}>
                  <div className={"detailed-description-content-box"}>
                      <JobDescriptionHeader></JobDescriptionHeader>
                      <JobDetailsScrollWindow></JobDetailsScrollWindow>
                  </div>
              </div>
          </div>
      </div>
)};

export default RecommendedJobs;
