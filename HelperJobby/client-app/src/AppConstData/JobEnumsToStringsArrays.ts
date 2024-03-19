import {
    benefitsEnumToStringMap,
    jobTypesEnumToStringMap,
    schedulesEnumToStringMap
} from "../utils/convertLogic/enumToStringConverter";
import JobTypes from "../enums/modelDataEnums/JobTypes";
import Schedules from "../enums/modelDataEnums/Schedules";
import employeeBenefits from "../enums/modelDataEnums/EmployeeBenefits";
import EmployeeBenefits from "../enums/modelDataEnums/EmployeeBenefits";

export const jobTypesStringValues = Object.keys(JobTypes)
    .filter(key => isNaN(Number(key)))
    .map(key => jobTypesEnumToStringMap(JobTypes[key as keyof typeof JobTypes]));

export const schedulesStringValues = Object.keys(Schedules)
    .filter(key => isNaN(Number(key)))
    .map(key => schedulesEnumToStringMap(Schedules[key as keyof typeof Schedules]));

export const benefitsStringValues = Object.keys(employeeBenefits)
    .filter(key => isNaN(Number(key)))
    .map(key => benefitsEnumToStringMap(EmployeeBenefits[key as keyof typeof EmployeeBenefits]));