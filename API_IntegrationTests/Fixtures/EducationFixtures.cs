using HelperJobby.DTOs.Resume;

namespace API_IntegrationTests.Fixtures;

public class EducationFixtures
{
    public static readonly CreateUpdateEducationDTO FirstEducation = new()
    {
        LevelOfEducation = "Bachelor's",
        FieldOfStudy = "Computer Science",
        SchoolName = "Example University",
        Country = "USA",
        City = "New York",
        From = new DateOnly(2010, 9, 1),
        To = new DateOnly(2014, 5, 30)
    };

    public static readonly CreateUpdateEducationDTO SecondEducation = new()
    {
        LevelOfEducation = "Master's",
        FieldOfStudy = "Business Administration",
        SchoolName = "Another University",
        Country = "Canada",
        City = "Toronto",
        From = new DateOnly(2015, 8, 1),
        To = new DateOnly(2017, 6, 30)
    };
}