import {JobSeekerAccountDTO} from "../accountDTOs/JobSeekerAccountDTO";
import {EmployerAccountDTO} from "../accountDTOs/EmployerAccountDTO";

export interface UserDTO {
    id: number;
    email: string;
    password: string;
    accountType: string;
    jobSeekerAccount: JobSeekerAccountDTO;
    employerAccount: EmployerAccountDTO;
}