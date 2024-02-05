import {JobTypesMapData} from "../../AppConstData/JobTypesMapData";
import {SchedulesMapData} from "../../AppConstData/SchedulesMapData";
import {EmployeeBenefitsMapData} from "../../AppConstData/EmployeeBenefitsMapData";
import JobTypes from "../../enums/modelDataEnums/JobTypes";
import Schedules from "../../enums/modelDataEnums/Schedules";
import EmployeeBenefits from "../../enums/modelDataEnums/EmployeeBenefits";


export const jobTypesEnumToStringMap = (jobType: string): string => {
    let jobTypeEnumValue: JobTypes = JobTypes[jobType as keyof typeof JobTypes];
    const jobTypesStringMapObj = JobTypesMapData.find((js) => js.enumValue === jobTypeEnumValue);
    if (jobTypesStringMapObj) {
        return jobTypesStringMapObj.stringValue;
    } else return jobType;
};

export const jobTypeStringToEnumMap = (jobType: string): JobTypes | undefined => {
    const jobTypesStringMapObj = JobTypesMapData.find((js) => js.stringValue === jobType);
    if (jobTypesStringMapObj) {
        return jobTypesStringMapObj.enumValue;
    }
};

export const schedulesEnumToStringMap = (scheduleValue: string): string => {
    let schedulesEnumValue: Schedules = Schedules[scheduleValue as keyof typeof Schedules];
    const schedulesStringMapObj = SchedulesMapData.find((ss) => ss.enumValue === schedulesEnumValue);
    if (schedulesStringMapObj) {
        return schedulesStringMapObj.stringValue;
    } else return scheduleValue;
};

export const scheduleStringToEnumMap = (scheduleValue: string): Schedules | undefined => {
    const schedulesStringMapObj = SchedulesMapData.find((ss) => ss.stringValue === scheduleValue);
    if (schedulesStringMapObj) {
        return schedulesStringMapObj.enumValue
    }
};

export const benefitsEnumToStringMap = (benefitsValue: string) => {
    let benefitsEnumValue: EmployeeBenefits = EmployeeBenefits[benefitsValue as keyof typeof EmployeeBenefits];
    const benefitsStringMapObj = EmployeeBenefitsMapData.find((bs) => bs.enumValue == benefitsEnumValue)
    if (benefitsStringMapObj) {
        return benefitsStringMapObj.stringValue;
    } else return benefitsValue;
};

export const benefitStringToEnumMap = (benefitsValue: string) : EmployeeBenefits | undefined => {
    const benefitsStringMapObj = EmployeeBenefitsMapData.find((bs) => bs.stringValue == benefitsValue)
    if (benefitsStringMapObj) {
        return benefitsStringMapObj.enumValue;
    }
};