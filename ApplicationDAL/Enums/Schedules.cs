namespace ApplicationDAL.Enums;

public enum Schedules
{
    MondayToFriday = 1,
    WeekendsAsNeeded = 1 << 1,
    EightHourShift = 1 << 2,
    DayShift = 1 << 3,
    EveningShift = 1 << 4,
    NightShift = 1 << 5,
    MorningShift = 1 << 6,
    Overtime = 1 << 7,
    OnCall = 1 << 8,
    NoWeekends = 1 << 9,
    EveryWeekend = 1 << 10,
    Holidays = 1 << 11,
    TenHourShift = 1 << 12,
    TwelveHourShift = 1 << 13,
    FourHourShift = 1 << 14,
    WeekendsOnly = 1 << 15,
    Other = 1 << 16
}