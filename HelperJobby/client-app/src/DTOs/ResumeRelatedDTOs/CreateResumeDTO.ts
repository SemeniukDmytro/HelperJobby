import {CreateUpdateEducationDTO} from "./CreateUpdateEducationDTO";
import {CreateUpdateWorkExperienceDTO} from "./CreateUpdateWorkExperienceDTO";
import {CreateSkillDTO} from "./CreateSkillDTO";

export interface CreateResumeDTO {
    educations: CreateUpdateEducationDTO[];
    workExperiences: CreateUpdateWorkExperienceDTO[];
    skills: CreateSkillDTO[];
}