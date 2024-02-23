using ApplicationDomain.Models;

namespace BLLUnitTests.Fixture;

public static class ResumeFixtures
{
    public static Resume CreatedResume = new()
    {
        Educations = new List<Education>
        {
            new()
            {
                LevelOfEducation = "Bachelor's",
                FieldOfStudy = "Software Engineering"
            }
        },
        Skills = new List<Skill>
        {
            new()
            {
                Name = "Recruiting"
            },
            new()
            {
                Name = "Data Analysis"
            }
        }
    };

    public static Resume ResumeEntity = new()
    {
        Id = 1,
        JobSeekerId = 1,
        Educations = new List<Education>
        {
            EducationFixtures.FirstEducationEntity
        },
        WorkExperiences = new List<WorkExperience>()
        {
            WorkExperienceFixtures.FirstWorkExperienceEntity
        },
        Skills = new List<Skill>
        {
            new()
            {
                Id = 1,
                Name = "Recruiting",
                ResumeId = 1
            },
            new()
            {
                Id = 2,
                Name = "Data Analysis",
                ResumeId = 1
            }
        }
    };

    public static Resume UpdatedResume = new()
    {
        WorkExperiences = new List<WorkExperience>
        {
            new()
            {
                JobTitle = "Software Engineer",
                Company = "Google"
            }
        }
    };
}