import {useContext} from "react";
import ResumeBuildContext from "../contexts/ResumeBuildContext";

export default function useResumeBuild (){
    return useContext(ResumeBuildContext);
}