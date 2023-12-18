import {ResumeDTO} from "./ResumeDTO";

export interface WorkExperienceDTO {
    workExperienceId: number;
    jobTitle?: string;
    company?: string;
    country?: string;
    cityOrProvince?: string;
    from?: Date;
    to?: Date;
    currentlyWorkHere?: boolean;
    description?: string;
    resumeId: number;
    resume: ResumeDTO;
}