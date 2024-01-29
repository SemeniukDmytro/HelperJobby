import {MonthNameAndNumberDTO} from "../DTOs/DateDTO/MonthNameAndNumberDTO";

export const months: MonthNameAndNumberDTO[] = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December',
].map((name, index) => ({ name : name, monthNumber: index + 1 }));