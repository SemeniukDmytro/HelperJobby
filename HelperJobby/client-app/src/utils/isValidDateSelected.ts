import {isNanAfterIntParse} from "./isNanAfterIntParse";

export function isValidDateSelected(fromMonth : string, fromYear : string, toMonth : string, toYear : string) : boolean{
    if ((isNanAfterIntParse(fromYear) && fromMonth !== "Month")
        || (isNanAfterIntParse(toYear) && toMonth !== "Month")){
        return false;
    }

    if ((!isNanAfterIntParse(toYear) && toMonth !== "Month")
        && (isNanAfterIntParse(fromYear) && (fromMonth === "Month" || !fromMonth))){
        return false;
    }
    if ((isNanAfterIntParse(toYear) && (toMonth === "Month" || !toMonth))
        && (!isNanAfterIntParse(fromYear) && fromMonth !== "Month")){
        return false;
    }

    return fromYear <= toYear;
    
    
}