import {ResumeDTO} from "../resumeRelatedDTOs/ResumeDTO";

export interface ResumeSearchResultDTO{
    resumes : ResumeDTO[];
    hasMore : boolean;
}