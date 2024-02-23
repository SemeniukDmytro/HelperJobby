using HelperJobby.DTOs.Resume;

namespace API_IntegrationTests.Fixtures;

public class SkillFixtures
{
    public static readonly CreateSkillDTO FirstSkill = new()
    {
        Name = "C# Programming"
    };

    public static readonly CreateSkillDTO SecondSkill = new()
    {
        Name = "Project Management"
    };
}