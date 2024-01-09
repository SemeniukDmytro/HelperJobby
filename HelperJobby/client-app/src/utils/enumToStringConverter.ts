import JobTypes from "../enums/JobTypes";
import Schedules from "../enums/Schedules";
import EmployeeBenefits from "../enums/EmployeeBenefits";
import {countries} from "../AppConstData/CountriesData";
import {EmployeeBenefitsMapData} from "../AppConstData/EmployeeBenefitsMapData";
import {JobTypesMapData} from "../AppConstData/JobTypesMapData";
import {SchedulesMapData} from "../AppConstData/SchedulesMapData";

export const jobTypesEnumToStringMap = (jobType: string): string => {
    let jobTypeEnumValue: JobTypes = JobTypes[jobType as keyof typeof JobTypes];
    const jobTypesStringMapObj = JobTypesMapData.find((js) => js.enumValue === jobTypeEnumValue);
    if (jobTypesStringMapObj) {
        return jobTypesStringMapObj.stringValue;
    } else return jobType;
};

export const jobTypeStringToEnumMap = (jobType: string): string => {
    const jobTypesStringMapObj = JobTypesMapData.find((js) => js.stringValue === jobType);
    if (jobTypesStringMapObj) {
        return jobTypesStringMapObj.enumValue.toString();
    } else return jobType;
};

export const schedulesEnumToStringMap = (scheduleValue: string): string => {
    let schedulesEnumValue: Schedules = Schedules[scheduleValue as keyof typeof Schedules];
    const schedulesStringMapObj = SchedulesMapData.find((ss) => ss.enumValue === schedulesEnumValue);
    if (schedulesStringMapObj) {
        return schedulesStringMapObj.stringValue;
    } else return scheduleValue;
};

export const scheduleStringToEnumMap = (scheduleValue: string): string => {
    const schedulesStringMapObj = SchedulesMapData.find((ss) => ss.stringValue === scheduleValue);
    if (schedulesStringMapObj) {
        return schedulesStringMapObj.enumValue.toString();
    } else return scheduleValue;
};

export const benefitsEnumToStringMap = (benefitsValue : string) => {
    let benefitsEnumValue : EmployeeBenefits = EmployeeBenefits[benefitsValue as keyof typeof EmployeeBenefits];
    const benefitsStringMapObj = EmployeeBenefitsMapData.find((bs) => bs.enumValue == benefitsEnumValue)
    if (benefitsStringMapObj){
        return benefitsStringMapObj.stringValue;
    }
    else return benefitsValue;
};

export const benefitStringToEnumMap = (benefitsValue : string) => {
    const benefitsStringMapObj = EmployeeBenefitsMapData.find((bs) => bs.stringValue == benefitsValue)
    if (benefitsStringMapObj){
        return benefitsStringMapObj.enumValue.toString();
    }
    else return benefitsValue;
};