using ApplicationDomain.Enums;

namespace ApplicationBLL.Logic;

public static class SalaryRateHelper
{
    public static bool CheckMinimalSalary(decimal minimalAmount, SalaryRates salaryRate)
    {
        switch (salaryRate)
        {
            case SalaryRates.PerHour:
                return minimalAmount > 16.65m;
            case SalaryRates.PerDay:
                return minimalAmount > 100m;
            case SalaryRates.PerWeek:
                return minimalAmount > 494m;
            case SalaryRates.PerMonth:
                return minimalAmount > 2000m;
            case SalaryRates.PerYear:
                return minimalAmount > 24000m;
            default:
                return false;
        }
    }

    public static decimal GetSalaryPerDayFromPerHourRate(decimal salaryPerHour)
    {
        return salaryPerHour * 8;
    }

    public static decimal GetSalaryPerWeekFromPerHourRate(decimal salaryPerHour)
    {
        return salaryPerHour * 8 * 5;
    }

    public static decimal GetSalaryPerMonthFromPerHourRate(decimal salaryPerHour)
    {
        return salaryPerHour * 8 * 22;
    }

    public static decimal GetSalaryPerYearFromPerHourRate(decimal salaryPerHour)
    {
        return salaryPerHour * 8 * 250;
    }
}