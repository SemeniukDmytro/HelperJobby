import {
    benefitStringToEnumMap,
    jobTypeStringToEnumMap,
    scheduleStringToEnumMap
} from "./convertLogic/enumToStringConverter";
import JobTypes from "../enums/modelDataEnums/JobTypes";
import {Dispatch, SetStateAction} from "react";
import Schedules from "../enums/modelDataEnums/Schedules";
import EmployeeBenefits from "../enums/modelDataEnums/EmployeeBenefits";

export function addJobType(jobTypeString: string, selectedJobTypes: JobTypes[], setSelectedJobTypes: Dispatch<SetStateAction<JobTypes[]>>,
                           setIsInvalidForm: Dispatch<SetStateAction<boolean>>) {
    const jobType = jobTypeStringToEnumMap(jobTypeString);
    if (jobType && !selectedJobTypes.includes(jobType)) {
        setSelectedJobTypes(prevSelectedJobType => [...prevSelectedJobType, jobType]);
        setIsInvalidForm(false)
    } else if (jobType) {
        setSelectedJobTypes(prevSelectedJobType =>
            prevSelectedJobType.filter(type => type !== jobType));
        setIsInvalidForm(selectedJobTypes.length <= 1);
    }
}

export function addSchedule(scheduleString: string, selectedSchedule: Schedules[], setSelectedSchedule: Dispatch<SetStateAction<Schedules[]>>) {
    const schedule = scheduleStringToEnumMap(scheduleString);
    if (schedule && !selectedSchedule.includes(schedule)) {
        setSelectedSchedule(prevSelectedSchedule => [...prevSelectedSchedule, schedule]);
    } else if (schedule) {
        setSelectedSchedule(prevSelectedSchedule =>
            prevSelectedSchedule.filter(type => type !== schedule),
        );
    }
}

export function addBenefit(benefitString: string, selectedBenefits: EmployeeBenefits[], setSelectedBenefits: Dispatch<SetStateAction<EmployeeBenefits[]>>) {
    const benefit = benefitStringToEnumMap(benefitString);
    if (benefit && !selectedBenefits.includes(benefit)) {
        setSelectedBenefits(prevSelectedBenefits => [...prevSelectedBenefits, benefit]);
    } else if (benefit) {
        setSelectedBenefits(prevSelectedBenefits =>
            prevSelectedBenefits.filter(type => type !== benefit),
        );
    }
}