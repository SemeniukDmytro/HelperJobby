import {Dispatch, SetStateAction} from "react";

export function isValidDescription(descriptionValue : string,
                                   setDescriptionError : Dispatch<SetStateAction<string>>,
                                   setIsInvalidDescription : Dispatch<SetStateAction<boolean>>) : boolean{
    if (descriptionValue.length < 30){
        setDescriptionError("Add a job description with a minimum of 30 characters.");
        setIsInvalidDescription(true);
        return false;
    }
    else {
        setDescriptionError("");
        setIsInvalidDescription(false);
        return true;
    }
}