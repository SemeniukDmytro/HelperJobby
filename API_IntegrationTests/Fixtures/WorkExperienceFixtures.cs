using HelperJobby.DTOs.Resume;

namespace API_IntegrationTests.Fixtures;

public class WorkExperienceFixtures
{
    public static readonly CreateWorkExperienceDTO FirstWorkExperience = new CreateWorkExperienceDTO
    {
        JobTitle = "Software Engineer",
        Company = "TechCo Inc.",
        Country = "USA",
        CityOrProvince = "San Francisco",
        From = new DateOnly(2018, 7, 1),
        To = new DateOnly(2021, 12, 31),
        CurrentlyWorkHere = false,
        Description = "Developed web applications and collaborated with cross-functional teams."
    };

    public static readonly CreateWorkExperienceDTO SecondWorkExperience = new CreateWorkExperienceDTO
    {
        JobTitle = "Product Manager",
        Company = "ProductX Ltd.",
        Country = "UK",
        CityOrProvince = "London",
        From = new DateOnly(2022, 2, 15),
        To = null,
        CurrentlyWorkHere = true,
        Description = "Led product development and strategy."
    };
}