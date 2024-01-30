import {JobDTO} from "../jobRelatetedDTOs/JobDTO";

export interface JobSearchResultDTO {
    jobs: JobDTO[];
    hasMore: boolean;
}