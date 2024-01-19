using ApplicationDomain.Models;

namespace BLLUnitTests.Fixture;

public static class ResumeFixtures
{
    public static Resume CreatedResume = new Resume()
    {
        Educations = new List<Education>()
        {
            new Education()
            {
                LevelOfEducation = "Bachelor's",
                FieldOfStudy = "Software Engineering"
            }
        },
        Skills = new List<Skill>()
        {
            new Skill()
            {
                Name = "Recruiting"
            },
            new Skill()
            {
                Name = "Data Analysis"
            }
        }
    };
    
    public static Resume ResumeEntity = new Resume()
    {
        Id = 1,
        JobSeekerAccountId = 1,
        Educations = new List<Education>()
        {
            new Education()
            {
                Id = 1,
                LevelOfEducation = "Bachelor's",
                FieldOfStudy = "Software Engineering"
            }
        },
        WorkExperiences = new List<WorkExperience>(),
        Skills = new List<Skill>()
        {
            new Skill()
            {
                Id = 1,
                Name = "Recruiting",
                ResumeId = 1
            },
            new Skill()
            {
                Id = 2,
                Name = "Data Analysis",
                ResumeId = 1
            }
        }
    };
    public static Resume UpdatedResume = new Resume()
    {
        WorkExperiences = new List<WorkExperience>()
        {
            new WorkExperience()
            {
                JobTitle = "Software Engineer",
                Company = "Google"
            }
        }
    };
}