import React, { FC } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import "./ShortJobDescriptionBlock.scss";
import {JobDTO} from "../../DTOs/jobRelatetedDTOs/JobDTO";

interface ShortJobDescriptionBlockProps {
    job : JobDTO
}

const ShortJobDescriptionBlock: FC<ShortJobDescriptionBlockProps> = (props : ShortJobDescriptionBlockProps) => {
    const {job} = props; 
    
   return (
       <div className={"short-job-description-component-box"}>
           <button className={"more-options-box"}>
               <FontAwesomeIcon icon={faEllipsisVertical} />
           </button>
           <div className={"short-description-content-box"}>
               <div className={"description-content"}>
                   <div className={"new-job-container"}>
                       <span>New</span>
                   </div>
                   <a className={"job-title"}>
                       {job.jobTitle}
                   </a>
                   <a className={"medium-description-text"}>
                       Organization name
                   </a>

                   <div className={"medium-description-text"}>
                       <span >Job location</span>
                   </div>

                   <div className={"job-features-info"}>
                       <div className={"job-feature"}>
                           <span>Job feature</span>
                       </div>
                       <div className={"job-feature"}>
                           <span>Job feature</span>
                       </div>
                   </div>
                   <div className={"short-description-content"}>
                       <span>Empowering insurance organizations to quickly capitalize on new opportunities by delivering the world’s most configurable, cloud-native, easy-to-use, and intuitively analytical software.</span>
                   </div>
                   <div className={"date-posted"}>
                       <span>Posted n days ago</span>
                   </div>
               </div>
           </div>
       </div>
)};

export default ShortJobDescriptionBlock;
