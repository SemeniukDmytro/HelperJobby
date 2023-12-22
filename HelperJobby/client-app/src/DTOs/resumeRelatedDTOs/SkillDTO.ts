import {ResumeDTO} from "./ResumeDTO";

export interface SkillDTO {
    id: number;
    resumeId: number;
    resume: ResumeDTO;
    name: string;
}