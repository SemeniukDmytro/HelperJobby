import {ShowPayOptionsStringMap} from "../DTOs/enumStringMapProfiles/ShowPayOptionsStringMap";
import {ShowPayByOptions} from "../enums/modelDataEnums/ShowPayByOptions";
import {SalaryRatesStringMap} from "../DTOs/enumStringMapProfiles/SalaryRatesStringMap";
import {SalaryRates} from "../enums/modelDataEnums/SalaryRates";

export const showPayByOptionsMapData: ShowPayOptionsStringMap[] = [
    {enumValue: ShowPayByOptions.Range, stringValue: 'Range'},
    {enumValue: ShowPayByOptions.StartingAmount, stringValue: 'Starting amount'},
    {enumValue: ShowPayByOptions.MaximumAmount, stringValue: 'Maximum amount'},
    {enumValue: ShowPayByOptions.ExactAmount, stringValue: 'Exact amount'}
];

export const salaryRatesMapData: SalaryRatesStringMap[] = [
    {enumValue: SalaryRates.PerHour, stringValue: "per hour"},
    {enumValue: SalaryRates.PerDay, stringValue: "per day"},
    {enumValue: SalaryRates.PerWeek, stringValue: "per week"},
    {enumValue: SalaryRates.PerMonth, stringValue: "per month"},
    {enumValue: SalaryRates.PerYear, stringValue: 'per year'}
];