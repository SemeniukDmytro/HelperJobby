import {JobTypesMapData} from "../../AppConstData/JobTypesMapData";
import {SchedulesMapData} from "../../AppConstData/SchedulesMapData";
import {EmployeeBenefitsMapData} from "../../AppConstData/EmployeeBenefitsMapData";
import JobTypes from "../../enums/modelDataEnums/JobTypes";
import Schedules from "../../enums/modelDataEnums/Schedules";
import EmployeeBenefits from "../../enums/modelDataEnums/EmployeeBenefits";
import {SalaryRates} from "../../enums/modelDataEnums/SalaryRates";
import {salaryRatesMapData, showPayByOptionsMapData} from "../../AppConstData/PayRelatedData";
import {ShowPayByOptions} from "../../enums/modelDataEnums/ShowPayByOptions";
import {ResumeRequirementOptions} from "../../enums/modelDataEnums/ResumeRequirementOptions";
import {resumeRequirementOptionsMapData} from "../../AppConstData/ResumeRequirements";


export const jobTypesEnumToStringMap = (jobType: JobTypes): string => {
    const jobTypesStringMapObj = JobTypesMapData.find((js) => js.enumValue === jobType);
    if (jobTypesStringMapObj) {
        return jobTypesStringMapObj.stringValue;
    } else return JobTypes[jobType];
};

export const jobTypeStringToEnumMap = (jobType: string): JobTypes | undefined => {
    const jobTypesStringMapObj = JobTypesMapData.find((js) => js.stringValue === jobType);
    if (jobTypesStringMapObj) {
        return jobTypesStringMapObj.enumValue;
    }
};

export const schedulesEnumToStringMap = (scheduleEnumValue: Schedules): string => {
    const schedulesStringMapObj = SchedulesMapData.find((ss) => ss.enumValue === scheduleEnumValue);
    if (schedulesStringMapObj) {
        return schedulesStringMapObj.stringValue;
    } else return Schedules[scheduleEnumValue];
};

export const scheduleStringToEnumMap = (scheduleStringValue: string): Schedules | undefined => {
    const schedulesStringMapObj = SchedulesMapData.find((ss) => ss.stringValue === scheduleStringValue);
    if (schedulesStringMapObj) {
        return schedulesStringMapObj.enumValue
    }
};

export const benefitsEnumToStringMap = (benefitsEnumValue: EmployeeBenefits) : string => {
    const benefitsStringMapObj = EmployeeBenefitsMapData.find((bs) => bs.enumValue == benefitsEnumValue)
    if (benefitsStringMapObj) {
        return benefitsStringMapObj.stringValue;
    } else return EmployeeBenefits[benefitsEnumValue];
};

export const benefitStringToEnumMap = (benefitsValue: string) : EmployeeBenefits | undefined => {
    const benefitsStringMapObj = EmployeeBenefitsMapData.find((bs) => bs.stringValue == benefitsValue)
    if (benefitsStringMapObj) {
        return benefitsStringMapObj.enumValue;
    }
};

export const salaryRatesEnumToStringMap = (salaryRateEnumValue: SalaryRates): string => {
    const salaryRatesStringMap = salaryRatesMapData.find((sr) => sr.enumValue === salaryRateEnumValue);
    if (salaryRatesStringMap) {
        return salaryRatesStringMap.stringValue;
    } else return SalaryRates[salaryRateEnumValue];
};

export const showPayByOptionsEnumToStringMap = (showPayByOptionEnumValue: ShowPayByOptions): string => {
    const showPayByOptionStringMap = showPayByOptionsMapData.find((spo) => spo.enumValue === showPayByOptionEnumValue);
    if (showPayByOptionStringMap) {
        return showPayByOptionStringMap.stringValue;
    } else return ShowPayByOptions[showPayByOptionEnumValue];
};

export const resumeRequirementOptionsEnumToStringMap = (resumeRequirementOptionEnumValue: ResumeRequirementOptions): string => {
    const resumeRequirementByOptionStringMap = resumeRequirementOptionsMapData.find((rro) => rro.enumValue === resumeRequirementOptionEnumValue);
    if (resumeRequirementByOptionStringMap) {
        return resumeRequirementByOptionStringMap.stringValue;
    } else return ResumeRequirementOptions[resumeRequirementOptionEnumValue];
};