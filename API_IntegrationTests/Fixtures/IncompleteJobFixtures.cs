using API_IntegrationTests.TestHelpers;
using ApplicationDomain.Enums;
using HelperJobby.DTOs.Job;

namespace API_IntegrationTests.Fixtures;

public class IncompleteJobFixtures
{
    public static readonly CreateIncompleteJobDTO NewJobCreation = new()
    {
        JobTitle = "Software Developer",
        NumberOfOpenings = 3,
        Language = "English",
        Location = "New York",
        LocationCountry = "USA",
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
        Description = "Test description"
    };

    public static readonly IncompleteJobDTO CompletedJobCreation = new()
    {
        JobTitle = "Software Developer",
        NumberOfOpenings = 3,
        Language = "English",
        Location = "New York",
        LocationCountry = "USA",
        JobType = new List<JobTypes> { JobTypes.FullTime, JobTypes.Apprenticeship },
        Salary = new IncompleteJobSalaryDTO()
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