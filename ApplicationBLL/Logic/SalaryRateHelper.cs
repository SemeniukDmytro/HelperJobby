namespace ApplicationBLL.Logic;

public static class SalaryRateHelper
{
    public static bool CheckMinimalSalary(decimal salary, string salaryRate)
    {
        switch (salaryRate.ToLower())
        {
            case "per hour":
                return salary > 16.65m;
            case "per day":
                return salary > 100m;
            case "per week":
                return salary > 494m;
            case "per month":
                return salary > 2000m;
            case "per year":
                return salary > 24000m;
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