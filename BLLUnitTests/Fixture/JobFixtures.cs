using ApplicationDomain.Enums;
using ApplicationDomain.Models;

namespace BLLUnitTests.Fixture;

public static class JobFixtures
{
    public static readonly Job CreatedJob = new()
    {
        JobTitle = "Software engineer",
        NumberOfOpenings = 10,
        Language = "English",
        Location = "Random Address",
        JobTypes = JobTypes.Freelance,
        Salary = 100.90m,
        SalaryRate = "per hour",
        ShowPayBy = "minimum amount",
        Schedule = Schedules.DayShift,
        Benefits = EmployeeBenefits.CommuterBenefits,
        ContactEmail = "test@gmail.com",
        Description = "test description",
        EmployerAccountId = 1
    };

    public static readonly Job InvalidCreatedJob = new()
    {
        JobTitle = "",
        NumberOfOpenings = 10,
        Language = "English",
        Location = "Random Address",
        JobTypes = JobTypes.Freelance,
        Salary = 100.90m,
        SalaryRate = "per hour",
        ShowPayBy = "minimum amount",
        Schedule = Schedules.DayShift,
        Benefits = EmployeeBenefits.CommuterBenefits,
        ContactEmail = "test@gmail.com",
        Description = "test description",
        EmployerAccountId = 1
    };

    public static readonly Job FirstJobEntity = new()
    {
        Id = 1,
        JobTitle = "Software engineer",
        NumberOfOpenings = 10,
        Language = "English",
        Location = "Random Address",
        JobTypes = JobTypes.Freelance,
        Salary = 100.90m,
        SalaryRate = "per hour",
        ShowPayBy = "minimum amount",
        Schedule = Schedules.DayShift,
        Benefits = EmployeeBenefits.CommuterBenefits,
        ContactEmail = "test@gmail.com",
        Description = "test description",
        EmployerAccountId = 1
    };

    public static readonly Job SecondJobEntity = new()
    {
        Id = 2,
        JobTitle = "Software engineer",
        NumberOfOpenings = 10,
        Language = "English",
        Location = "Random Address",
        JobTypes = JobTypes.Freelance,
        Salary = 100.90m,
        SalaryRate = "per hour",
        ShowPayBy = "minimum amount",
        Schedule = Schedules.DayShift,
        Benefits = EmployeeBenefits.CommuterBenefits,
        ContactEmail = "test@gmail.com",
        Description = "test description",
        EmployerAccountId = 2
    };

    public static readonly Job UpdatedJob = new()
    {
        JobTitle = "Software engineer",
        NumberOfOpenings = 3,
        Language = "English",
        Location = "Random Address",
        JobTypes = JobTypes.Freelance,
        Salary = 110.90m,
        SalaryRate = "per hour",
        ShowPayBy = "minimum amount",
        Schedule = Schedules.DayShift,
        Benefits = EmployeeBenefits.CommuterBenefits,
        ContactEmail = "test@gmail.com",
        Description = "test description",
        EmployerAccountId = 1
    };
}