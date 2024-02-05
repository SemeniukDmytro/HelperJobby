using ApplicationDomain.Enums;
using HelperJobby.DTOs.Job;

namespace API_IntegrationTests.Fixtures;

public class IncompleteJobFixtures
{
    public static readonly IncompleteJobCreateDTO NewJobCreation = new()
    {
        JobTitle = "Software Developer",
        NumberOfOpenings = 3,
        Language = "English",
        Location = "New York",
        JobType = new List<JobTypes> { JobTypes.FullTime, JobTypes.Apprenticeship },
        Salary = new CreateUpdateSalaryDTO()
        {
            MinimalAmount = 80000.00m,
            SalaryRate = SalaryRates.PerYear,
            ShowPayByOption = ShowPayByOptions.MinimalAmount
        },
        Schedule = new List<Schedules> { Schedules.Holidays, Schedules.Other },
        Benefits = new List<EmployeeBenefits> { EmployeeBenefits.CommuterBenefits },
        ContactEmail = "",
        ResumeRequired = true,
        Description = ""
    };

    public static readonly IncompleteJobCreateDTO CompletedJobCreation = new()
    {
        JobTitle = "Software Developer",
        NumberOfOpenings = 3,
        Language = "English",
        Location = "New York",
        JobType = new List<JobTypes> { JobTypes.FullTime, JobTypes.Apprenticeship },
        Salary = new CreateUpdateSalaryDTO()
        {
            MinimalAmount = 80000.00m,
            SalaryRate = SalaryRates.PerYear,
            ShowPayByOption = ShowPayByOptions.MinimalAmount
        },
        Schedule = new List<Schedules> { Schedules.Holidays, Schedules.Other },
        Benefits = new List<EmployeeBenefits> { EmployeeBenefits.CommuterBenefits },
        ContactEmail = "employer@gmail.com",
        ResumeRequired = true,
        Description = "You need to know C#"
    };
}