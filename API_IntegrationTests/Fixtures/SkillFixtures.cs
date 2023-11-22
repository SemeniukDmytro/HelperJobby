using HelperJobby.DTOs.Resume;

namespace API_IntegrationTests.Fixtures;

public class SkillFixtures
{
    public static readonly CreateSkillDTO FirstSkill = new CreateSkillDTO
    {
        Name = "C# Programming"
    };
    public static readonly CreateSkillDTO SecondSkill = new CreateSkillDTO
    {
        Name = "Project Management"
    };
}