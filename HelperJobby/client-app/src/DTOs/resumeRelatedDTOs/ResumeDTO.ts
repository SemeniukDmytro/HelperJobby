import {JobSeekerDTO} from "../accountDTOs/JobSeekerDTO";
import {EducationDTO} from "./EducationDTO";
import {WorkExperienceDTO} from "./WorkExperienceDTO";
import {SkillDTO} from "./SkillDTO";

export interface ResumeDTO {
    id: number;
    jobSeekerId: number;
    jobSeeker: JobSeekerDTO;
    educations: EducationDTO[];
    workExperiences: WorkExperienceDTO[];
    skills: SkillDTO[];
}