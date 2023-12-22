import {ResumeDTO} from "./ResumeDTO";

export interface EducationDTO {
    id: number;
    levelOfEducation: string;
    fieldOfStudy?: string;
    schoolName?: string;
    country?: string;
    city?: string;
    from?: Date;
    to?: Date;
    resumeId: number;
    resume: ResumeDTO;
}