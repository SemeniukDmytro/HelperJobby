import {months} from "../../AppConstData/Months";

export function getFormattedMonthName_DD_YYYYDate(dateAsString: string){
    const date = new Date(dateAsString);
    const year = date.getFullYear();
    const month = months[date.getMonth()].name;
    const day = date.getDate().toString().padStart(2, '0');

    return `${month} ${day} ${year}`
}

const abbreviatedMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function getFormattedDate_DD_MMM(dateAsString: string) {
    const date = new Date(dateAsString);
    const month = abbreviatedMonths[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');

    return `${month} ${day}`;
}