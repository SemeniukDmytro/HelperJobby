import {months} from "../../AppConstData/Months";

export default function dateToStringConverter(month : string, year : string) : string | undefined{
    const monthNumberValue = months.find(m => m.name === month)?.monthNumber || 1;
    let date : string | undefined;
    if (Number.parseInt(year, 10)){
        date = new Date(`${Number.parseInt(year, 10)}-${monthNumberValue}`)
            .toISOString().split('T')[0];
    }
    return date;
}