import JobTypes from "../enums/JobTypes";
import Schedules from "../enums/Schedules";
import EmployeeBenefits from "../enums/EmployeeBenefits";

export function jobTypesConverter(jobType : string) : string{
    let jobTypeEnumValue : JobTypes = JobTypes[jobType as keyof typeof JobTypes];
    switch (jobTypeEnumValue) {
        case JobTypes.FullTime:
            return 'Full-time';
        case JobTypes.PartTime:
            return 'Part-time';
        case JobTypes.Permanent:
            return 'Permanent';
        case JobTypes.FixedTermContract:
            return 'Contract';
        case JobTypes.Casual:
            return 'Casual';
        case JobTypes.Seasonal:
            return 'Seasonal';
        case JobTypes.Freelance:
            return 'Freelance';
        case JobTypes.Apprenticeship:
            return 'Apprenticeship';
        case JobTypes.InternshipCoop:
            return 'Internship';

        default:
            return 'Unknown';
    }
}

export const schedulesEnumConverter = (scheduleValue : string) => {
    let schedulesEnumValue : Schedules = Schedules[scheduleValue as keyof typeof Schedules];
    switch (schedulesEnumValue) {
        case Schedules.MondayToFriday:
            return 'Monday to Friday';
        case Schedules.WeekendsAsNeeded:
            return 'Weekends as needed';
        case Schedules.EightHourShift:
            return '8 hour shift';
        case Schedules.DayShift:
            return 'Day shift';
        case Schedules.EveningShift:
            return 'Evening shift';
        case Schedules.NightShift:
            return 'Night shift';
        case Schedules.MorningShift:
            return 'Morning shift';
        case Schedules.Overtime:
            return 'Overtime';
        case Schedules.OnCall:
            return 'On call';
        case Schedules.NoWeekends:
            return 'No weekends';
        case Schedules.EveryWeekend:
            return 'Every Weekend';
        case Schedules.Holidays:
            return 'Holidays';
        case Schedules.TenHourShift:
            return '10 hour shift';
        case Schedules.TwelveHourShift:
            return '12 hour shift';
        case Schedules.FourHourShift:
            return '4 hour shift';
        case Schedules.WeekendsOnly:
            return 'Weekends only';
        case Schedules.Other:
            return 'Other';
        default:
            return 'Unknown';
    }
};

export const benefitsEnumConverter = (benefitsValue : string) => {
    let benefitsEnumValue : EmployeeBenefits = EmployeeBenefits[benefitsValue as keyof typeof EmployeeBenefits];

    switch (benefitsEnumValue) {
        case EmployeeBenefits.DentalCare:
            return 'Dental care';
        case EmployeeBenefits.ExtendedHealthCare:
            return 'Extended health care';
        case EmployeeBenefits.LifeInsurance:
            return 'Life insurance';
        case EmployeeBenefits.RRSPMatch:
            return 'RRSP match';
        case EmployeeBenefits.PaidTimeOff:
            return 'Paid time off';
        case EmployeeBenefits.OnSiteParking:
            return 'On-site parking';
        case EmployeeBenefits.EmployeeAssistanceProgram:
            return 'Employee assistance program';
        case EmployeeBenefits.VisionCare:
            return 'Vision care';
        case EmployeeBenefits.DisabilityInsurance:
            return 'Disability insurance';
        case EmployeeBenefits.CasualDress:
            return 'Casual dress';
        case EmployeeBenefits.CompanyEvents:
            return 'Company events';
        case EmployeeBenefits.StoreDiscount:
            return 'Store discount';
        case EmployeeBenefits.CompanyPension:
            return 'Company pension';
        case EmployeeBenefits.TuitionReimbursement:
            return 'Tuition reimbursement';
        case EmployeeBenefits.WellnessProgram:
            return 'Wellness program';
        case EmployeeBenefits.DiscountedOrFreeFood:
            return 'Discounted or free food';
        case EmployeeBenefits.WorkFromHome:
            return 'Work from home';
        case EmployeeBenefits.ProfitSharing:
            return 'Profit sharing';
        case EmployeeBenefits.OnSiteGym:
            return 'On-site gym';
        case EmployeeBenefits.EmployeeStockPurchasePlan:
            return 'Employee stock purchase plan';
        case EmployeeBenefits.RelocationAssistance:
            return 'Relocation assistance';
        case EmployeeBenefits.CompanyCar:
            return 'Company car';
        case EmployeeBenefits.StockOptions:
            return 'Stock options';
        case EmployeeBenefits.CommuterBenefits:
            return 'Commuter benefits';
        case EmployeeBenefits.HousingAllowance:
            return 'Housing allowance';
        case EmployeeBenefits.AutomobileAllowance:
            return 'Automobile allowance';
        case EmployeeBenefits.LanguageTrainingProvided:
            return 'Language training provided';
        case EmployeeBenefits.OnSiteChildcare:
            return 'On-site childcare';
        case EmployeeBenefits.VRSP:
            return 'VRSP';
        case EmployeeBenefits.FlexibleSchedule:
            return 'Flexible schedule';
        case EmployeeBenefits.Other:
            return 'Other';
        default:
            return 'Unknown';
    }
};