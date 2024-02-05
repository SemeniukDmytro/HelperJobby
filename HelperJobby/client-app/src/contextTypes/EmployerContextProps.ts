import {EmployerDTO} from "../DTOs/accountDTOs/EmployerDTO";
import {Dispatch, SetStateAction} from "react";

export interface EmployerContextProps {
    employer: EmployerDTO | null;
    setEmployer: Dispatch<SetStateAction<EmployerDTO | null>>;
    fetchEmployer: () => void;
}