import {months} from "../../AppConstData/Months";

export function convertNumericMonthToStringValue(numericValue : string){
    const possibleMonthValue = months.find((m) => m.monthNumber === Number.parseInt(numericValue))?.name;
    return possibleMonthValue ? possibleMonthValue : "";
}