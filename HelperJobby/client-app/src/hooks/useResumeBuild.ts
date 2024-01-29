import {useContext} from "react";
import ResumeContext from "../contexts/ResumeContext";

export default function useResumeBuild (){
    return useContext(ResumeContext);
}