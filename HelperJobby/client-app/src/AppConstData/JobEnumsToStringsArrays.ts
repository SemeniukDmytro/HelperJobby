import JobTypes from "../enums/JobTypes";
import {
    benefitsEnumToStringMap,
    jobTypesEnumToStringMap,
    schedulesEnumToStringMap
} from "../utils/convertLogic/enumToStringConverter";
import Schedules from "../enums/Schedules";
import employeeBenefits from "../enums/EmployeeBenefits";

export const jobTypesStringValues = Object.keys(JobTypes)
    .filter(key => isNaN(Number(key)))
    .map(key => jobTypesEnumToStringMap(key));
export const schedulesStringValues = Object.keys(Schedules)
    .filter(key => isNaN(Number(key)))
    .map(key => schedulesEnumToStringMap(key));

export const benefitsStringValues = Object.keys(employeeBenefits)
    .filter(key => isNaN(Number(key)))
    .map(key => benefitsEnumToStringMap(key));