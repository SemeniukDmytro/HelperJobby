using ApplicationDomain.Enums;
using HelperJobby.DTOs.Job;

namespace API_IntegrationTests.Fixtures;

public class CurrentJobFixtures
{
    public static readonly CurrentJobCreateDTO NewJobCreation = new()
    {
        JobTitle = "Software Developer",
        NumberOfOpenings = 3,
        Language = "English",
        Location = "New York",
        JobType = new List<JobTypes> { JobTypes.FullTime, JobTypes.Apprenticeship },
        Salary = 80000.00m,
        Schedule = new List<Schedules> { Schedules.Holidays, Schedules.Other },
        Benefits = new List<EmployeeBenefits> { EmployeeBenefits.CommuterBenefits },
        ContactEmail = "",
        ResumeRequired = true,
        Description = ""
    };
}