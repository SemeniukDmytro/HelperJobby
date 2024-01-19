import {AddressDTO} from "../addressDTOs/AddressDTO";
import {ResumeDTO} from "../resumeRelatedDTOs/ResumeDTO";
import {JobApplyDTO} from "../userJobInteractionsDTOs/JobApplyDTO";
import {SavedJobDTO} from "../userJobInteractionsDTOs/SavedJobDTO";
import {InterviewDTO} from "../userJobInteractionsDTOs/InterviewDTO";
import {UserDTO} from "../userRelatedDTOs/UserDTO";

export interface JobSeekerAccountDTO {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    userId: number;
    user: UserDTO;
    addressId: number | null;
    address: AddressDTO | null;
    resume: ResumeDTO | null;
    interviews: InterviewDTO[];
    jobApplies: JobApplyDTO[];
    savedJobs: SavedJobDTO[];
}