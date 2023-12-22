import {JobSeekerAccountDTO} from "../accountDTOs/JobSeekerAccountDTO";
import {EducationDTO} from "./EducationDTO";
import {WorkExperienceDTO} from "./WorkExperienceDTO";
import {SkillDTO} from "./SkillDTO";

export interface ResumeDTO {
    id: number;
    jobSeekerAccountId: number;
    jobSeekerAccount: JobSeekerAccountDTO;
    educations: EducationDTO[];
    workExperiences: WorkExperienceDTO[];
    skills: SkillDTO[];
}