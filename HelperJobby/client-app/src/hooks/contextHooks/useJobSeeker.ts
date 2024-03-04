import {useContext} from "react";
import JobSeekerContext from "../../contexts/JobSeekerContext";

export function useJobSeeker() {
    return useContext(JobSeekerContext);
}