import JobTypes from "../enums/modelDataEnums/JobTypes";
import {JobTypesStringMap} from "../DTOs/enumStringMapProfiles/JobTypesStringMap";


export const JobTypesMapData: JobTypesStringMap[] = [
    {enumValue: JobTypes.FullTime, stringValue: 'Full-time'},
    {enumValue: JobTypes.PartTime, stringValue: 'Part-time'},
    {enumValue: JobTypes.Permanent, stringValue: 'Permanent'},
    {enumValue: JobTypes.FixedTermContract, stringValue: 'Fixed term contract'},
    {enumValue: JobTypes.Casual, stringValue: 'Casual'},
    {enumValue: JobTypes.Seasonal, stringValue: 'Seasonal'},
    {enumValue: JobTypes.Freelance, stringValue: 'Freelance'},
    {enumValue: JobTypes.Apprenticeship, stringValue: 'Apprenticeship'},
    {enumValue: JobTypes.InternshipCoop, stringValue: 'Internship'},
    {enumValue: JobTypes.Contract, stringValue: "Contract"}
];