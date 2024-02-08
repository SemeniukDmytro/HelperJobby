using ApplicationDomain.Enums;
using HelperJobby.DTOs.Job;

namespace API_IntegrationTests.Fixtures;

public class IncompleteJobFixtures
{
    public static readonly UpdatedIncompleteJobDTO NewJobCreation = new()
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
            ShowPayByOption = ShowPayByOptions.StartingAmount
        },
        Schedule = new List<Schedules> { Schedules.Holidays, Schedules.Other },
        Benefits = new List<EmployeeBenefits> { EmployeeBenefits.CommuterBenefits },
        ContactEmail = "",
        ResumeRequired = ResumeRequirementOptions.Optional,
        Description = ""
    };

    public static readonly UpdatedIncompleteJobDTO CompletedJobCreation = new()
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
            ShowPayByOption = ShowPayByOptions.StartingAmount
        },
        Schedule = new List<Schedules> { Schedules.Holidays, Schedules.Other },
        Benefits = new List<EmployeeBenefits> { EmployeeBenefits.CommuterBenefits },
        ContactEmail = "employer@gmail.com",
        ResumeRequired = ResumeRequirementOptions.Optional,
        Description = "You need to know C#"
    };
}