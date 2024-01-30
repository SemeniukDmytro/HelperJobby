using ApplicationDomain.Models;

namespace BLLUnitTests.Fixture;

public static class SkillFixtures
{
    public static Skill CreatedSkill = new()
    {
        Name = "Recruiting"
    };

    public static Skill SkillEntity = new()
    {
        Id = 1,
        Name = "Recruiting",
        ResumeId = 1
    };
}