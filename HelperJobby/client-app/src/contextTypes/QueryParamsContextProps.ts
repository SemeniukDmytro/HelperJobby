import {Dispatch, SetStateAction, useState} from "react";
import JobTypes from "../enums/JobTypes";

export interface QueryParamsContextProps {
    start : number;
    setStart : Dispatch<SetStateAction<number>>;
    isRemote : boolean;
    setIsRemote : Dispatch<SetStateAction<boolean>>;
    pay : number;
    setPay : Dispatch<SetStateAction<number>>;
    jobType : JobTypes;
    setJobType : Dispatch<SetStateAction<JobTypes>>;
    language : string;
    setLanguage : Dispatch<SetStateAction<string>>;
}
