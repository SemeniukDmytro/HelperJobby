using ApplicationDomain.Models;

namespace BLLUnitTests.Fixture;

public static class WorkExperienceFixtures
{
    public static WorkExperience CreatedWorkExperience = new()
    {
        JobTitle = "Software Developer",
        Company = "ABC Inc.",
        Country = "United States",
        CityOrProvince = "New York",
        From = new DateOnly(2020, 1, 1),
        To = new DateOnly(2022, 12, 31),
        CurrentlyWorkHere = false,
        Description = "Worked as a software developer on various projects."
    };

    public static WorkExperience UpdatedWorkExperience = new()
    {
        JobTitle = "Software Developer",
        Company = "ABC Inc.",
        Country = "United States",
        CityOrProvince = "Los Angeles",
        From = new DateOnly(2020, 1, 1),
        To = new DateOnly(2022, 12, 31),
        CurrentlyWorkHere = false,
        Description = "Worked as a software developer on various projects."
    };

    public static WorkExperience FirstWorkExperienceEntity = new()
    {
        WorkExperienceId = 1,
        JobTitle = "Software Developer",
        Company = "ABC Inc.",
        Country = "United States",
        CityOrProvince = "New York",
        From = new DateOnly(2020, 1, 1),
        To = new DateOnly(2022, 12, 31),
        CurrentlyWorkHere = false,
        Description = "Worked as a software developer on various projects.",
        ResumeId = 1
    };

    public static WorkExperience SecondWorkExperienceEntity = new()
    {
        WorkExperienceId = 2,
        JobTitle = "Software Developer",
        Company = "ABC Inc.",
        Country = "United States",
        CityOrProvince = "New York",
        From = new DateOnly(2020, 1, 1),
        To = new DateOnly(2022, 12, 31),
        CurrentlyWorkHere = false,
        Description = "Worked as a software developer on various projects.",
        ResumeId = 2
    };
}