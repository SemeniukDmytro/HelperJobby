import {useContext} from "react";
import ApplyResumeContext from "../../contexts/ApplyResumeContext";

export function useApplyResume() {
    return useContext(ApplyResumeContext);
}