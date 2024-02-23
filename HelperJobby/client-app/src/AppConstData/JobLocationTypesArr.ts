import {JobLocationType} from "../DTOs/locationDTO/JobLocationType";
import {JobLocationTypes} from "../enums/modelDataEnums/JobLocationTypes";


export const jobLocationTypesArr : JobLocationType[] = [
    {
        enumValue : JobLocationTypes.InPerson,
        type: "In-person, precise location",
        typeExplanations: "The job is performed at a specific address."
    },
    {
        enumValue : JobLocationTypes.GeneralLocation,
        type : "General location, within a limited area",
        typeExplanations : "The job address can't be specified."
    },
    {
        enumValue : JobLocationTypes.Remote,
        type : "Remote",
        typeExplanations : "The job is performed remotely. No on-site work required."
    },
    {
        enumValue : JobLocationTypes.OnRoad,
        type : "On the road",
        typeExplanations : "The job requires regular travel."
    }
]