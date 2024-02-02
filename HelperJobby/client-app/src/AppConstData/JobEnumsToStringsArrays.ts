import JobTypes from "../enums/JobTypes";
import {jobTypesEnumToStringMap, schedulesEnumToStringMap} from "../utils/convertLogic/enumToStringConverter";
import Schedules from "../enums/Schedules";

export const jobTypesStringValues = Object.keys(JobTypes)
    .filter(key => isNaN(Number(key)))
    .map(key => jobTypesEnumToStringMap(key));
export const schedulesStringValues = Object.keys(Schedules)
    .filter(key => isNaN(Number(key)))
    .map(key => schedulesEnumToStringMap(key));