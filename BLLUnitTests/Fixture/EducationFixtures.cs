using ApplicationDomain.Models;

namespace BLLUnitTests.Fixture;

public static class EducationFixtures
{
    public static Education CreatedEducation = new Education()
    {
        LevelOfEducation = "Bachelor's",
        FieldOfStudy = "Software engineering",
        SchoolName = "random school",
        Country = "Canada",
        City = "Toronto",
        From = new DateOnly(2000, 12, 10),
        To = new DateOnly(2005, 12, 10)
        
    };
    
    public static Education UpdatedEducation = new Education()
    {
        LevelOfEducation = "Bachelor's",
        FieldOfStudy = "Software engineering",
        SchoolName = "specific school",
        Country = "Canada",
        City = "Toronto",
        From = new DateOnly(2000, 12, 10),
        To = new DateOnly(2005, 12, 10)
        
    };
    public static Education FirstEducationEntity = new Education()
    {
        Id = 1,
        LevelOfEducation = "Bachelor's",
        FieldOfStudy = "Software engineering",
        SchoolName = "random school",
        Country = "Canada",
        City = "Toronto",
        From = new DateOnly(2000, 12, 10),
        To = new DateOnly(2005, 12, 10),
        ResumeId = 1
    };
    public static Education SecondEducationEntity = new Education()
    {
        Id = 2,
        LevelOfEducation = "Bachelor's",
        FieldOfStudy = "Software engineering",
        SchoolName = "random school",
        Country = "Canada",
        City = "Toronto",
        From = new DateOnly(2000, 12, 10),
        To = new DateOnly(2005, 12, 10),
        ResumeId = 2
    };
    
}