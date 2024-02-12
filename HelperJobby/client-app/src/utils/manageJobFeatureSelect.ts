import {jobTypeStringToEnumMap} from "./convertLogic/enumToStringConverter";
import JobTypes from "../enums/modelDataEnums/JobTypes";
import {Dispatch, SetStateAction} from "react";

export function addJobType(jobTypeString: string, selectedJobTypes : JobTypes[], setSelectedJobTypes : Dispatch<SetStateAction<JobTypes[]>>,
                    setIsInvalidForm : Dispatch<SetStateAction<boolean>>) {
    const jobType = jobTypeStringToEnumMap(jobTypeString);
    if (jobType && !selectedJobTypes.includes(jobType)) {
        setSelectedJobTypes(prevSelectedJobType  => [...prevSelectedJobType, jobType]);
        setIsInvalidForm(false)
    } else if (jobType) {
        setSelectedJobTypes(prevSelectedJobType =>
            prevSelectedJobType.filter(type => type !== jobType));
        setIsInvalidForm(selectedJobTypes.length <= 1);
    }
}