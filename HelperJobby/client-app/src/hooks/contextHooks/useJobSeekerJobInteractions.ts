import {useContext} from "react";
import jobSeekerJobInteractionsContext from "../../contexts/JobSeekerJobInteractionsContext";


export function useJobSeekerJobInteractions() {
    return useContext(jobSeekerJobInteractionsContext);
}