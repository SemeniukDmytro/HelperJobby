import {ResumeDTO} from "./ResumeDTO";

export interface WorkExperienceDTO {
    id: number;
    jobTitle: string;
    company?: string;
    country?: string;
    cityOrProvince?: string;
    from?: string;
    to?: string;
    currentlyWorkHere?: boolean;
    description?: string;
    resumeId: number;
    resume: ResumeDTO;
}