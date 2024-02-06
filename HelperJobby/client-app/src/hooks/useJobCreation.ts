import {useContext} from "react";
import {JobCreationContext} from "../contexts/JobCreationContext";

export default function useJobCreation(){
    return useContext(JobCreationContext);
}