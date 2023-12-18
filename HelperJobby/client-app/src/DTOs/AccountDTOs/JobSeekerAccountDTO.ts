import {UserDTO} from "../UserDTOs/UserDTO";
import {AddressDTO} from "../AddressDTOs/AddressDTO";
import {ResumeDTO} from "../ResumeRelatedDTOs/ResumeDTO";
import {InterviewDTO} from "../UserJobInteractionsDTOs/InterviewDTO";
import {JobApplyDTO} from "../UserJobInteractionsDTOs/JobApplyDTO";
import {SavedJobDTO} from "../UserJobInteractionsDTOs/SavedJobDTO";

export interface JobSeekerAccountDTO {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    userId: number;
    user: UserDTO;
    addressId: number;
    address: AddressDTO;
    resume: ResumeDTO;
    interviews: InterviewDTO[];
    jobApplies: JobApplyDTO[];
    savedJobs: SavedJobDTO[];
}