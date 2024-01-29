import {Dispatch, SetStateAction} from "react";

export type JobActionFunction = (jobId: number) => Promise<void>;

export type ShowRemoveFromSavedSetter = Dispatch<SetStateAction<boolean>>;