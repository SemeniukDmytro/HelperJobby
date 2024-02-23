import {JobProperties} from "../../enums/utilityEnums/JobProperties";
import {JobDTO} from "../../DTOs/jobRelatetedDTOs/JobDTO";
import {IncompleteJobDTO} from "../../DTOs/jobRelatetedDTOs/IncompleteJobDTO";
import {Dispatch, SetStateAction} from "react";

export function checkIfRequiredJobInfoMissing(incompleteJob : JobDTO | IncompleteJobDTO,
                                       setMissingJobProperties : Dispatch<SetStateAction<JobProperties[]>>) {
    let tempMissingProperties: JobProperties[] = [];
    let requiredInfoIsMissing = false;
    if (!incompleteJob?.jobTitle) {
        tempMissingProperties.push(JobProperties.jobTitle);
        requiredInfoIsMissing = true;
    }
    if (!incompleteJob?.jobType || incompleteJob.jobType.length == 0) {
        tempMissingProperties.push(JobProperties.jobType);
        requiredInfoIsMissing = true;
    }
    if (!incompleteJob?.description) {
        tempMissingProperties.push(JobProperties.jobDescription);
        requiredInfoIsMissing = true;
    }
    if (!incompleteJob?.contactEmail) {
        tempMissingProperties.push(JobProperties.contactEmail);
        requiredInfoIsMissing = true;
    }
    if (!incompleteJob?.numberOfOpenings) {
        tempMissingProperties.push(JobProperties.numberOfOpenings);
        requiredInfoIsMissing = true;
    }
    if (!incompleteJob?.jobLocationType) {
        tempMissingProperties.push(JobProperties.jobLocation);
        requiredInfoIsMissing = true;
    }
    setMissingJobProperties(prev => [...prev, ...tempMissingProperties]);
    return requiredInfoIsMissing;
}