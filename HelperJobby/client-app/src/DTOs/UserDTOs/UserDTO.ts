import {EmployerAccountDTO} from "../AccountDTOs/EmployerAccountDTO";
import {JobSeekerAccountDTO} from "../AccountDTOs/JobSeekerAccountDTO";

export interface UserDTO {
    id: number;
    email: string;
    password: string;
    accountType: string;
    jobSeekerAccount: JobSeekerAccountDTO;
    employerAccount: EmployerAccountDTO;
}