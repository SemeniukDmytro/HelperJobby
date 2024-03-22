import {months} from "../../AppConstData/Months";


const abbreviatedMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDate(dateAsString: string) {
    const date = new Date(dateAsString);
    const year = date.getFullYear();
    const month = months[date.getMonth()].name;
    const day = date.getDate().toString().padStart(2, '0');

    return `${month} ${day} ${year}`
}

export function getFullDateWithTime_MMMM_DD_YYYY(dateAsString: string) {
    const date = new Date(dateAsString);
    const year = date.getFullYear();
    const month = months[date.getMonth()].name;
    const day = date.getDate().toString().padStart(2, '0');
    const time = formatAMPM(date);

    return `${month} ${day} ${year}, ${time}`
}


export function getDate_MMM_DD(dateAsString: string) {
    const date = new Date(dateAsString);
    const month = abbreviatedMonths[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');

    return `${month} ${day}`;
}

export function getDateWithTime_MMM_DD(dateAsString: string) {
    const date = new Date(dateAsString);
    const month = abbreviatedMonths[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');
    const time = formatAMPM(date);

    return `${month} ${day}, ${time} `;
}

export function MonthAndYearFromJSONToStringConverter(month: string, year: string) {
    const monthNumberValue = months.find(m => m.name === month)?.monthNumber || 1;
    let date: string | undefined;
    if (Number.parseInt(year, 10)) {
        date = new Date(`${Number.parseInt(year, 10)}-${monthNumberValue}`)
            .toISOString().split('T')[0];
    }
    return date;
}

export function formatAMPM(date: Date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    return hours + ':' + formattedMinutes + ' ' + ampm;
}

export function getConversationLastMessageFormattedTime(lastModifiedTime: string) {
    const date = new Date(lastModifiedTime);
    const currentDate = new Date();
    if (date.getDay() == currentDate.getDay()) {
        return formatAMPM(date);
    }

    if (checkIfDateWithingSameWeek(date, currentDate)) {
        return date.toLocaleDateString('en-US', {weekday: 'long'});
    }

    if (date.getFullYear() == currentDate.getFullYear()) {
        return getDate_MMM_DD(lastModifiedTime);
    } else {
        return formatDate(lastModifiedTime);
    }
}   

export function getFormattedTimeWithWeekdays(lastModifiedTime: string) {
    const date = new Date(lastModifiedTime);
    const currentDate = new Date();

    if (date.getDay() == currentDate.getDay()) {
        return "Today";
    }

    if (checkIfDateWithingSameWeek(date, currentDate)) {
        return date.toLocaleDateString('en-US', {weekday: 'long'});
    }

    if (date.getFullYear() == currentDate.getFullYear()) {
        return getDate_MMM_DD(lastModifiedTime);
    } else {
        return formatDate(lastModifiedTime);
    }
}

function checkIfDateWithingSameWeek(date: Date, currentDate: Date) {
    const oneDayMilliseconds = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((date.getDate() - currentDate.getDate()) / oneDayMilliseconds));

    return diffDays <= 7;
}