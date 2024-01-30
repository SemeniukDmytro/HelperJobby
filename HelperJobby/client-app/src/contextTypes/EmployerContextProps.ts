import {EmployerAccountDTO} from "../DTOs/accountDTOs/EmployerAccountDTO";
import {Dispatch, SetStateAction} from "react";

export interface EmployerContextProps{
    employer : EmployerAccountDTO | null;
    setEmployer : Dispatch<SetStateAction<EmployerAccountDTO | null>>;
    fetchEmployer : () => void;
}