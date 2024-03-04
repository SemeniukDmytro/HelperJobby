import {useContext} from "react";
import EmployerContext from "../../contexts/EmployerContext";

export function useEmployer() {
    return useContext(EmployerContext);
}