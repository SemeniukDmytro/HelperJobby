import {ResumeRequirementOptionsStringMap} from "../DTOs/enumStringMapProfiles/ResumeRequirementOptionsStringMap";
import {ResumeRequirementOptions} from "../enums/modelDataEnums/ResumeRequirementOptions";

export const resumeRequirementOptionsMapData : ResumeRequirementOptionsStringMap[] = [
    {enumValue : ResumeRequirementOptions.Optional, stringValue : "Give the option to include a resume"},
    {enumValue : ResumeRequirementOptions.Required, stringValue : "Yes, require a resume"},
    {enumValue : ResumeRequirementOptions.NotNeeded, stringValue : "No, don't ask for a resume"}
]