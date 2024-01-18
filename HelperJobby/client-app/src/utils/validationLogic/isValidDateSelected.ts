import {isNanAfterIntParse} from "./isNanAfterIntParse";

export function isValidDateSelected(fromMonth : string, fromYear : string, toMonth : string, toYear : string) : boolean{
    if ((isNanAfterIntParse(fromYear) && fromMonth !== "Month" && !fromMonth)
        || (isNanAfterIntParse(toYear) && toMonth !== "Month" && !toMonth)){
        console.log((isNanAfterIntParse(fromYear) && fromMonth !== "Month" && !fromMonth))
        console.log(!fromMonth)
        return false;
    }

    if (!isNanAfterIntParse(toYear) && isNanAfterIntParse(fromYear)){
        return false;
    }
    if (isNanAfterIntParse(toYear) && !isNanAfterIntParse(fromYear)){
        return false;
    }

    return fromYear <= toYear;
}