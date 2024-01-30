import {Dispatch, MutableRefObject, SetStateAction} from "react";
import JobTypes from "../enums/JobTypes";

export interface JobQueryParamsContextProps {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    jobLocation: string;
    setJobLocation: Dispatch<SetStateAction<string>>;
    start: number;
    setStart: Dispatch<SetStateAction<number>>;
    isRemote: boolean;
    setIsRemote: Dispatch<SetStateAction<boolean>>;
    pay: number;
    setPay: Dispatch<SetStateAction<number>>;
    jobType: JobTypes;
    setJobType: Dispatch<SetStateAction<JobTypes>>;
    language: string;
    setLanguage: Dispatch<SetStateAction<string>>;
    mainContentReferenceForSearch: MutableRefObject<HTMLDivElement | null> | null;
    setMainContentRefForSearch: Dispatch<SetStateAction<MutableRefObject<HTMLDivElement | null> | null>>;
}
