import {JobSeekerDTO} from "../accountDTOs/JobSeekerDTO";
import {EmployerDTO} from "../accountDTOs/EmployerDTO";

export interface UserDTO {
    id: number;
    email: string;
    password: string;
    accountType: string;
    jobSeekerAccount: JobSeekerDTO;
    employerAccount: EmployerDTO;
}