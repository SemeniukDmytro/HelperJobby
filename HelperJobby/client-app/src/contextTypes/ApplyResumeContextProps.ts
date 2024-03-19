import {Dispatch, SetStateAction} from "react";

export interface ApplyResumeContextProps {
    jobId: number | null;
    setJobId: Dispatch<SetStateAction<number | null>>;

}