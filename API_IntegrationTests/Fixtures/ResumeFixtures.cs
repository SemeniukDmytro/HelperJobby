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
               WorkExperienceFixtures.FirstWorkExperience,
               WorkExperienceFixtures.SecondWorkExperience
            },
            Skills = new List<CreateSkillDTO>
            {
                SkillFixtures.FirstSkill,
                SkillFixtures.SecondSkill
            }
        };
}