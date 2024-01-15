import {Dispatch, SetStateAction} from "react";

export interface ResumeBuildContextProps{
    progressPercentage : number | null;
    setProgressPercentage : Dispatch<SetStateAction<number | null>>;
    saveFunc : () => Promise<void>;
    setSaveFunc:  Dispatch<SetStateAction<() => Promise<void>>>;
}