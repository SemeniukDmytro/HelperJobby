import {SchedulesStringMapDTO} from "../DTOs/EnumStringMapProfiles/SchedulesStringMapDTO";
import Schedules from "../enums/Schedules";

export const SchedulesMapData: SchedulesStringMapDTO[] = [
    { enumValue: Schedules.MondayToFriday, stringValue: 'Monday to Friday' },
    { enumValue: Schedules.WeekendsAsNeeded, stringValue: 'Weekends as needed' },
    { enumValue: Schedules.EightHourShift, stringValue: '8 hour shift' },
    { enumValue: Schedules.DayShift, stringValue: 'Day shift' },
    { enumValue: Schedules.EveningShift, stringValue: 'Evening shift' },
    { enumValue: Schedules.NightShift, stringValue: 'Night shift' },
    { enumValue: Schedules.MorningShift, stringValue: 'Morning shift' },
    { enumValue: Schedules.Overtime, stringValue: 'Overtime' },
    { enumValue: Schedules.OnCall, stringValue: 'On call' },
    { enumValue: Schedules.NoWeekends, stringValue: 'No weekends' },
    { enumValue: Schedules.EveryWeekend, stringValue: 'Every Weekend' },
    { enumValue: Schedules.Holidays, stringValue: 'Holidays' },
    { enumValue: Schedules.TenHourShift, stringValue: '10 hour shift' },
    { enumValue: Schedules.TwelveHourShift, stringValue: '12 hour shift' },
    { enumValue: Schedules.FourHourShift, stringValue: '4 hour shift' },
    { enumValue: Schedules.WeekendsOnly, stringValue: 'Weekends only' },
    { enumValue: Schedules.Other, stringValue: 'Other' },
];