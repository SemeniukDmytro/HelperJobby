using ApplicationDomain.Enums;
using ApplicationDomain.Exceptions;

namespace ApplicationBLL.Logic;

public static class EnumToStringConverter
{
    public static string InterviewTypeToStringConverter(InterviewTypes interviewType)
    {
        switch (interviewType)
        {
            case InterviewTypes.Phone:
                return "Phone";
            case InterviewTypes.Video:
                return "Video";
            case InterviewTypes.InPerson:
                return "In-person";
            default:
                throw new InterviewOperatingException("Invalid interview type");
        }
    }

    public static string JobSalaryRateConverter(SalaryRates salaryRate)
    {
        switch (salaryRate)
        {
            case SalaryRates.PerHour:
                return "per hour";
            case SalaryRates.PerDay:
                return "per day";
            case SalaryRates.PerWeek:
                return "per week";
            case SalaryRates.PerMonth:
                return "per month";
            case SalaryRates.PerYear:
                return "per year";
            default:
                throw new InvalidJobException("Invalid salary rate provider");
        }
    }
}