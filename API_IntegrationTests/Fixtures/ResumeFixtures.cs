using HelperJobby.DTOs.Resume;

namespace API_IntegrationTests.Fixtures;

public class ResumeFixtures
{
    public static readonly CreateResumeDTO Resume = new CreateResumeDTO
        {
            Educations = new List<CreateUpdateEducationDTO>
            {
                EducationFixtures.FirstEducation,
                EducationFixtures.SecondEducation
            },
            WorkExperiences = new List<CreateWorkExperienceDTO>
            {
                new CreateWorkExperienceDTO
                {
                    JobTitle = "Software Engineer",
                    Company = "TechCo Inc.",
                    Country = "USA",
                    CityOrProvince = "San Francisco",
                    From = new DateOnly(2018, 7, 1),
                    To = new DateOnly(2021, 12, 31),
                    CurrentlyWorkHere = false,
                    Description = "Developed web applications and collaborated with cross-functional teams."
                },
                new CreateWorkExperienceDTO
                {
                    JobTitle = "Product Manager",
                    Company = "ProductX Ltd.",
                    Country = "UK",
                    CityOrProvince = "London",
                    From = new DateOnly(2022, 2, 15),
                    To = null,
                    CurrentlyWorkHere = true,
                    Description = "Led product development and strategy."
                }
            },
            Skills = new List<CreateSkillDTO>
            {
                new CreateSkillDTO { Name = "C# Programming"},
                new CreateSkillDTO { Name = "Project Management"},
                new CreateSkillDTO { Name = "Web Development"}
            }
        };
}